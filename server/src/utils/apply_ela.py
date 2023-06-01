#Perform Error Level Analysis on the image to improve the accuracy of the prediction.
import os
from PIL import Image, ImageChops, ImageEnhance

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