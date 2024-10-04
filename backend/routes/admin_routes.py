from werkzeug.security import generate_password_hash
# from models.admin_users_model import create_admin_user, get_admin_by_username
from ..models.admin_users_model import create_admin_user, get_admin_by_username, get_admin_by_id
from ..models.services_model import update_service_by_id, get_service_by_id, create_new_service
import jwt
from werkzeug.security import check_password_hash
import datetime
from flask import Blueprint, request, jsonify
from flask import current_app as app
from .auth_helpers import token_required
from dotenv import load_dotenv
import os
load_dotenv()

admin_routes = Blueprint('admin_routes', __name__)


# # Generate a hashed password
# password_hash = generate_password_hash('reda')

# # Create an admin user with username 'admin' and hashed password
# admin_user = create_admin_user('reda', password_hash)
# print(f"Admin user created: {admin_user}")
# Route to create new admin users, only accessible by superAdmins


@admin_routes.route('/api/admin/create', methods=['POST'])
def create_admin(): # admin_id as imput here
    try:
        # Fetch the admin's details from the database using the admin_id from the token
        # admin = get_admin_by_id(admin_id)
        
        # Check if the admin has the role of "superAdmin"
        # if admin.get('role') != 'superAdmin':
        #     return jsonify({"error": "Permission denied. Only superAdmins can create new admins."}), 403

        # Parse the new admin data from the request
        data = request.json
        new_username = data.get('username')
        new_password = data.get('password')
        new_role = data.get('role', 'admin')  # Default role is "admin" unless specified

        # Hash the new admin's password
        hashed_password = generate_password_hash(new_password)

        # Create the new admin user
        new_admin = create_admin_user(new_username, hashed_password, new_role)
        
        return jsonify({
            "message": "Admin user created successfully",
            "admin": {
                "username": new_admin['username'],
                "role": new_admin['role']
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_routes.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    admin = get_admin_by_username(username)
    if admin and check_password_hash(admin['password'], password):
        # Generate a JWT token
        token = jwt.encode({
            'admin_id': str(admin['_id']),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }, os.getenv("SECRET_KEY"), algorithm='HS256') ## 

        # Handle PyJWT returning bytes in Python 3+
        token_str = token if isinstance(token, str) else token.decode('utf-8')

        return jsonify({"token": token_str}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@admin_routes.route('/api/admin/services', methods=['POST'])
def create_service(): ## title, description, tags, price_range
    data = request.json
    title = data.get('title')
    description = data.get('description')
    tags = data.get('tags')
    price_range = data.get('price_range')

    try:
        new_service = create_new_service( title, description, tags, price_range)  # Create service
        return jsonify(new_service), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_routes.route('/api/admin/services/<service_id>', methods=['PUT'])
def update_service(service_id):
    # service_id = get_service_by_id(data.get('title'))
    data = request.json
    title = data.get('title')
    description = data.get('description')
    tags = data.get('tags')
    price_range = data.get('price_range')

    try:
        result = update_service_by_id(service_id, title, description, price_range, tags)  # Update service
        if result:
            return jsonify({"message": "Service updated successfully"}), 200
        return jsonify({"error": "Service not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# class Filter(admin.SimpleListFilter):
#     title = _("")
#     parameter_name = ""

#     def lookups(self, request, model_admin):
#         return ()

#     def queryset(self, request, queryset):
#         return queryset.filter(=self.value())
