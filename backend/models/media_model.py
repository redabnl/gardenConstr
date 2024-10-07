import os
from werkzeug.utils import secure_filename
from flask import request, jsonify
from .db import get_db
from bson import ObjectId
import datetime


UPLOAD_FOLDER_SERVICES = '/img/services/'
UPLOAD_FOLDER_PROJECTS = '/img/doneProjects/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


UPLOAD_FOLDER = '/img/'
def save_media_metadata(media_metadata):
    db = get_db()
    db.media.insert_one(media_metadata)
    


# Helper function for handling media upload for both services and projects
def handle_media_upload(file, entity_id, entity_type, folder_path, tags, uploaded_by):
    # Ensure the folder exists
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(folder_path, filename)
        file.save(file_path)

        # Prepare metadata
        media_metadata = {
            "file_path": file_path,
            "associated_id": ObjectId(entity_id),  # Can be service_id or project_id
            "media_type": "image",
            "tags": tags,
            "created_at": datetime.datetime.utcnow(),
            "uploaded_by": ObjectId(uploaded_by)
        }

        # Save the metadata in the database
        db = get_db()
        db.media.insert_one(media_metadata)

        return {"message": "File uploaded successfully", "file_path": file_path}, 200
    else:
        return {"error": "File type not allowed or no file provided"}, 400

def get_media_by_associated_id(associated_id):
    db = get_db()
    media = list(db.media.find({"associated_id": ObjectId(associated_id)}))

    # Remove ObjectId serialization issues
    for item in media:
        item['_id'] = str(item['_id'])
        item['associated_id'] = str(item['associated_id'])
        item['uploaded_by'] = str(item['uploaded_by'])

    return media
    
# def get_service_media(service_id):
#     db = get_db()
#     media = db.media.find({"associated_id" : ObjectId(service_id)})
#     media_list = list(media)
#     for md in media_list:
#         md['associated_id'] = str(md['associated_id'])
#         md['_id'] = str(md['_id'])
#     return media_list    
    
# def get_project_media(project_id):
#     db = get_db()
#     media = db.media.find({"associated_id" : ObjectId(project_id)})
#     media_list = list(media)
#     for md in media_list:
#         md['associated_id'] = str(md['associated_id'])
#         md['_id'] = str(md['_id'])
#     return media_list    
    