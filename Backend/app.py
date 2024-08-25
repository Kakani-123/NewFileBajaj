from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.json.get('data', [])
        print("Received data:", data)  # Log received data
        
        numbers = [x for x in data if x.isdigit()]
        alphabets = [x for x in data if x.isalpha()]
        lowercase_alphabets = [x for x in alphabets if x.islower()]
        highest_lowercase = max(lowercase_alphabets) if lowercase_alphabets else None
        
        response = {
            "is_success": True,
            "user_id": "Kakani_Bhanu_Sri_11042004",  
            "email": "bhanusri.21bce9490@vitapstudent.ac.in",  
            "roll_number": "21BCE9490", 
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }
        return jsonify(response)
    except Exception as e:
        print("Error:", e)
        return jsonify({"is_success": False, "error": str(e)})

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)
