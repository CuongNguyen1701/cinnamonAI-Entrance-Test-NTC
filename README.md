# cinnamonAI-Entrance-Test-NTC

You can try out the live demo here: https://cinnamon-ai-entrance-test-ntc.vercel.app/

# Introduction:

This is my project for the CinnamonBootcamp2023 Pre-entrance test.
In the time where there is an explosion in the number of image editing and image generation tools, sometimes we just cannot distinguish between real and edited images.
Therefore, I came up with a project which is a website application with AI-integrated backend that can help predict whether an image is real or edited/fake using Machine Learning.

# Technical Overview:

Let's take a look at the following diagram:
![Diagram](diagram.png)

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
#Remember to create ./model/variables and ./model/assets directories first!

gdown 1kJvvTlT9VAqP1drZniMdzbYuO00CmNac -O ./model/fingerprint.pb
gdown 1SWhkFJH_QYhicFn6TePhpCtCSz4w-jQ8 -O ./model/saved_model.pb
gdown 1U6lTdDUktU7AwkzpCoKVMBM-5aLsI30T -O ./model/variables/variables.data-00000-of-00001
gdown 18x6TPScu6LOBCW9dptpOOce7rH-jtp-Y -O ./model/variables/variables.index
#Run the server locally

uvicorn main:app --reload
