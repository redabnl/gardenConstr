from flask import Flask, jsonify
from backend import app
from .db import get_db
from flask import Blueprint, jsonify



db_tests = Blueprint('db_tests', __name__)


@db_tests.route('/db_conn', methods=['GET'])
def test_db_connection():
    try:
        # Try to get the db instance
        db = get_db()
        if db is None:
            return jsonify({
                "success": False,
                "error": "Database connection is None"
            }), 500

        # Try to list all collections in the database
        collections = db.list_collection_names()
        return jsonify({
            "success": True,
            "collections": collections
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Database connection failed: {str(e)}"
        }), 500
