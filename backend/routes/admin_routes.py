from bson import ObjectId
from werkzeug.security import generate_password_hash
from ..models.db import get_db
from ..models.projects_model import get_all_projects, add_project, update_project, delete_project
# from models.admin_users_model import create_admin_user, get_admin_by_username
from ..models.admin_users_model import create_admin_user, get_admin_by_username, get_admin_by_id, get_all_admins
from ..models.services_model import update_service_by_id, get_service_by_id, create_new_service
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


# Allowed extensions for image uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
## ADMIN USERS MANAGEMENT

## CREATE SERVICES WITH IMAGE UPLOAD
@admin_routes.route('/api/admin/services', methods=['POST'])
def create_service(): ## title, description, tags, price_range
    title = request.form.get('title')
    description = request.form.get('description')
    location = request.form.get('location')

    # Handle multiple file uploads
    uploaded_files = request.files.getlist('images')  # Multiple images
    image_paths = []

    for file in uploaded_files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            project_folder = os.path.join(app.config['UPLOAD_FOLDER_PROJECTS'], title.replace(" ", "_"))
            os.makedirs(project_folder, exist_ok=True)
            file_path = os.path.join(project_folder, filename)
            file.save(file_path)
            image_paths.append(file_path.replace("./static/", ""))  # Store relative path

    new_project = {
        "title": title,
        "description": description,
        "location": location,
        "gallery_images": image_paths  # Store image paths as an array
    }
    db.projects.insert_one(new_project)
    return jsonify({"message": "Project added successfully!"}), 201
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



@admin_routes.route('/api/admin/services/<service_id>', methods=['PUT'])
def update_service(service_id):
    # service_id = get_service_by_id(data.get('title'))
    data = request.json
    title = data.get('title')
    description = data.get('description')
    tags = data.get('tags')
    price_range = data.get('price_range')

    try:
        result = update_service_by_id(service_id, title, description, price_range, tags)  # Update service
        if result:
            return jsonify({"message": "Service updated successfully"}), 200
        return jsonify({"error": "Service not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
##############################################
## PORTFOLIO MANAGEMENT
@admin_routes.route('/api/admin/projects', methods=['GET'])
# @token_required
def fetch_all_projects(): ## admin_id
    projects = get_all_projects()
    return jsonify(projects), 200


# Route to add a new project
@admin_routes.route('/api/admin/projects', methods=['POST'])
# @token_required
def create_project(): ## admin_id
    data = request.json
    title = data.get('title')
    description = data.get('description')
    location = data.get('location')
    gallery_images = data.get('gallery_images', [])
    completed_at = data.get('completed_at')  # String format

    new_project = add_project(title, description, location, gallery_images, completed_at)
    print(f"project added : {new_project}")
    return jsonify({"message": "Project added successfully!"}), 201

# Route to update a project
@admin_routes.route('/api/admin/projects/<project_id>', methods=['PUT'])
# @token_required
def modify_project( project_id): ## admin_id, ...
    data = request.json
    title = data.get('title')
    description = data.get('description')
    location = data.get('location')
    gallery_images = data.get('gallery_images', [])
    completed_at = data.get('completed_at')  # String format

    success = update_project(project_id, title, description, location, gallery_images, completed_at)
    
    if success:
        return jsonify({"message": "Project updated successfully!"}), 200
    else:
        return jsonify({"error": "Project not found!"}), 404

# Route to delete a project
@admin_routes.route('/api/admin/projects/<project_id>', methods=['DELETE'])
# @token_required
def remove_project( project_id): ## admin_id, ...
    success = delete_project(project_id)
    
    if success:
        return jsonify({"message": "Project deleted successfully!"}), 200
    else:
        return jsonify({"error": "Project not found!"}), 404

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