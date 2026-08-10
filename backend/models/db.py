import os
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Load MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("MONGO_URI environment variable is not set. Set it in the Render dashboard or your .env file.")

app.config["MONGO_URI"] = MONGO_URI

# Initialize the PyMongo client
mongo = PyMongo(app)

# If the URI does not include a database name, fall back to a default one
db = mongo.db
if db is None:
    db = mongo.cx[os.getenv("MONGO_DB_NAME", "garden_construction")]

# Verify the connection so startup fails with a clear message if the URI is wrong
try:
    db.command("ping")
except Exception as e:
    raise Exception(f"MongoDB connection failed: {e}")

def get_db():
    return db
