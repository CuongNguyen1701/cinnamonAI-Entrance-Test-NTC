# cinnamonAI-Entrance-Test-NTC
You can try out the live demo here: https://cinnamon-ai-entrance-test-ntc.vercel.app/

## CLIENT SETUP GUIDE:

cd client
npm i --save --force

#Run the client locally

npm run dev

## SERVER SETUP GUIDE:

cd server
cd src

#Activate the virtual environment

#FOR LINUX USERS:

    python3 -m venv venv
    source venv/bin/activate

#FOR WINDOWS USERS:

    python -m venv venv
    ./venv/Scripts/activate

#Install dependencies:

pip install -r requirements.txt

#Install the AI model

gdown 1LfH3zbsO6y9uCM_PquTVKOLhXooOWFBP -O ./models/model.h5

#Run the server locally

uvicorn main:app --reload
