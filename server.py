from flask import Flask, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests

app = Flask(__name__)

@app.route('/google-login', methods=['POST'])
def google_login():
    data = request.json
    token = data.get('token')

    try:
        # Verify the token
        client_id = "170380945132-rrsnussubru3orhg4ssl5gal54ivuoob.apps.googleusercontent.com"
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), client_id)

        # Extract user details
        user_email = idinfo['email']
        user_name = idinfo['name']

        return jsonify({"success": True, "user": {"email": user_email, "name": user_name}})
    except ValueError:
        return jsonify({"success": False, "message": "Invalid token"}), 401

@app.route('/process-order', methods=['POST'])
def process_order():
    data = request.json
    email = data.get('email')
    order_details = data.get('orderDetails')
    position = data.get('position')

    try:
        # Simulate order processing
        return jsonify({"message": f"Order received for {order_details}. Position in line: {position}"})
    except Exception as e:
        return jsonify({"message": f"Error processing order: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
