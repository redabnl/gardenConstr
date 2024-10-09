from flask import Blueprint, jsonify
from ..models.services_model import get_all_services, get_services_titles

services_routes = Blueprint('services_routes', __name__)

@services_routes.route('/api/services', methods=['GET'])
def fetch_services():
    try:
        services = get_services_titles()  # Get services from MongoDB
        return jsonify(services), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



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
