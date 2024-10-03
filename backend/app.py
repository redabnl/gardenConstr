from flask import Flask
from flask_cors import CORS
from .models.db_tests import db_tests


app = Flask(__name__)
CORS(app)

app.register_blueprint(db_tests)


@app.route('/')
def home():
    return "good to go"
if __name__ == '__main__':
    app.run(debug=True)
