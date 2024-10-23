from flask import jsonify, Blueprint, request
from ..models.projects_model import  get_project_id, get_all_projects_details, get_all_projects


projects_routes = Blueprint('projects_routes', __name__)


@projects_routes.route('/api/projects/portfolio', methods=['GET'])
def fetch_all_projects(): ## admin_id
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
            print(f"projects fetched from backend")
            return jsonify(all_projects), 200
        else:
            print(f"no project fetched from backend")
            return jsonify({"message" : "no project found"}), 404 
    
        
    except Exception as e:
        print(f"Route error for fetching all projects: {e}")
        return jsonify({"error" : str(e)}), 500
    


@projects_routes.route('/api/project/<project_id>', methods=['GET'])
def fetch_project_by_ID(project_id):
    
    project_id = request.args
    project = get_project_id(project_id)
    
    
    return jsonify(project)