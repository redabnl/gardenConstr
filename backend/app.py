from flask import Flask
import os
from flask_cors import CORS
# from .models.db_tests import db_tests
# from .routes.services_routes import services_routes
from routes.services_routes import services_routes 
from routes.inquiries_routes import inquiries_routes
from routes.projects_routes import projects_routes
from routes.admin_routes import admin_routes
from routes.media_routes import media_routes
from routes.testimonials_routes import testimonials_routes

app = Flask(__name__ , static_url_path='/static')
CORS(app)

# app.register_blueprint(db_tests)
app.register_blueprint(services_routes)
app.register_blueprint(inquiries_routes)
app.register_blueprint(projects_routes)
app.register_blueprint(admin_routes)
app.register_blueprint(media_routes)
app.register_blueprint(testimonials_routes)


@app.route('/')
def home():
    return "good to go"
if __name__ == '__main__':
    app.run(debug=True)
