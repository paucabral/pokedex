import os
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import ImageFile, Image
from dotenv import load_dotenv

from classifications import pokemon_list

load_dotenv()
ImageFile.LOAD_TRUNCATED_IMAGES = True

# Specify model.
MODEL_PATH = os.getenv('MODEL_PATH')
model = keras.models.load_model(MODEL_PATH)


def getPrediction(img_file, model):
    img_height = 200
    img_width = 200

    original_image = Image.open(img_file)
    original_image = original_image.convert('RGB')
    original_image = original_image.resize(
        (img_height, img_width), Image.NEAREST)

    img_array = keras.preprocessing.image.img_to_array(original_image)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch.

    predictions = model.predict(img_array)

    return predictions


def classifyImage(file):
    # Returns a probability scores matrix.
    preds = getPrediction(file, model)

    score = tf.nn.softmax(preds[0])

    # Evaluation score for sotmax.
    eval_score = (np.max(score)/(np.max(score) + np.min(score))) * 100

    best = np.argmax(score)

    # Class names arranged based on the arrangement of classification paths.
    class_names = pokemon_list

    result = [class_names[best], eval_score]

    return result
