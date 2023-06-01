# cinnamonAI-Entrance-Test-NTC

Due to the large file size, the AI model is NOT included in this repo
You can download the AI Model here: https://drive.google.com/file/d/1LfH3zbsO6y9uCM_PquTVKOLhXooOWFBP/view?usp=sharing
After the model is downloaded, go to the /server directory of the repo, then move the file into the /server/model directory

## CLIENT SETUP GUIDE:

cd client
npm i --save --force

#Run the client locally

npm run dev

## SERVER SETUP GUIDE:

cd server

#Activate the virtual environment

#FOR LINUX USERS:

    python3 -m venv venv
    source venv/bin/activate

#FOR WINDOWS USERS:

    python -m venv venv
    ./venv/Scripts/activate

#Install dependencies:

pip install -r requirements.txt

#Run the server locally

uvicorn main:app --reload
