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
# model = load_model('./models/model1/')

model_path = '/app/src/model'

# model = tf.saved_model.load(os.path.join(os.getcwd(), 'model'))
model = tf.saved_model.load(model_path)


predict_fn = model.signatures['serving_default']

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
    # Convert input tensor to float
    input_data = tf.cast(input_data, tf.float32)
    prediction = predict_fn(conv2d_input=input_data)  # Use the loaded model for prediction
    # prediction = model.predict(input_data)
    print(prediction)
    # result =  {"prediction": [[1]]}
    result = {"prediction": prediction['dense_1'].numpy().tolist()}
    return result