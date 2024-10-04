import jwt
import datetime
from functools import wraps
from flask import request, jsonify
from flask import current_app as app


# Generate JWT token
def generate_token(admin_id, secret_key):
    token = jwt.encode({
        'admin_id': str(admin_id),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)  # Token expiration
    }, secret_key, algorithm='HS256')

    # PyJWT returns the token as bytes, convert it to string
    return token if isinstance(token, str) else token.decode('utf-8')

def decode_token(token, secret_key):
    try:
        data = jwt.decode(token, secret_key, algorithms=['HS256'])
        return data
    except jwt.ExpiredSignatureError:
        return None  # Token has expired
    except jwt.InvalidTokenError:
        return None  # Invalid token


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({"message": "Token is missing!"}), 403
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            admin_id = data['admin_id']
        except:
            return jsonify({"message": "Token is invalid!"}), 403
        
        return f(admin_id, *args, **kwargs)
    
    return decorated


