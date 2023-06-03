
FROM python:3.9

WORKDIR /app

COPY ./src/requirements.txt /app/requirements.txt

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY ./src /app/src

ENV FRONT_END_URL https://cinnamon-ai-entrance-test-ntc.vercel.app

RUN gdown 1LfH3zbsO6y9uCM_PquTVKOLhXooOWFBP -O /app/src/models/model.h5

RUN python -m venv venv

RUN ./venv/Scripts/activate

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "80"]