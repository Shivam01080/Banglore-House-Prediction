from flask import Flask, request, jsonify
import util
app = Flask(__name__)


@app.route('/get_location')
def get_location():
    response = jsonify({'locations': util.get_location()})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({'estimated_price' : util.estimate_price(location, total_sqft, bhk, bath)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    print('Starting Flask Server')
    util.load_artifacts()
    app.run()
