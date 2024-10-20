from flask import jsonify, Blueprint, request
from ..models.projects_model import  get_project_id, get_all_projects_details


projects_routes = Blueprint('projects_routes', __name__)


@projects_routes.route('/api/projects/portfolio', methods=['GET'])
def fetch_all_projects(): ## admin_id
    try:
        all_projects = get_all_projects_details()
        print(f"all projects fetched. Ready to get the details needed for display !")
        
        return jsonify(all_projects), 200
    except Exception as e:
        print(f"Route error for fetching all projects: {e}")


# @projects_routes.route('/api/projects/portfolio', methods=['GET'])
# def fetch_all_projects_portfolio(): 
#     projects = get_all_projects()
#     return projects


@projects_routes.route('/api/project/<project_id>', methods=['GET'])
def fetch_project_by_ID(project_id):
    
    project_id = request.args
    project = get_project_id(project_id)
    
    
    return jsonify(project)