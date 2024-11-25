from datetime import datetime 
from bson.objectid import ObjectId
from .db import get_db
from flask import request, jsonify, current_app
import os


## function to fetch all done projects (PORTFOLIO)
def get_all_projects_details():
    db = get_db()
    
    # Fetch all admins from gthe 'admin_users' collection
    projects =list(db.projects.find({}))
    print(f"projects fetched : {projects}")
    
    for project in projects:    
        print(f"image paths : {project['gallery_images']}")
        project['_id'] = str(project['_id'])
        if 'service_id' in project:
            project['service_id'] = str(project['service_id'])  # Convert ObjectId to string
        
        # if 'created_at' in project:
        #     project['created_at'] = project['created_at'].isoformat()  # Convert datetime to ISO format
        # if 'completed_at' in project:
        #     project['completed_at'] = project['completed_at'].isoformat()

    return projects



def serialize_project(project):
    # Convert ObjectId to string
    project['_id'] = str(project['_id'])
    
    
    # Convert any other ObjectId fields, like foreign keys, if they exist
    if 'service_id' in project:
        project['service_id'] = str(project['service_id'])
    if 'testimonial_id' in project and project['testimonial_id'] is not None:
        project['testimonial_id'] = str(project['testimonial_id'])

    # If the project has arrays of ObjectIds (e.g., related images or media), convert those too
    if 'images' in project:
        for image in project['images']:
            if 'id' in image:
                image['id'] = str(image['id'])

    return project


def get_all_projects():
    db = get_db()
    
    projects = db.projects.find({})
    project_list = []

    # Base URL for serving static images
    static_url = current_app.config.get('STATIC_URL', 'http://localhost:5000/static/images/projects/')

    for project in projects: 
        project['_id'] = str(project['_id'])
        if 'service_id' in project:
            project['service_id'] = str(project['service_id'])  # Convert ObjectId to string
        if 'testimonial_id' in project and project['testimonial_id'] is not None:
            project['testimonial_id'] = str(project['testimonial_id'])  # Convert ObjectId to string if it exists

        # Add image URLs for the project
        project_folder = project['title'].replace(' ', '_')
        if project_folder:
            image_folder_path = os.path.join(current_app.root_path, 'static', 'images', 'projects', project_folder)
            if os.path.exists(image_folder_path):
                image_files = [f"{static_url}{project_folder}/{img}" for img in os.listdir(image_folder_path) if img.endswith(('.jpg', '.png', '.jpeg'))]
                project['image_urls'] = image_files
            else:
                project['image_urls'] = []  # Empty list if folder does not exist
        else:
            project['image_urls'] = []

        print(f"project {project['title']} with id {project['_id']}")
        project_list.append(project)

    return project_list

# def get_all_projects():
#     db = get_db()
    
#     projects = db.projects.find({})
#     project_list = []
#     for project in projects : 
#         project['_id'] = str(project['_id'])
#         if 'service_id' in project:
#             project['service_id'] = str(project['service_id'])  # Convert ObjectId to string
#         if 'testimonial_id' in project and project['testimonial_id'] is not None:
#             project['testimonial_id'] = str(project['testimonial_id'])  # Convert ObjectId to string if it exists
#         print(f"project {project['title']} with id {project['_id']}")
#         project_list.append(project)

#     return project_list



        
def get_project_id(project_id):
    db = get_db()
    try:
        project = db.projects.find_one({
            "_id": ObjectId(project_id)
        })
        return project
    except Exception as e:
        print(f"Error fetching project by ID: {e}")
        return None

# Function to add a new project
# def add_project(title, description, location, gallery_images, completed_at):
#     db = get_db()
#     new_project = {
#         "title": title,
#         "description": description,
#         "location": location,
#         "gallery_images": gallery_images,
#         "completed_at": completed_at if completed_at else None,
#         "created_at": datetime.utcnow()
#     }
#     db.projects.insert_one(new_project)
#     return new_project

def save_project(data):
    db = get_db()
    """
    Save a new project to the database.

    Args:
        data (dict): The project data to be saved.

    Returns:
        dict: The saved project document.
    """
    try:
        # Prepare the project document
        project = {
            "title": data["title"],
            "description": data["description"],
            "category": data["category"],
            "duration": data["duration"],
            "location": data["location"],
            "completion_date": data["completion_date"],
            "image_urls": data["image_urls"],  # List of image URLs
            "materials": data.get("materials", []),  # Optional field
        }

        # Insert the project into the database
        result = db.projects.insert_one(project)

        # Retrieve the inserted project using its ID
        saved_project = db.projects.find_one({"_id": ObjectId(result.inserted_id)})

        return saved_project
    except Exception as e:
        print(f"Error saving project to database: {e}")
        return None

# Function to update an existing project
def update_project(project_id, title, description, location, gallery_images, completed_at):
    db = get_db()
    update_data = {
        "title": title,
        "description": description,
        "location": location,
        "gallery_images": gallery_images,
        "completed_at": datetime.fromisoformat(completed_at) if completed_at else None
    }
    
    result = db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_data}
    )
    
    return result.modified_count > 0

# Function to delete a project
def delete_project(project_id):
    db = get_db()
    result = db.projects.delete_one({"_id": ObjectId(project_id)})
    return result.deleted_count > 0

