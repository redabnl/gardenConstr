from bson import ObjectId
from .db import get_db

# Save a testimonial to the database
def save_testimonial(testimonial_data):
    db = get_db()
    testimonial = {
        "client_name": testimonial_data.get("client_name"),
        "testimonial_text": testimonial_data.get("testimonial_text"),
        "rating": testimonial_data.get("rating", None),  # Optional
        "service_id": testimonial_data.get("service_id", None),  # Optional reference to the service
        "created_at": testimonial_data.get("created_at", None)  # Default set by frontend or client
    }
    db.testimonials.insert_one(testimonial)

# Get all testimonials
def get_all_testimonials():
    db = get_db()
    testimonials = db.testimonials.find()
    testimonials_list = []
    for testimonial in testimonials:
        testimonials_list.append({
            "_id": str(testimonial["_id"]),
            "client_name": testimonial.get("client_name"),
            "testimonial_text": testimonial.get("testimonial_text"),
            "rating": testimonial.get("rating", None),
            "service_id": str(testimonial.get("service_id")) if testimonial.get("service_id") else None,
            "created_at": testimonial.get("created_at")
        })
    return testimonials_list
