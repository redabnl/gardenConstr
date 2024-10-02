from datetime import datetime 
from bson.objectid import ObjectId
# from ..db import get_db
from .db import get_db
db = get_db()  # Get database instance

# Define the collection for services
services_collection = db['services']

# Create a new service
def create_service(data):
    """
    Adds a new service to the database.
    :param data: Dictionary with title, description, price_range, tags
    :return: Inserted document's ID
    """
    result = services_collection.insert_one({
        'title': data['title'],
        'description': data['description'],
        'price_range': data['price_range'],
        'tags': data.get('tags', []),
        'is_active': data.get('is_active', True),
        'created_at': data.get('created_at', datetime.utcnow())
    })
    return str(result.inserted_id)

# Get all services
def get_all_services():
    """
    Retrieves all services from the database.
    :return: List of all services
    """
    services = list(services_collection.find())
    return services

# Get a single service by ID
def get_service(service_id):
    """
    Retrieves a single service by its ID.
    :param service_id: ObjectId of the service
    :return: Service document
    """
    service = services_collection.find_one({'_id': ObjectId(service_id)})
    return service

# Update an existing service
def update_service(service_id, data):
    """
    Updates a service in the database.
    :param service_id: ObjectId of the service
    :param data: Dictionary with updated fields
    :return: Updated document
    """
    updated_service = services_collection.update_one(
        {'_id': ObjectId(service_id)},
        {'$set': data}
    )
    return updated_service.modified_count

# Delete a service
def delete_service(service_id):
    """
    Deletes a service by its ID.
    :param service_id: ObjectId of the service
    :return: Deletion status
    """
    result = services_collection.delete_one({'_id': ObjectId(service_id)})
    return result.deleted_count
