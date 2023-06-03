import cv2
import numpy as np
from PIL import Image

def detect_and_crop_faces(image):
    original = image
    # Convert PIL image to OpenCV format (numpy array)
    img_array = np.array(image)
    image = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
    # Get the image dimensions
    height, width, channels = image.shape
    if(height == width):
        return [original]
    # Load the pre-trained Haar Cascade classifier for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Initialize a list to store the cropped face images
    cropped_faces = []

    # Iterate over the detected faces and crop them into square shape
    for i, (x, y, w, h) in enumerate(faces):
        # Calculate the center of the face
        center_x = x + w // 2
        center_y = y + h // 2

        # Calculate the size of the square
        scale = 1.5
        square_size = round(max(w, h)*scale)

        # Calculate the coordinates of the square ROI with boundary checks
        roi_x = max(center_x - square_size // 2, 0)
        roi_y = max(center_y - square_size // 2, 0)
        roi_x_end = min(roi_x + square_size, width)
        roi_y_end = min(roi_y + square_size, height)

        # Crop the face region from the image with boundary checks
        face_roi = image[roi_y:roi_y_end, roi_x:roi_x_end]

        # Convert the OpenCV image to PIL format
        pil_image = Image.fromarray(cv2.cvtColor(face_roi, cv2.COLOR_BGR2RGB))

        # Append the cropped face image to the list
        cropped_faces.append(pil_image)

    # Return the list of cropped face images
    return cropped_faces
