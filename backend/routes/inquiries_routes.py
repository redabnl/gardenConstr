from bson import ObjectId, errors
from flask import Blueprint, request, jsonify
import datetime
from ..models.db import get_db, db
from .auth_helpers import token_required
from ..models.inquiries_model import save_inquiries, get_all_inquiries
from ..models.services_model import get_service_by_name

inquiries_routes = Blueprint('inquiries_routes', __name__)


from bson import ObjectId, errors

@inquiries_routes.route('/api/inquiries', methods=['POST'])
def post_inquiry():
    try:
        data = request.json
        print(f"Received data: {data}")

        service_title = data.get('service_id')  # This is actually the service title
        print(f"Service Title: {service_title}")

        # Use the function to get the service's ObjectId from its title
        service_id = get_service_by_name(service_title)
        if not service_id:
            print("Service not found")
            return jsonify({"error": "Invalid service selected"}), 400

        print(f"Service ID (ObjectId): {service_id}")

        # Insert the inquiry into client_inquiries collection
        inquiry = {
            "client_name": data.get('client_name'),
            "email": data.get('email'),
            "phone_number": data.get('phone_number'),
            "service_id": str(service_id),  # Store the ObjectId as a string
            "status": "pending",
            "message": data.get('message'),
            "created_at": datetime.datetime.utcnow()
        }
        db.client_inquiries.insert_one(inquiry)
        print("Inquiry successfully inserted")
        return jsonify({"message": "Inquiry submitted successfully"}), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


# @inquiries_routes.route('/api/inquiries', methods=['POST'])
# def submit_inquiry():
#     try:
#         data = request.json
#         service_id = data.get('service_id')
#         # service_name = data.get('service')  # Get the service name from the form
#         # service = get_service_by_name(service_name)  # Look up the service by name
        
#         # if not service:
#         #     return jsonify({"error": "Invalid service selected"}), 400
#         service = db.services.find_one({"_id": ObjectId(service_id)})
#         if not service:
#             return jsonify({"error": "Invalid service selected"}), 400
#         # Include the service ObjectId in the inquiry data
#         data['service_id'] = service['_id']

#         inquiry_saved = save_inquiries(data) 
#         if inquiry_saved :
#         # Save inquiry in MongoDB with service ObjectId
#             return jsonify({"message": "Inquiry submitted successfully!"}), 201
#         else :
#             return jsonify({"error": "Failed to submit inquiry"}), 500
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    

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
