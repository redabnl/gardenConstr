from datetime import datetime 
from bson.objectid import ObjectId
from .db import get_db


## function to fetch all done projects (PORTFOLIO)
def get_all_projects():
    db = get_db()
    
    # Fetch all admins from gthe 'admin_users' collection
    projects =list(db.projects.find({}))
    print(f"projexts fetched : {projects}")
    
    for project in projects:    
        project['_id'] = str(project['_id'])
        if 'service_id' in project:
            project['service_id'] = str(project['service_id'])  # Convert ObjectId to string
        if 'testimonial_id' in project and project['testimonial_id'] is not None:
            project['testimonial_id'] = str(project['testimonial_id'])  # Convert ObjectId to string if it exists
        # if 'created_at' in project:
        #     project['created_at'] = project['created_at'].isoformat()  # Convert datetime to ISO format
        # if 'completed_at' in project:
        #     project['completed_at'] = project['completed_at'].isoformat()

    return projects

# Function to add a new project
def add_project(title, description, location, gallery_images, completed_at):
    db = get_db()
    new_project = {
        "title": title,
        "description": description,
        "location": location,
        "gallery_images": gallery_images,
        "completed_at": completed_at if completed_at else None,
        "created_at": datetime.utcnow()
    }
    db.projects.insert_one(new_project)
    return new_project

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