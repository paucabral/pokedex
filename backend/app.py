import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import redirect
from classifier import classifyImage

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = os.getenv('FRONTEND')
PORT = os.getenv('FLASK_PORT')

app = Flask(__name__)
CORS(app)
app.config["CORS_ORIGINS"] = [DEV_SERVER_URL]


@app.route('/')
@app.route('/<path:path>')
def index():
    return redirect(DEV_SERVER_URL)


@app.route('/api/classify', methods=['POST'])
def classify():
    if (request.files['image']):
        file = request.files['image']

        raw = classifyImage(file)
        result = jsonify({"name": raw[0], "accuracy": raw[1]})
        result.headers.add("Access-Control-Allow-Origin", "*")

        return result


if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True, port=PORT)
