import os
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Load MongoDB URI from environment variables
app.config["MONGO_URI"] = os.getenv("MONGO_URI")

# Initialize the PyMongo client
mongo = PyMongo(app)

# Test the connection by getting a reference to the database
db = mongo.db

def get_db():
    if db is None:
        raise Exception(f"database connection failed")
    return db
