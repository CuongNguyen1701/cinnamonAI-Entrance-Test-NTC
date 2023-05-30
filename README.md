# cinnamonAI-Entrance-Test-NTC

## CLIENT SETUP GUIDE:

cd client
npm i --save --force

# Run the client locally

npm run dev

## SERVER SETUP GUIDE:

cd server

# Activate the virtual environment

# FOR LINUX USERS:

    python3 -m venv venv
    source venv/bin/activate

# FOR WINDOWS USERS:

    python -m venv venv
    ./venv/Scripts/activate

# Install dependencies:

pip install -r requirements.txt

# Run the server locally

uvicorn main:app --reload
