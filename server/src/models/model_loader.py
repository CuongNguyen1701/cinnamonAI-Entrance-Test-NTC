
from tensorflow import keras
from keras.models import load_model
from tensorflow.keras import layers
from tensorflow.keras.layers import Conv2D, BatchNormalization
def model_loader(model_path):
    class ConvBlock(layers.Layer):
        def __init__(self, filters, kernel_size, stride=1, padding='valid'):
            super().__init__()
            self.conv = Conv2D(filters, kernel_size, stride, padding)
            self.norm = BatchNormalization()
            self.relu = layers.LeakyReLU(0.2)
        
        def call(self, x):
            x = self.conv(x)
            x = self.norm(x)
            x = self.relu(x)
            return x
    with keras.utils.custom_object_scope({'ConvBlock': ConvBlock}):
        model = load_model(model_path)
    return model
