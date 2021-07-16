import os
from flask import Flask, render_template, request
from reverseproxy import proxyRequest
from classifier import classifyImage

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = os.getenv('FRONTEND')

app = Flask(__name__)

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)


@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    if MODE == 'development':
        return proxyRequest(DEV_SERVER_URL, path)
    else:
        return render_template("index.html")


if __name__ == "__main__":
    app.run()


@app.route('/classify', methods=['POST'])
def classify():
    if (request.files['image']):
        file = request.files['image']

        result = classifyImage(file)
        print('Model classification: ' + result[0])
        return result
