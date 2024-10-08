from flask import Blueprint, request, jsonify
from .auth_helpers import token_required
from ..models.inquiries_model import save_inquiries, get_all_inquiries
from ..models.services_model import get_service_by_name

inquiries_routes = Blueprint('inquiries_routes', __name__)

@inquiries_routes.route('/api/inquiries', methods=['POST'])
def submit_inquiry():
    try:
        data = request.json
        service_name = data.get('service')  # Get the service name from the form
        service = get_service_by_name(service_name)  # Look up the service by name
        
        if not service:
            return jsonify({"error": "Invalid service selected"}), 400

        # Include the service ObjectId in the inquiry data
        data['service_id'] = service['_id']

        save_inquiries(data)  # Save inquiry in MongoDB with service ObjectId
        return jsonify({"message": "Inquiry submitted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@inquiries_routes.route('/api/inquiries', methods=['GET'])
def get_inquiries():
    try : 
        inquiries = get_all_inquiries()
        return jsonify({
            "success" : True,
            "message" : inquiries
                        }), 200
    except Exception as e:
        return jsonify({
            "error" : str(e)
        })
