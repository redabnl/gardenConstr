from flask import jsonify, Blueprint, request
from ..models.projects_model import get_all_projects_admin, get_all_projects, get_project_id


projects_routes = Blueprint('projects_routes', __name__)


@projects_routes.route('/api/projects', methods=['GET'])
def fetch_all_projects(): ## admin_id
    projects = get_all_projects_admin()
    return jsonify(projects), 200


@projects_routes.route('/api/projects/portfolio', methods=['GET'])
def fetch_all_projects_portfolio(): 
    projects = get_all_projects()
    return jsonify(projects), 200


@projects_routes.route('/api/project/<project_id>', methods=['GET'])
def fetch_project_by_ID(project_id):
    
    project_id = request.args
    project = get_project_id(project_id)
    
    
    return jsonify(project)