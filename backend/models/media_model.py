import os
from werkzeug.utils import secure_filename
from flask import request, jsonify
from .db import get_db
from bson import ObjectId
import datetime


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


UPLOAD_FOLDER = '/backend/images/'

########################################################
########################################################
##  Upload image and save img info in the database 
# def save_media_metadata(media_metadata):
#     db = get_db()
#     db.media.insert_one(media_metadata)
def save_media(file, entity_type, entity_id, uploaded_by):
    db = get_db()
    media_entry = {
        "file": f"/images/{entity_type}/{file.filename}",
        "entity_id": entity_id,
        "entity_type": entity_type,
        "uploaded_by": uploaded_by,
        "tags": [],
        "folder_path": f"/images/{entity_type}/",
    }
    db.media.insert_one(media_entry)



########################################################
########################################################
## FUNC TO RETREIVE MEDIA FOR DISPLAY       
def get_media_for_service(service_id):
    db = get_db()
    images = db.media.find({"entity_id": service_id, "entity_type": "service"})
    return list(images)

    

def handle_media_upload(file, entity_id, entity_type, folder_path, tags, uploaded_by):
    # Ensure the folder exists
    # if not os.path.exists(folder_path):
    #     os.makedirs(folder_path)

    # Check if file is allowed and exists
    if file and allowed_file(file.filename):
        # Sanitize the original filename
        original_filename = secure_filename(file.filename)

        # Optionally customize the filename by adding a timestamp or other identifiers
        timestamp = datetime.datetime.utcnow().strftime('%Y%m%d%H%M%S')  # Adds current timestamp
        # filename = f"{entity_type}_{entity_id}_{timestamp}_{original_filename}"
        filename = original_filename

        # Construct the full path where the file will be saved
        file_path = os.path.join(folder_path, filename)

        # Save the file to the specified folder
        file.save(file_path)

        # Prepare metadata (adjust fields to your use case)
        media_metadata = {
            "file": file_path,
            "entity_id": ObjectId(entity_id),
            "entity_type": entity_type,  # Can be "service" or "project"
            "folder_path": folder_path,
            "tags": tags,
            "uploaded_by": ObjectId(uploaded_by)
        }
            # "created_at": datetime.datetime.utcnow(),

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

# Helper function for handling media upload for both services and projects
# def handle_media_upload(file, entity_id, entity_type, folder_path, tags=["NONE"], uploaded_by="admin"):
#     print("File present in request.files: ", 'file' in request.files)
#     # Ensure the folder exists
#     if not os.path.exists(folder_path):
#         os.makedirs(folder_path)

#     if file and allowed_file(file.filename):
#         print("File received: ", file)
#         print("Tags: ", tags)
#         print("Folder Path: ", folder_path)
#         print("Entity ID: ", entity_id)
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(folder_path, filename)
#         file.save(file_path)
        


#         # Prepare metadata
#         media_metadata = {
#             "file_path": file_path,
#             "associated_id": ObjectId(entity_id),  # Can be service_id or project_id
#             "entity_type": entity_type,
#             "folder_path" : folder_path,
#             "tags": tags,
#             "uploaded_by": ObjectId(uploaded_by)
#             # "created_at": datetime.datetime.utcnow(),
#         }

# #         {
#     #     "file_path":"C:/Users/surface/Desktop/PORTEFOLIO/Reda/gardenCONSTRUCTION/backend/img/services/serviceIMG.jpg",
#     #     "associated_id": "66ff47008ff9712295198aaa",  
#     #     "media_type": "service",
#     #     "folder_path" : "C:/Users/surface/Desktop/PORTEFOLIO/Reda/gardenCONSTRUCTION/backend/img/services/",
#     #     "tags": "tags",
#     #     "created_at": "now",
#     #     "uploaded_by":"66ff3fb1041e67f42c7c4569"
#     #       }
    
    
#         # Save the metadata in the database
#         db = get_db()
#         db.media.insert_one(media_metadata)

#         return {"message": "File uploaded successfully", "file_path": file_path}, 200
#     elif file is None :
#         return {"message": "No file received"}, 400
#     else:
#         return {"error": "File type not allowed or no file provided"}, 400


    
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
    