from flask import Flask
from flask_cors import CORS
from .models.db_tests import db_tests
from .routes.services_routes import services_routes
from .routes.inquiries_routes import inquiries_routes

app = Flask(__name__)
CORS(app)

app.register_blueprint(db_tests)
app.register_blueprint(services_routes)
app.register_blueprint(inquiries_routes)


@app.route('/')
def home():
    return "good to go"
if __name__ == '__main__':
    app.run(debug=True)
