from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os
import io
import tensorflow as tf
from PIL import Image
from utils.image_preprocess import image_preprocess

load_dotenv()
app = FastAPI()
front_end_url = os.getenv("FRONT_END_URL")
# front_end_url 
# Configure CORS
origins = [front_end_url]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  # Set the allowed HTTP methods
    allow_headers=["*"],  # Set the allowed headers
)
model = tf.keras.models.load_model('./models/model.h5')

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
    image = image.convert("RGB") # Convert the image to JPEG format
    input_data = image_preprocess(image) #Preprocess the image
    prediction = model.predict(input_data)  # Use the loaded model for prediction
    result = {"prediction": prediction.tolist()}
    # result = "result"
    return result