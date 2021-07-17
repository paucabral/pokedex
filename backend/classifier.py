import os
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import ImageFile, Image
from io import BytesIO
from dotenv import load_dotenv

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
    img_array = tf.expand_dims(img_array, 0)  # Create a batch

    predictions = model.predict(img_array)

    return predictions


def classifyImage(file):
    # Returns a probability scores matrix
    preds = getPrediction(file, model)

    score = tf.nn.softmax(preds[0])

    eval_score = (np.max(score)/(np.max(score) + np.min(score))) * 100
    best = np.argmax(score)

    # Class names arranged based on the arrangement of classification paths.
    pokemon_list = ['abra', 'aerodactyl', 'alakazam', 'arbok', 'arcanine', 'articuno', 'beedrill', 'bellsprout', 'blastoise', 'bulbasaur', 'butterfree', 'caterpie', 'chansey', 'charizard', 'charmander', 'charmeleon', 'clefable', 'clefairy', 'cloyster', 'cubone', 'dewgong', 'diglett', 'ditto', 'dodrio', 'doduo', 'dragonair', 'dragonite', 'dratini', 'drowzee', 'dugtrio', 'eevee', 'ekans', 'electabuzz', 'electrode', 'exeggcute', 'exeggutor', 'farfetchd', 'fearow', 'flareon', 'gastly', 'gengar', 'geodude', 'gloom', 'golbat', 'goldeen', 'golduck', 'golem', 'graveler', 'grimer', 'growlithe', 'gyarados', 'haunter', 'hitmonchan', 'hitmonlee', 'horsea', 'hypno', 'ivysaur', 'jigglypuff', 'jolteon', 'jynx', 'kabuto', 'kabutops', 'kadabra', 'kakuna', 'kangaskhan', 'kingler', 'koffing', 'krabby', 'lapras', 'lickitung', 'machamp', 'machoke', 'machop', 'magikarp',
                    'magmar', 'magnemite', 'magneton', 'mankey', 'marowak', 'meowth', 'metapod', 'mew', 'mewtwo', 'moltres', 'mr-mime', 'muk', 'nidoking', 'nidoqueen', 'nidoran-f', 'nidoran-m', 'nidorina', 'nidorino', 'ninetales', 'oddish', 'omanyte', 'omastar', 'onix', 'paras', 'parasect', 'persian', 'pidgeot', 'pidgeotto', 'pidgey', 'pikachu', 'pinsir', 'poliwag', 'poliwhirl', 'poliwrath', 'ponyta', 'porygon', 'primeape', 'psyduck', 'raichu', 'rapidash', 'raticate', 'rattata', 'rhydon', 'rhyhorn', 'sandshrew', 'sandslash', 'scyther', 'seadra', 'seaking', 'seel', 'shellder', 'slowbro', 'slowpoke', 'snorlax', 'spearow', 'squirtle', 'starmie', 'staryu', 'tangela', 'tauros', 'tentacool', 'tentacruel', 'vaporeon', 'venomoth', 'venonat', 'venusaur', 'victreebel', 'vileplume', 'voltorb', 'vulpix', 'wartortle', 'weedle', 'weepinbell', 'weezing', 'wigglytuff', 'zapdos', 'zubat']

    result = pokemon_list[best]

    return result
