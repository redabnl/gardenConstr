import datetime 
from bson.objectid import ObjectId
from flask import jsonify
from .db import get_db

# def create_new_service(title, description, tags, price_range="to discuss..."):
#     db = get_db()
#     new_service = {
#         "_id" : ObjectId(),
#         "title": title,
#         "description": description,  
#         "tags" : tags, 
#         "price_range" : price_range
#         # "image_path" : file_path
#     }
#     db.services.insert_one(new_service)
#     return new_service.get(title)

def create_service(title, description, tags, price_range):
    db = get_db()  # Get the database connection
    service = {
        "title": title,
        "description": description,
        "tags": tags,
        "price_range": price_range,
        "is_active": True,  # Default to active
        "created_at": datetime.datetime.utcnow()
    }
    result = db.services.insert_one(service)  # Insert the service into MongoDB
    service['_id'] = str(result.inserted_id)  # Convert ObjectId to string
    return service

def get_all_services():
    db = get_db()
    services = db.services.find()  # Fetch all documents from 'services' collection
    services_list = []
    for service in services:
        services_list.append({
            "title": service.get("title"),
            "description": service.get("description"),
            "price_range": service.get("price_range", "N/A"),
            "tags": service.get("tags", []),
            "image_url": service.get("image_url", "")  # Optional image URL field
        })
    return services_list

def get_services_titles():
    db = get_db()
    services_titles = list(db.services.find({}, {'title':1, '_id':0}))
    return services_titles

def get_service_by_name(service_title):
    db = get_db()  # Get the database reference
    service = db.services.find_one({"title": service_title})
    if service:
        return service["_id"]  # Return the ObjectId
    return None


def get_service_by_id(service_name):
    db = get_db()
    return db.services.find_one({"title": service_name})

def update_service_by_id(service_id, title, description, price_range, tags):
    db = get_db()

    # Create an update dictionary with the provided data
    update_data = {}

    if title:
        update_data['title'] = title
    if description:
        update_data['description'] = description
    if price_range:
        update_data['price_range'] = price_range
    if tags:
        update_data['tags'] = tags

    # Use MongoDB's update_one function to update the service
    result = db.services.update_one(
        {"_id": ObjectId(service_id)},  # Find the service by its ObjectId
        {"$set": update_data}  # Update the fields provided in the update_data dictionary
    )

    # Check if the service was successfully updated
    if result.matched_count == 0:
        return False  # No service found with the provided service_id

    return True

# from .db import get_db
# db = get_db()  # Get database instance

# # Define the collection for services
# services_collection = db['services']

# # Create a new service
# def create_service(data):
#     """
#     Adds a new service to the database.
#     :param data: Dictionary with title, description, price_range, tags
#     :return: Inserted document's ID
#     """
#     result = services_collection.insert_one({
#         'title': data['title'],
#         'description': data['description'],
#         'price_range': data['price_range'],
#         'tags': data.get('tags', []),
#         'is_active': data.get('is_active', True),
#         'created_at': data.get('created_at', datetime.utcnow())
#     })
#     return str(result.inserted_id)

# # Get all services
# def get_all_services():
#     """
#     Retrieves all services from the database.
#     :return: List of all services
#     """
#     services = list(services_collection.find())
#     return services

# # Get a single service by ID
# def get_service(service_id):
#     """
#     Retrieves a single service by its ID.
#     :param service_id: ObjectId of the service
#     :return: Service document
#     """
#     service = services_collection.find_one({'_id': ObjectId(service_id)})
#     return service

# # Update an existing service
# def update_service(service_id, data):
#     """
#     Updates a service in the database.
#     :param service_id: ObjectId of the service
#     :param data: Dictionary with updated fields
#     :return: Updated document
#     """
#     updated_service = services_collection.update_one(
#         {'_id': ObjectId(service_id)},
#         {'$set': data}
#     )
#     return updated_service.modified_count

# # Delete a service
# def delete_service(service_id):
#     """
#     Deletes a service by its ID.
#     :param service_id: ObjectId of the service
#     :return: Deletion status
#     """
#     result = services_collection.delete_one({'_id': ObjectId(service_id)})
#     return result.deleted_count
