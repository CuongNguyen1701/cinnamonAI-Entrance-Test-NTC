
import os
from PIL import Image
import numpy as np
from utils.apply_ela import apply_ela
from utils.detect_and_crop_faces import detect_and_crop_faces
def image_preprocess(image, image_size=(512,512)):
    faces = detect_and_crop_faces(image)
    if len(faces) > 0:
        image = faces[0]
    # Resize the image to the desired input shape
    image = image.resize(image_size)
    
    #Temporarily store the image
    image_path = os.path.join(os.getcwd(), "image.jpg")
    image.save(image_path)
    
    #Prepare some paths for ELA Process
    temp_path = os.path.join(os.getcwd(), "temp")
    output_path = os.path.join(os.getcwd(), "output")
    os.makedirs(temp_path, exist_ok=True)
    os.makedirs(output_path, exist_ok=True)
    output_image_path = os.path.join(output_path, "output.jpg")
    
    #Apply ELA
    apply_ela(image_path, output_image_path, temp_path)
    
    #Convert the image to appropriate format for AI model input
    output_image = Image.open(output_image_path)
    output_image = np.array(output_image) #Convert the image to numpy array
    output_image = output_image / 255.0  # Normalize the image (0-1)
    output_image = np.expand_dims(output_image, axis= 0) #Expand the dimensions to match the input shape of the model
    print(output_image.shape)
    #Delete the temporary files and folders
    os.remove(output_image_path)
    os.remove(image_path)
    os.rmdir(temp_path)
    os.rmdir(output_path)
    return output_image
