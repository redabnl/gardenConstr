import os
from flask import Blueprint, jsonify
from models.services_model import get_all_services, get_service_by_id
from bson import json_util, ObjectId


services_routes = Blueprint('services_routes', __name__)


@services_routes.route('/api/services', methods=['GET'])
def fetch_services():
    try:
        services = get_all_services()
        print(f"fetched all the servicesand ready to display as wished !")
        print(f'fetched services succesfully ! : \n {services}')
        return jsonify(services)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@services_routes.route('/api/service/<service_id>', methods=['GET'])
def get_single_service(service_id):
    try :    
        service = get_service_by_id(service_id)
        if service:
            return jsonify(service), 200
        return jsonify({"error": "Service not found"}), 404
    except Exception as e :
        return jsonify({"error": str(e)}), 500
    
# @services_routes.route('/api/service_images/<service_id>', methods=['GET'])
# def get_service_images(service_id):
#     # Fetch service details from the database based on the service_id
#     service = get_service_by_id(service_id)  # Your existing function
#     if not service:
#         return jsonify({"error": "Service not found"}), 404

#     gallery_path = service.get('gallery_path')
#     if not gallery_path:
#         return jsonify({"error": "No gallery path specified"}), 400

#     # Ensure the directory exists
#     full_path = os.path.join(os.getcwd(), 'frontend/public', gallery_path)
#     if not os.path.exists(full_path):
#         return jsonify({"error": "Directory not found"}), 404

#     # List files in the directory
#     images = [f for f in os.listdir(full_path) if os.path.isfile(os.path.join(full_path, f))]
#     image_urls = [f"{gallery_path}/{image}" for image in images]

#     return jsonify({"images": image_urls}), 200
    

# @services_routes.route('/api/services', methods=['GET'])
# def fetch_services():
#     try:
#         services = get_services_titles()  # Get services from MongoDB
#         all_services = []
#         for service in services:
#             print(f'service fetched : {service}')
#             service_fetched = get_service_by_name(service['title'])  # Adjust based on your structure
#             print(f'service Id fetched : {service_fetched}')
            
#             if service_fetched:
#                 all_services.append(service_fetched)
#             else:
#                 print(f"Service with title '{service['title']}' not found.")
            
#         return jsonify(all_services)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500



# @services_routes.route('/api/services', methods=['GET'])
# def fetch_services():
#     try:
#         services = get_services_titles()  # Get services from MongoDB
#         all_services = []
#         for service in services:
#             print(f'service fetched : {service}')
#             service_fetched = get_service_by_name(service['title'])
#             print(f'service Id fetched : {service_fetched}')
            
#             if service_fetched:
#                 all_services.append(service_fetched)
#             else:
#                 print(f"Service with title '{service['title']}' not found.")
            
#         return json_util.dumps(all_services), 200, {'Content-Type': 'application/json'}
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500






        # services_list = []
        # for service in services:
        #     services_list.append({
        #         "title": service.get("title"),
        #         "description": service.get("description"),
        #         "price_range": service.get("price_range", "N/A"),
        #         "tags": service.get("tags", []),
        #         "image_url": service.get("image_url", "/img/no_image.jpg")  # Optional image URL field
        #     })



# from flask import Flask, jsonify, request
# from ..models import create_service, get_all_services, get_service, update_service, delete_service

# app = Flask(__name__)

# @app.route('/services', methods=['GET'])
# def get_services():
#     services = get_all_services()
#     return jsonify(services), 200

# @app.route('/services/<service_id>', methods=['GET'])
# def get_single_service(service_id):
#     service = get_service(service_id)
#     if service:
#         return jsonify(service), 200
#     return jsonify({"error": "Service not found"}), 404

# @app.route('/services', methods=['POST'])
# def add_service():
#     data = request.json
#     service_id = create_service(data)
#     return jsonify({"service_id": service_id}), 201

# @app.route('/services/<service_id>', methods=['PUT'])
# def edit_service(service_id):
#     data = request.json
#     updated_count = update_service(service_id, data)
#     if updated_count > 0:
#         return jsonify({"message": "Service updated"}), 200
#     return jsonify({"error": "Service not found or not updated"}), 404

# @app.route('/services/<service_id>', methods=['DELETE'])
# def remove_service(service_id):
#     deleted_count = delete_service(service_id)
#     if deleted_count > 0:
#         return jsonify({"message": "Service deleted"}), 200
#     return jsonify({"error": "Service not found"}), 404

# # Enable CORS
# from flask_cors import CORS
# CORS(app)

# if __name__ == '__main__':
#     app.run(debug=True)
