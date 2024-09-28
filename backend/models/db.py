from flask import Flask
from flask_pymongo import PyMongo
from pymongo import MongoClient
import os

# Initialize Flask app
app = Flask(__name__)

# MongoDB connection string
# Use environment variables to store sensitive information like the database URI
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "your_mongodb_connection_string")

# Initialize PyMongo client
mongo = PyMongo(app)

# You can also use the native MongoClient if you need additional control
client = MongoClient(app.config["MONGO_URI"])
db = client['garden_construction']  # Connect to the specific database

# Function to get the database instance
def get_db():
    return db
