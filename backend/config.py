import os
from backend import app

# Specify the folder for uploaded images
UPLOAD_FOLDER_SERVICES = './static/img/services'
UPLOAD_FOLDER_PROJECTS = './static/img/doneProjects'
app.config['STATIC_IMG_FOLDER'] = os.path.join(app.root_path, 'static/images/projects')

# Ensure the folders exist
os.makedirs(UPLOAD_FOLDER_SERVICES, exist_ok=True)
os.makedirs(UPLOAD_FOLDER_PROJECTS, exist_ok=True)

app.config['UPLOAD_FOLDER_SERVICES'] = UPLOAD_FOLDER_SERVICES
app.config['UPLOAD_FOLDER_PROJECTS'] = UPLOAD_FOLDER_PROJECTS

