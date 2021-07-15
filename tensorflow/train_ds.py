# Based on the guide from the Image Classification guide from TensorFlow
# Guide Link: https://www.tensorflow.org/tutorials/images/classification

from tensorflow.python.client import device_lib
import tensorflow as tf
import pathlib
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

# Additional imports for visualization
# import matplotlib.pyplot as plt
# import numpy as np
# import os
# import PIL

# Check if GPU is CUDA compatible.
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))
print("CUDA Compute Compatibility", tf.test.is_gpu_available(
    cuda_only=False, min_cuda_compute_capability=None))
print(device_lib.list_local_devices())

# Specify directory of dataset.
DATA_DIR = pathlib.Path('dataset')

# Specify the name of model to be saved.
MODEL_FILENAME = 'model.h5'

# Count number of images
# img_count = len(list(DATA_DIR.glob('*/*.???')))
# print(img_count)

# Displaying an Image
# pikachu = list(DATA_DIR.glob('pikachu/*'))
# PIL.Image.open(str(pikachu[0])).show()

# Parameters
batch_size = 32
img_height = 200
img_width = 200

# The dataset is splitted into training set and validation set.
val_split = 0.1

# Training
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATA_DIR,
    validation_split=val_split,
    subset="training",
    seed=123,
    image_size=(img_height, img_width),
    batch_size=batch_size)

# Validation
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATA_DIR,
    validation_split=val_split,
    subset="validation",
    seed=123,
    image_size=(img_height, img_width),
    batch_size=batch_size)

# Fetching the classifications.
class_names = train_ds.class_names

# Displaying the classifications.
# print(class_names)

AUTOTUNE = tf.data.AUTOTUNE

train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

normalization_layer = layers.experimental.preprocessing.Rescaling(1./255)

normalized_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
image_batch, labels_batch = next(iter(normalized_ds))
first_image = image_batch[0]

# Number of classes is defined.
num_classes = len(class_names)

model = Sequential([
    layers.experimental.preprocessing.Rescaling(
        1./255, input_shape=(img_height, img_width, 3)),
    layers.Conv2D(16, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(32, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(num_classes)
])

model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(
                  from_logits=True),
              metrics=['accuracy'])

model.summary()

# Declare number of full iteration over samples.
epochs = 200
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=epochs
)

# Save the model into a file.
model.save(MODEL_FILENAME)
