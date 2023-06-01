from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

import os
import io
import tensorflow as tf
from PIL import Image
from utils.image_preprocess import image_preprocess
app = FastAPI()
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set the allowed origins (replace "*" with specific origins if required)
    allow_credentials=True,
    allow_methods=["*"],  # Set the allowed HTTP methods
    allow_headers=["*"],  # Set the allowed headers
)
model = tf.keras.models.load_model('./models/model_lightweight_73.h5')

#Just for testing
@app.get("/")
async def root():
    return {"message": "Hello There this is my root api endpoint. I'm Cuong by the way."}

@app.post("/predict")
async def predict(request: Request):
    #get image from the form data
    data = await request.form()
    image = await data["image"].read() #Read the image
    image = Image.open(io.BytesIO(image)) #Convert the image to PIL format
    input_data = image_preprocess(image) #Preprocess the image
    prediction = model.predict(input_data)  # Use the loaded model for prediction
    result = {"prediction": prediction.tolist()}
    # result = "result"
    return result