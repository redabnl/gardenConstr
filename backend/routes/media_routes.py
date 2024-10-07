import datetime
import os
from bson import ObjectId
from werkzeug.utils import secure_filename
from flask import Blueprint, request, jsonify
from ..models.media_model import UPLOAD_FOLDER, save_media_metadata, get_media_by_associated_id, handle_media_upload



media_routes = Blueprint('inquiries_routes', __name__)


#######################################################################
## MEDIA MANAGEMENT


# Route for uploading media related to a service
@media_routes.route('/api/services/<service_id>/media', methods=['POST'])
def upload_service_media(service_id):
    file = request.files.get('file')
    tags = request.form.getlist('tags')  # Get tags from the form
    uploaded_by = request.form.get('admin_id')  # Assuming admin_id is passed in the form data

    # Define the folder path for storing the service media
    folder_path = os.path.join(UPLOAD_FOLDER, 'services', f'service{service_id}')
    result, status_code = handle_media_upload(file, service_id, "service", folder_path, tags, uploaded_by)

    return jsonify(result), status_code

# Route for uploading media related to a project
@media_routes.route('/api/projects/<project_id>/media', methods=['POST'])
def upload_project_media(project_id):
    file = request.files.get('file')
    tags = request.form.getlist('tags')  # Get tags from the form
    # uploaded_by = request.form.get('admin_id')  # Assuming admin_id is passed in the form data

    # Define the folder path for storing the project media
    folder_path = os.path.join(UPLOAD_FOLDER, 'doneProjects', f'prj{project_id}')
    result, status_code = handle_media_upload(file, project_id, "project", folder_path, tags, uploaded_by="admin")

    return jsonify(result), status_code
# Route for retrieving media related to a specific service
@media_routes.route('/api/services/<service_id>/media', methods=['GET'])
def get_service_media(service_id):
    media_metadata = get_media_by_associated_id(service_id)
    if media_metadata:
        return jsonify(media_metadata), 200
    else:
        return jsonify({"message": "No media found for this service"}), 404

# Route for retrieving media related to a specific project
@media_routes.route('/api/projects/<project_id>/media', methods=['GET'])
def get_project_media(project_id):
    media_metadata = get_media_by_associated_id(project_id)
    if media_metadata:
        return jsonify(media_metadata), 200
    else:
        return jsonify({"message": "No media found for this project"}), 404
