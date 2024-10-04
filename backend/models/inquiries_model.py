from .db import get_db



## client's inquiries
def save_inquiries(inquiry_data):
    db = get_db()
    inquiry = {
        "client_name": inquiry_data.get("client_name"),
        "email": inquiry_data.get("email"),
        "phone_number": inquiry_data.get("phone_number", ""),  # Optional
        "message": inquiry_data.get("message"),
        "service_id": inquiry_data.get("service_id"),  # Optional reference to the service
        "status": "pending",  # Default status
        "created_at": inquiry_data.get("created_at", None)
    }
    db.client_inquiries.insert_one(inquiry)
    
def get_all_inquiries():
    db = get_db()
    inquiries = db.client_inquiries.find()
    return list(inquiries)