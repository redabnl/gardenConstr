from flask import Blueprint, request, jsonify
from bson import ObjectId
from ..models.testimonial_model import save_testimonial, get_all_testimonials

testimonials_routes = Blueprint('testimonials_routes', __name__)

# POST route to add a testimonial
@testimonials_routes.route('/api/testimonials', methods=['POST'])
def post_testimonial():
    try:
        data = request.json
        print(f"Received data: {data}")

        # Save testimonial
        save_testimonial(data)
        return jsonify({"message": "Testimonial successfully added"}), 201
    except Exception as e:
        print(f"Error adding testimonial: {e}")
        return jsonify({"error": "Failed to add testimonial"}), 500

# GET route to fetch all testimonials
@testimonials_routes.route('/api/testimonials', methods=['GET'])
def get_testimonials():
    try:
        testimonials = get_all_testimonials()
        return jsonify(testimonials), 200
    except Exception as e:
        print(f"Error fetching testimonials: {e}")
        return jsonify({"error": "Failed to fetch testimonials"}), 500
