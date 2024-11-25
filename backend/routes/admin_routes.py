from bson import ObjectId
from werkzeug.security import generate_password_hash
from ..models.db import get_db
from ..models.projects_model import  get_project_id
# from models.admin_users_model import create_admin_user, get_admin_by_username
from ..models.admin_users_model import create_admin_user, get_admin_by_username, get_admin_by_id, get_all_admins
from ..models.services_model import update_service_by_id, get_service_by_id, create_service
from ..models.media_model import  save_media
import jwt
from werkzeug.security import check_password_hash
from werkzeug.utils import secure_filename
import datetime
from flask import Blueprint, request, jsonify
from flask import current_app as app
from .auth_helpers import token_required
from dotenv import load_dotenv
from ..models.db import get_db

import os
load_dotenv()

db = get_db()
admin_routes = Blueprint('admin_routes', __name__)


# Folder to store and Allowed extensions for image uploads
UPLOAD_FOLDER = '/backend/images/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    
    
    
###########################################################
## ADMIN USERS MANAGEMENT

@admin_routes.route('/api/admin/users', methods=['GET'])
# @token_required  # Protect this route with token authentication
def get_all_admin_users(): ## admin_id
    
    ## SUPERADMIN only to config for later
    # # First, check if the logged-in admin is a superAdmin
    # admin = get_admin_by_id(admin_id)  # Fetch the admin by ID (from token)
    
    # if admin['role'] != 'superAdmin':
    #     return jsonify({"error": "Permission denied. Only superAdmins can view this list."}), 403

    try:
        # Fetch all admins from the database
        admins = get_all_admins()
        
        # Filter out sensitive information like passwords
        admin_list = []
        for admin in admins:
            admin_list.append({
                "username": admin['username'],
                "role": admin['role'],
                "created_at": admin.get('created_at', None)
            })
        
        return jsonify(admin_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@admin_routes.route('/api/admin/create', methods=['POST'])
def create_admin(): # admin_id as imput here
    try:
        

        # Parse the new admin data from the request
        data = request.json
        new_username = data.get('username')
        new_password = data.get('password')
        new_role = data.get('role', 'admin')  # Default role is "admin" unless specified

        # Hash the new admin's password
        hashed_password = generate_password_hash(new_password)

        # Create the new admin user
        new_admin = create_admin_user(new_username, hashed_password, new_role)
        
        return jsonify({
            "message": "Admin user created successfully",
            "admin": {
                "username": new_admin['username'],
                "role": new_admin['role']
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_routes.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    admin = get_admin_by_username(username)
    if admin and check_password_hash(admin['password'], password):
        # Generate a JWT token
        token = jwt.encode({
            'admin_id': str(admin['_id']),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }, os.getenv("SECRET_KEY"), algorithm='HS256') ## 

        # Handle PyJWT returning bytes in Python 3+
        token_str = token if isinstance(token, str) else token.decode('utf-8')

        return jsonify({"token": token_str}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
    
@admin_routes.route('/api/admin/me', methods=['GET'])
# @token_required
def get_admin_profile(admin_id):
    admin = get_admin_by_id(admin_id)  # Fetch admin details using the admin_id from the token
    if admin:
        return jsonify({
            "username": admin['username'],
            "role": admin['role']
        }), 200
    return jsonify({"error": "Admin not found"}), 404


###########################################################
###########################################################
## ADMIN services MANAGEMENT

## CREATE SERVICES WITH IMAGE UPLOAD
@admin_routes.route('/api/admin/services', methods=['POST'])
def add_service():
    UPLOAD_FOLDER_SERVICES = os.path.join(UPLOAD_FOLDER, 'services')

    # Validate image upload
    if 'image_path' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['image_path']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        # Dynamically create a folder for the service
        service_title = request.form.get('title')
        if not service_title:
            return jsonify({"error": "Service title is required"}), 400
        service_folder = os.path.join(UPLOAD_FOLDER_SERVICES, service_title.replace(" ", "_"))
        os.makedirs(service_folder, exist_ok=True)

        filepath = os.path.join(service_folder, filename)
        file.save(filepath)
        
        # Retrieve other form data
        description = request.form.get('description')
        tags = request.form.get('tags', '').split(',')
        price_range = request.form.get('price_range', 'To be discussed')

        # Validate required fields
        if not description or not tags:
            return jsonify({"error": "Description and tags are required"}), 400

        # Save service data to the database
        service_data = {
            "title": service_title,
            "description": description,
            "tags": tags,
            "price_range": price_range,
            "is_active": True,
            "image_path": filepath.replace("\\", "/")  # Ensure the path is URL-friendly
        }
        try:
            db.services.insert_one(service_data)
            return jsonify({"message": "Service added successfully!"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "File type not allowed"}), 400
    
## SERVICE UPDATE 
@admin_routes.route('/api/admin/services/<service_id>', methods=['PUT'])
def update_service(service_id):
    data = request.form
    file = request.files.get('image_path')  # Optional new image
    UPLOAD_FOLDER_SERVICES = os.path.join(UPLOAD_FOLDER, 'services')

    # Fetch the existing service
    service = db.services.find_one({"_id": ObjectId(service_id)})
    if not service:
        return jsonify({"error": "Service not found"}), 404

    # Update details
    title = data.get('title', service['title'])
    description = data.get('description', service['description'])
    tags = data.get('tags', ','.join(service['tags'])).split(',')
    price_range = data.get('price_range', service['price_range'])

    updated_data = {
        "title": title,
        "description": description,
        "tags": tags,
        "price_range": price_range,
    }

    # Handle new image upload
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        # Create/overwrite service folder
        service_folder = os.path.join(UPLOAD_FOLDER_SERVICES, title.replace(" ", "_"))
        os.makedirs(service_folder, exist_ok=True)

        filepath = os.path.join(service_folder, filename)
        file.save(filepath)
        updated_data["image_path"] = filepath.replace("\\", "/")

        # Optionally remove the old image (if necessary)
        old_image_path = service.get("image_path")
        if old_image_path and os.path.exists(old_image_path):
            os.remove(old_image_path)

    try:
        db.services.update_one({"_id": ObjectId(service_id)}, {"$set": updated_data})
        return jsonify({"message": "Service updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
## SERVICE DELETE
@admin_routes.route('/api/admin/services/<service_id>', methods=['DELETE'])
def delete_service(service_id):
    try:
        # Find the service
        service = db.services.find_one({"_id": ObjectId(service_id)})
        if not service:
            return jsonify({"error": "Service not found"}), 404

        # Remove the image folder
        image_path = service.get("image_path")
        if image_path:
            service_folder = os.path.dirname(image_path)
            if os.path.exists(service_folder):
                import shutil
                shutil.rmtree(service_folder)

        # Delete from the database
        db.services.delete_one({"_id": ObjectId(service_id)})
        return jsonify({"message": "Service deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500




# # CREATE SERVICES WITH IMAGE UPLOAD
# @admin_routes.route('/api/admin/services', methods=['POST'])
# def add_service():
#     if 'image_path' not in request.files:
#         return jsonify({"error": "No file path"}), 400
    
#     file = request.files['image_path']
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400
    
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         filepath = os.path.join(UPLOAD_FOLDER, filename)
#         os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#         file.save(filepath)
#         print(f"Request files: {request.files}")
#         print(f"Request form: {request.form}")
        
#         # Get the rest of the data
#         title = request.form.get('title')
#         description = request.form.get('description')
#         tags = request.form.get('tags').split(',')
#         price_range = request.form.get('price_range')

#         # Save the service details and file path in your database
#         service_data = {
#             "title": title,
#             "description": description,
#             "tags": tags,
#             "price_range": price_range,
#             "image_path": filepath  # Save the path of the file
#         }
        
#         # Save the service data (you might need to adjust this according to your database logic)
#         db.services.insert_one(service_data)
        
#         return jsonify({"message": "Service added successfully!"}), 201
#     else:
#         return jsonify({"error": "File type not allowed"}), 400
#####################################################################################
#####################################################################################
    # data = request.json
    # title = data.get('title')
    # description = data.get('description')
    # tags = data.get('tags')
    # price_range = data.get('price_range')

    # # Validate inputs
    # if not title or not description or not tags or not price_range:
    #     return jsonify({"error": "All fields are required"}), 400

    # try:
    #     # Call the create_service function
    #     service = create_service(title, description, tags, price_range)
    #     return jsonify({
    #         "message": "Service created successfully!",
    #         "service": service
    #     }), 201
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500

# def create_service(title, description, tags, price_range): ## 
#     title = request.form.get('title')
#     description = request.form.get('description')
#     tags = request.form.get('tags'),
#     price_range = request.form.get('price_range')

#     # Handle multiple file uploads
#     # uploaded_files = request.files.getlist('images')  # Multiple images
#     image_paths = []

#     # for file in uploaded_files:
#     #     if file and allowed_file(file.filename):
#     #         filename = secure_filename(file.filename)
#     #         project_folder = os.path.join(app.config['UPLOAD_FOLDER_SERVICES'], title.replace(" ", "_"))
#     #         os.makedirs(project_folder, exist_ok=True)
#     #         file_path = os.path.join(project_folder, filename)
#     #         file.save(file_path)
#     #         image_paths.append(file_path.replace("./static/", ""))  # Store relative path

#     new_service = {
#         "title": title,
#         "description": description,
#         "tags": tags,
#         "price_range": price_range
#          #"gallery_images": image_paths  # Store image paths as an array
#     }
#     db.services.insert_one(new_service)
#     return jsonify({"message": "Project added successfully!"}), 201
    # title = request.form.get('title')
    # description = request.form.get('description')
    # price_range = request.form.get('price_range')
    # tags = request.form.getlist('tags')  # Tags from form
    
    # # Handle file upload
    # if 'image' not in request.files:
    #     return jsonify({"error": "No file part"}), 400
    
    # file = request.files['image']
    
    # if file.filename == '':
    #     return jsonify({"error": "No selected file"}), 400
    
    # if file and allowed_file(file.filename):
    #     filename = secure_filename(file.filename)
    #     service_folder = os.path.join(app.config['UPLOAD_FOLDER_SERVICES'], title.replace(" ", "_"))
    #     os.makedirs(service_folder, exist_ok=True)
    #     file_path = os.path.join(service_folder, filename)
    #     file.save(file_path)  # Save the file
        
    #     # Insert service into MongoDB with the image path
    #     new_service = {
    #         "title": title,
    #         "description": description,
    #         "price_range": price_range,
    #         "tags": tags,
    #         "image_path": file_path.replace("./static/", "")  # Store relative path
    #     }
    #     db.services.insert_one(new_service)
    #     return jsonify({"message": "Service added successfully!"}), 201
    
    # return jsonify({"error": "Invalid file type"}), 400
    # data = request.json
    # title = data.get('title')
    # description = data.get('description')
    # tags = data.get('tags')
    # price_range = data.get('price_range')

    # try:
    #     new_service = create_new_service( title, description, tags, price_range)  # Create service
    #     return jsonify(new_service), 201
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500



# @admin_routes.route('/api/admin/services/<service_id>', methods=['PUT'])
# def update_service(service_id):
#     # service_id = get_service_by_id(data.get('title'))
#     data = request.json
#     title = data.get('title')
#     description = data.get('description')
#     tags = data.get('tags')
#     price_range = data.get('price_range')

#     try:
#         result = update_service_by_id(service_id, title, description, price_range, tags)  # Update service
#         if result:
#             return jsonify({"message": "Service updated successfully"}), 200
#         return jsonify({"error": "Service not found"}), 404
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
    
    
    
##############################################    
##############################################
## PORTFOLIO MANAGEMENT

## Route to get all projects
# def get_project_id(project_id):
#     db = get_db()
#     try:
#         project = db.projects.find_one({
#             "_id": ObjectId(project_id)
#         })
#         return project
#     except Exception as e:
#         print(f"Error fetching project by ID: {e}")
#         return None

# @token_required
# @admin_routes.route('/api/admin/projects', methods=['GET'])
# # @token_required  
# def get_all_projects():
#     try : 
#         all_projects = get_all_projects()
#         if all_projects:
#             for project in all_projects : 
#                 project_id = get_project_id(project['_id'])
#                 print(f"projects fetched from backend, ID : {project_id}")
#             return jsonify(all_projects), 200
#         else:
#             print(f"no project fetched from backend")
#             return jsonify({"message" : "no project found"}), 404 
    
        
#     except Exception as e:
#         print(f"Route error for fetching all projects: {e}")
#         return jsonify({"error" : str(e)}), 500
    # try:
    #     projects = get_all_projects_details()  # Assuming you have a get_projects function
    #     return jsonify({"projects": projects}), 200
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500


def create_upload_folder(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)



## ROUTE TO ADD A NEW PROJECT 
@admin_routes.route('/api/admin/projects', methods=['POST'])
def add_project():
    UPLOAD_FOLDER_PROJECTS = os.path.join(UPLOAD_FOLDER, 'projects')

    # Retrieve form data
    title = request.form.get('title')
    category = request.form.get('category')
    description = request.form.get('description')
    duration = request.form.get('duration')
    service_id = request.form.get('service_id')
    materials = request.form.getlist('materials')
    files = request.files.getlist('project_images')

    if not title or not category or not description or not service_id:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Create folder dynamically
        project_folder = os.path.join(UPLOAD_FOLDER_PROJECTS, title.replace(" ", "_"))
        os.makedirs(project_folder, exist_ok=True)

        # Save files and collect their paths
        image_urls = []
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                filepath = os.path.join(project_folder, filename)
                file.save(filepath)
                image_urls.append(filepath.replace("\\", "/"))

        # Save project details to the database
        project_data = {
            "title": title,
            "category": category,
            "description": description,
            "duration": duration,
            "service_id": ObjectId(service_id),
            "materials": materials,
            "image_urls": image_urls,
        }
        db.projects.insert_one(project_data)
        return jsonify({"message": "Project added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# @admin_routes.route('/api/admin/projects', methods=['POST'])
# def add_project():
#     UPLOAD_FOLDER_PROJECTS = os.path.join(UPLOAD_FOLDER, 'projects')
    

#     # Retrieve form data
#     title = request.form.get('title')
#     category = request.form.get('category')
#     description = request.form.get('description')
#     duration = request.form.get('duration')
#     service_id = request.form.get('service_id')
#     materials = request.form.getlist('materials')  # Allow multiple material inputs
#     files = request.files.getlist('project_images')  # Retrieve multiple files

#     print(f"form data : {request.form}")
#     print(f"file : {request.files}")
    
#     # Validate required fields
#     if not title or not category or not description or not service_id:
#         return jsonify({"error": "Missing required fields"}), 400

#     try:
#         # Create a folder for the project
#         project_folder = os.path.join(UPLOAD_FOLDER_PROJECTS, title.replace(" ", "_"))
#         create_upload_folder(project_folder)
#         os.makedirs(project_folder, exist_ok=True)

#         # Save files and collect their paths
#         image_urls = []
#         for file in files:
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file_path = os.path.join(project_folder, filename)
#                 file.save(file_path)
#                 image_urls.append(file_path.replace("\\", "/"))

#         # Insert project into the database
#         project_data = {
#             "title": title,
#             "category": category,
#             "description": description,
#             "duration": duration,
#             "service_id": ObjectId(service_id),
#             "materials": materials,
#             "image_urls": image_urls,
#         }
#         db.projects.insert_one(project_data)

#         return jsonify({"message": "Project added successfully!"}), 201
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


#######################################################################
# @admin_routes.route('/api/admin/projects', methods=['POST'])
# def create_project():
#     # admin_id = "66ff3fb1041e67f42c7c4569"
#     title = request.form.get('title')  # Use form data for text fields
#     description = request.form.get('description')
#     location = request.form.get('location')
#     completed_at = request.form.get('completed_at')
    
#     gallery_images = request.files.getlist('gallery_images')  # Handle file input properly
    
#     # Process the uploaded files (e.g., saving to server)
#     uploaded_file_paths = []
#     for file in gallery_images:
#         if file:
#             filename = secure_filename(file.filename)
#             file_path = os.path.join(UPLOAD_FOLDER, filename)  # Define your UPLOAD_FOLDER
#             file.save(file_path)
#             uploaded_file_paths.append(file_path)

#     # Save the project and the file paths to the database
#     new_project = add_project(title, description, location, uploaded_file_paths, completed_at)
#     return jsonify({"message": "Project added successfully"}), 201
#######################################################################



# UPDATE A SELECTED PROJECT
@admin_routes.route('/api/projects/<project_id>', methods=['PUT'])
def update_project(project_id):
    UPLOAD_FOLDER_PROJECTS = os.path.join(UPLOAD_FOLDER, 'projects')

    # Fetch existing project
    project = db.projects.find_one({"_id": ObjectId(project_id)})
    if not project:
        return jsonify({"error": "Project not found"}), 404

    # Retrieve updated data
    data = request.form
    files = request.files.getlist('project_images')  # Optional new images

    title = data.get('title', project['title'])
    category = data.get('category', project['category'])
    description = data.get('description', project['description'])
    duration = data.get('duration', project.get('duration'))
    materials = data.getlist('materials') or project.get('materials', [])
    service_id = data.get('service_id', str(project['service_id']))

    try:
        updated_data = {
            "title": title,
            "category": category,
            "description": description,
            "duration": duration,
            "materials": materials,
            "service_id": ObjectId(service_id),
        }

        # Handle image updates
        if files:
            # Remove old images
            for image_path in project.get("image_urls", []):
                if os.path.exists(image_path):
                    os.remove(image_path)

            # Save new images
            project_folder = os.path.join(UPLOAD_FOLDER_PROJECTS, title.replace(" ", "_"))
            os.makedirs(project_folder, exist_ok=True)

            image_urls = []
            for file in files:
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file_path = os.path.join(project_folder, filename)
                    file.save(file_path)
                    image_urls.append(file_path.replace("\\", "/"))

            updated_data["image_urls"] = image_urls

        # Update the project in the database
        db.projects.update_one({"_id": ObjectId(project_id)}, {"$set": updated_data})
        return jsonify({"message": "Project updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#######################################################################
# #######################################################################
# @admin_routes.route('/api/admin/projects/<project_id>', methods=['PUT'])
# # @token_required
# def modify_project( project_id): ## admin_id, ...
#     data = request.json
#     title = data.get('title')
#     description = data.get('description')
#     location = data.get('location')
#     gallery_images = data.get('gallery_images', [])
#     completed_at = data.get('completed_at')  # String format

#     success = update_project(project_id, title, description, location, gallery_images, completed_at)
    
#     if success:
#         return jsonify({"message": "Project updated successfully!"}), 200
#     else:
#         return jsonify({"error": "Project not found!"}), 404
#######################################################################
#######################################################################

# ROUTE TO DELETE A PROJECT
@admin_routes.route('/api/projects/<project_id>', methods=['DELETE'])
def delete_project(project_id):
    try:
        # Find the project
        project = db.projects.find_one({"_id": ObjectId(project_id)})
        if not project:
            return jsonify({"error": "Project not found"}), 404

        # Delete the images folder
        if "image_urls" in project and project["image_urls"]:
            project_folder = os.path.dirname(project["image_urls"][0])
            if os.path.exists(project_folder):
                import shutil
                shutil.rmtree(project_folder)

        # Delete the project from the database
        db.projects.delete_one({"_id": ObjectId(project_id)})
        return jsonify({"message": "Project deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#######################################################################
#######################################################################
# @admin_routes.route('/api/admin/projects/<project_id>', methods=['DELETE'])
# # @token_required
# def remove_project( project_id): ## admin_id, ...
#     success = delete_project(project_id)
    
#     if success:
#         return jsonify({"message": "Project deleted successfully!"}), 200
#     else:
#         return jsonify({"error": "Project not found!"}), 404



# @admin_routes.route('/api/admin/projects/<project_id>', methods=['PUT'])
# @token_required
# def update_project(admin_id, project_id):
#     db = get_db()
#     data = request.json
#     title = data.get('title')
#     description = data.get('description')
#     images = data.get('images', [])
#     date_completed = data.get('date_completed')

#     result = db.projects.update_one(
#         {"_id": ObjectId(project_id)},
#         {"$set": {
#             "title": title,
#             "description": description,
#             "images": images,
#             "date_completed": date_completed
#         }}
#     )

#     if result.modified_count > 0:
#         return jsonify({"message": "Project updated successfully!"}), 200
#     else:
#         return jsonify({"error": "Project not found!"}), 404


###########################################################################
#######################################################################
##############################################################################################################################################
##############################################################################################################################################
##############################################################################################################################################
##############################################################################################################################################
##############################################################################################################################################
#######################################################################
# # Generate a hashed password
# password_hash = generate_password_hash('reda')

# # Create an admin user with username 'admin' and hashed password
# admin_user = create_admin_user('reda', password_hash)
# print(f"Admin user created: {admin_user}")
# Route to create new admin users, only accessible by superAdmins


###################################################################
# class Filter(admin.SimpleListFilter):
#     title = _("")
#     parameter_name = ""

#     def lookups(self, request, model_admin):
#         return ()

#     def queryset(self, request, queryset):
#         return queryset.filter(=self.value())
####################################################################


# Fetch the admin's details from the database using the admin_id from the token
        # admin = get_admin_by_id(admin_id)
        
        # Check if the admin has the role of "superAdmin"
        # if admin.get('role') != 'superAdmin':
        #     return jsonify({"error": "Permission denied. Only superAdmins can create new admins."}), 403