from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

import os
import io
import tensorflow as tf
from PIL import Image, ImageChops, ImageEnhance
import numpy as np

app = FastAPI()
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set the allowed origins (replace "*" with specific origins if required)
    allow_credentials=True,
    allow_methods=["*"],  # Set the allowed HTTP methods
    allow_headers=["*"],  # Set the allowed headers
)
model = tf.keras.models.load_model('./model/model_lightweight_73.h5')

#Perform Error Level Analysis on the image to improve the accuracy of the prediction.
def apply_ela(image_path, output_image_path, temp_path):
    temp_image_path = os.path.join(temp_path, "temp.jpg")
    image = Image.open(image_path)
    image.save(temp_image_path, "JPEG", quality=90)
    temp_image = Image.open(temp_image_path)
    ela_image = ImageChops.difference(image, temp_image)
    extrema = ela_image.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    if max_diff == 0:
        max_diff = 1
    scale = 255.0 / max_diff
    ela_image = ImageEnhance.Brightness(ela_image).enhance(scale)
    ela_image.save(output_image_path, "JPEG")
    #Remove the temp image
    os.remove(temp_image_path)

def imagePreprocessing(image):
    # Resize the image to the desired input shape
    image = image.resize((512, 512))
    
    #Temporarily store the image
    image_path = os.path.join(os.getcwd(), "image.jpg")
    image.save(image_path)
    
    #Prepare some paths for ELA Process
    temp_path = os.path.join(os.getcwd(), "temp")
    if not os.path.exists(temp_path):
        os.mkdir(temp_path)
    output_path = os.path.join(os.getcwd(), "output")
    if not os.path.exists(output_path):
        os.mkdir(output_path)
    output_image_path = os.path.join(output_path, "output.jpg")
    
    #Apply ELA
    apply_ela(image_path, output_image_path, temp_path)
    
    
    output_image = Image.open(output_image_path)
    output_image = np.array(output_image) #Convert the image to numpy array
    output_image = output_image / 255.0 #Normalize the image
    output_image = np.expand_dims(output_image, axis= 0) #Expand the dimensions to match the input shape of the model
    
    #Delete the temporary files
    os.remove(output_image_path)
    os.remove(image_path)
    return output_image


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/predict")
async def predict(request: Request):
    #get image from the form data
    data = await request.form()
    image = await data["image"].read() #Read the image
    image = Image.open(io.BytesIO(image)) #Convert the image to PIL format
    input_data = imagePreprocessing(image) #Preprocess the image
    prediction = model.predict(input_data)  # Use the loaded model for prediction
    result = {"prediction": prediction.tolist()}
    # result = "result"
    return result