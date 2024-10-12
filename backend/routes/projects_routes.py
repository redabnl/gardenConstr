from flask import jsonify, Blueprint, request
from ..models.projects_model import get_all_projects_admin


projects_routes = Blueprint('projects_routes', __name__)


@projects_routes.route('/api/projects', methods=['GET'])
def fetch_all_projects(): ## admin_id
    projects = get_all_projects_admin()
    return jsonify(projects), 200
