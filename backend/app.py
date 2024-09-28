from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "goof to go"
if __name__ == '__main__':
    app.run(debug=True)
