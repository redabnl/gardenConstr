import datetime
import os
from bson import ObjectId
from flask import current_app as app
from werkzeug.utils import secure_filename
from flask import Blueprint, request, jsonify
from ..models.media_model import UPLOAD_FOLDER, save_media, get_media_by_associated_id, handle_media_upload



media_routes = Blueprint('media_routes', __name__)


UPLOAD_FOLDER_SERVICES = '/img/services/'
UPLOAD_FOLDER_PROJECTS = '/img/doneProjects/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    print(f"Filename received: {filename}")
    allowed = '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    print(f"Allowed file: {allowed}")
    return allowed


#######################################################################
## MEDIA MANAGEMENT
@media_routes.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        entity_type = request.form.get('entity_type')
        entity_id = request.form.get('entity_id')
        uploaded_by = request.form.get('uploaded_by')

        # Save file to the server
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        
        # Save metadata to the database
        save_media(file, entity_type, entity_id, uploaded_by)

        return jsonify({"message": "File successfully uploaded"}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400


# Route for uploading media related to a service
@media_routes.route('/api/services/<service_id>/media', methods=['POST'])
def upload_service_media(service_id):
    app.config['UPLOAD_FOLDER_SERVICES'] = UPLOAD_FOLDER_SERVICES
    file = request.files.get('file')
    print(f"File received: {file}")

    tags = request.form.getlist('tags')  # Get tags from the form
    uploaded_by = request.form.get('admin_id')  # Assuming admin_id is passed in the form data

    # folder for storing the service media 
    folder_path = os.path.join(app.root_path, UPLOAD_FOLDER_SERVICES)
    print(f"Folder path: {folder_path}")

    # file.save(os.path.join(folder_path, filename))
    result, status_code = handle_media_upload(file, service_id, "service", folder_path, tags, uploaded_by)

    return jsonify(result), status_code

# Route for uploading media related to a project
@media_routes.route('/api/projects/<project_id>/media', methods=['POST'])
def upload_project_media(project_id):
    app.config['UPLOAD_FOLDER_PROJECTS'] = UPLOAD_FOLDER_PROJECTS
    file = request.files.get('file')
    print(f'file received : {file}')
    tags = request.form.getlist('tags')  # Get tags from the form
    print(f'tags received : {tags}')
    uploaded_by = request.form.get('admin_id')
    print(f"uploaded by : {uploaded_by}")

    folder_path = os.path.join(app.root_path, UPLOAD_FOLDER_PROJECTS)
    print(f"folder path : {folder_path}")

    result, status_code = handle_media_upload(file, project_id, "project", folder_path, tags, uploaded_by)

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
