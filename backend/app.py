import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from werkzeug.utils import redirect
from reverseproxy import proxyRequest
from classifier import classifyImage

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = os.getenv('FRONTEND')

app = Flask(__name__)
CORS(app)
app.config["CORS_ORIGINS"] = [DEV_SERVER_URL]

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)


@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    if MODE == 'development':
        return redirect(DEV_SERVER_URL)
    else:
        return render_template("index.html")


@app.route('/api/classify', methods=['POST'])
def classify():
    if (request.files['image']):
        file = request.files['image']

        raw = classifyImage(file)
        result = jsonify({"name": raw[0], "accuracy": raw[1]})
        result.headers.add("Access-Control-Allow-Origin", "*")

        return result


if __name__ == "__main__":
    app.run(host='0.0.0.0')
