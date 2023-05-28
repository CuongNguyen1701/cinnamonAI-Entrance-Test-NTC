import React, {useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';

const AI = () => {
    useEffect(() => {
        const loadModel = async () => {
            const model = await tf.loadGraphModel('../../models/model1/model.json');
            const image = tf.browser.fromPixels(document.getElementById('input-image'));
            const processedImage = tf.image.resizeBilinear(image, [512, 512]).toFloat().div(255);
            const expandedImage = processedImage.expandDims(0);
            const predictions = await model.predict(expandedImage);
            console.log(predictions);
            image.dispose();
            processedImage.dispose();
            expandedImage.dispose();
          };
    
        loadModel();
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default AI
