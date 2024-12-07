from flask import Flask, jsonify, Blueprint, request, send_from_directory
from models.projects_model import  get_project_id, get_all_projects_details, get_all_projects, serialize_project, save_project
import os 

projects_routes = Blueprint('projects_routes', __name__)
app = Flask(__name__, static_url_path='/static')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


@projects_routes.route('/api/projects/portfolio', methods=['GET'])
def fetch_all_projects(): 
    try:
        all_projects = get_all_projects_details()
        print(f"all projects fetched. Ready to get the details needed for display !")
        
        return jsonify(all_projects), 200
    except Exception as e:
        print(f"Route error for fetching all projects: {e}")


@projects_routes.route('/api/projects', methods=['GET'])
def fetch_all_projects_hero(): 
    try : 
        all_projects = get_all_projects()
        if all_projects:
            for project in all_projects : 
                project_id = get_project_id(project['_id'])
                print(f"projects fetched from backend, ID : {project_id}")
            return jsonify(all_projects), 200
        else:
            print(f"no project fetched from backend")
            return jsonify({"message" : "no project found"}), 404 
    
        
    except Exception as e:
        print(f"Route error for fetching all projects: {e}")
        return jsonify({"error" : str(e)}), 500
    


@projects_routes.route('/api/projects/<project_id>', methods=['GET'])
def fetch_project_by_ID(project_id):
    try:
        # Fetch the project
        project = get_project_id(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404

        # Construct image URLs
        images_folder = project.get('images_folder', '')
        static_img_folder = app.config.get('STATIC_IMG_FOLDER', 'static/images/projects')
        images_folder_path = os.path.join(static_img_folder, images_folder.strip('./'))

        if os.path.exists(images_folder_path):
            images = [
                f"http://localhost:5000/static/images/projects/{images_folder}/{img}"
                for img in os.listdir(images_folder_path)
                if os.path.isfile(os.path.join(images_folder_path, img))
            ]
        else:
            images = []

        # Add image URLs to the project response
        project['image_urls'] = images
        return jsonify(serialize_project(project)), 200

    except Exception as e:
        print(f"Route error for fetching project by ID: {e}")
        return jsonify({"message": "An error occurred"}), 500

# Serve static files (optional if not already configured)
@app.route('/static/img/<path:filename>')
def serve_image(filename):
    return send_from_directory(app.config['STATIC_IMG_FOLDER'], filename)
    
    
    
    


# @projects_routes.route('/api/projects_images/<images_folder>', methods=['GET'])
# def fetch_service_images(images_folder):
#     try:
#         # Construct the full path to the gallery folder
#         gallery_folder = os.path.join('static', 'images', 'projects', images_folder)
        
#         if os.path.exists(gallery_folder):
#             # Get list of images in the folder
#             image_files = os.listdir(gallery_folder)
#             # Return image URLs (relative to the static folder)
#             image_urls = [f"/static/images/services/{images_folder}/{image}" for image in image_files]
#             return jsonify(image_urls), 200
#         else:
#             return jsonify({"message": "Gallery path not found"}), 404
#     except Exception as e:
#         print(f"Error fetching service images: {e}")
#         return jsonify({"message": "An error occurred"}), 500

    
# try:
#         # Fetch project details from the database
#         project = get_project_id(project_id)  # Replace with your database fetching logic

#         if project:
#             # Serialize the project (if needed)
#             project = serialize_project(project)

#             # Path to the folder containing project images
#             static_images_folder = os.path.join('static', 'images', 'projects', project['images_folder'])

#             # Check if the folder exists and fetch image filenames
#             if os.path.exists(static_images_folder):
#                 image_files = os.listdir(static_images_folder)
#                 # Generate full URLs for the images
#                 project['image_urls'] = [
#                     f"/static/images/projects/{project['images_folder']}/{image}" for image in image_files
#                 ]
#             else:
#                 # If the folder doesn't exist, provide an empty list or error message
#                 project['image_urls'] = []

#             print(f"Project fetched from backend: {project['title']}")
#             return jsonify(project), 200
#         else:
#             return jsonify({"message": "project not found"}), 404

#     except Exception as e:
#         print(f"Route error for fetching project by ID: {e}")
#         return jsonify({"message": "An error occurred"}), 500
    

## ADD PROJECT FUNCTION
@projects_routes.route('/api/new_project', methods=['POST'])
def add_project():
    try:
        # Extract data from request
        data = request.json
        
        # Validate required fields
        required_fields = ['title', 'description', 'category', 'duration', 'location', 'completion_date', 'image_urls']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
        
        # Save project to database
        new_project = save_project(data)  # Replace with your model's save function
        
        if new_project:
            return jsonify({"message": "Project added successfully", "project": serialize_project(new_project)}), 201
        else:
            return jsonify({"error": "Failed to add project"}), 500
    except Exception as e:
        print(f"Route error for adding a project: {e}")
        return jsonify({"error": str(e)}), 500
    
    
    