from .db import get_db
from bson.objectid import ObjectId
import datetime

# Function to get admin by username
def get_admin_by_username(username):
    db = get_db()
    return db.admin_users.find_one({"username": username})

def create_admin_user(username, password_hash, role="admin"):
    db = get_db()
    
    # Check if the username already exists to prevent duplicates
    if db.admin_users.find_one({"username": username}):
        return {"error": "Username already exists"}
    
    # Create the admin user document
    admin_user = {
        "_id": ObjectId(),  # Ensure we explicitly create an ObjectId
        "username": username,
        "password": password_hash,  # Store the hashed password
        "role": role,  # Default role for admins
        "created_at": datetime.datetime.utcnow()  # Timestamp for when the admin was created
    }
    
    # Insert the new admin user into the database
    db.admin_users.insert_one(admin_user)
    
    return admin_user 
# Function to get an admin by ID
def get_admin_by_id(admin_id):
    db = get_db()
    return db.admin_users.find_one({"_id": ObjectId(admin_id)})
