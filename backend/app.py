from flask import Flask, send_from_directory, jsonify
import os
from flask_cors import CORS
from routes.services_routes import services_routes 
from routes.inquiries_routes import inquiries_routes
from routes.projects_routes import projects_routes
from routes.admin_routes import admin_routes
from routes.media_routes import media_routes
from routes.testimonials_routes import testimonials_routes

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.join(BACKEND_DIR, '..', 'frontend', 'build')
BACKEND_STATIC = os.path.join(BACKEND_DIR, 'static')

app = Flask(__name__, static_folder=None)
CORS(app)

app.register_blueprint(services_routes)
app.register_blueprint(inquiries_routes)
app.register_blueprint(projects_routes)
app.register_blueprint(admin_routes)
app.register_blueprint(media_routes)
app.register_blueprint(testimonials_routes)


@app.route('/static/<path:filename>')
def serve_static(filename):
    backend_file = os.path.join(BACKEND_STATIC, filename)
    frontend_file = os.path.join(FRONTEND_DIST, 'static', filename)
    if os.path.isfile(backend_file):
        return send_from_directory(BACKEND_STATIC, filename)
    if os.path.isfile(frontend_file):
        return send_from_directory(os.path.join(FRONTEND_DIST, 'static'), filename)
    return send_from_directory(BACKEND_STATIC, filename)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path.startswith('api/'):
        return jsonify({"error": "Not found"}), 404
    index_path = os.path.join(FRONTEND_DIST, 'index.html')
    if not os.path.exists(index_path):
        return "Frontend not built yet. Run `npm run build` in the frontend directory.", 503
    return send_from_directory(FRONTEND_DIST, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
