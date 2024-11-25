from flask import jsonify, Blueprint, request
from ..models.projects_model import  get_project_id, get_all_projects_details, get_all_projects, serialize_project, save_project


projects_routes = Blueprint('projects_routes', __name__)


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
    


@projects_routes.route('/api/project/<project_id>', methods=['GET'])
def fetch_project_by_ID(project_id):
    try:
        project = get_project_id(project_id)
        if project:
            project = serialize_project(project)  # Serialize the project
            print(f"project fetched from backend {project['title']}")
            return jsonify(project), 200
        else:
            return jsonify({"message": "project not found"}), 404
    except Exception as e:
        print(f"Route error for fetching project by ID: {e}")
        return jsonify({"message": "An error occurred"}), 500

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
    
    
    