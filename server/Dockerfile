
FROM python:3.9

WORKDIR /app

#Need this for custom modules
ENV PYTHONPATH /app/src

#Set up virtual environment
ENV VIRTUAL_ENV=/opt/venv

RUN python -m venv $VIRTUAL_ENV

ENV PATH="$VIRTUAL_ENV/bin:$PATH"

#Install dependencies
COPY ./src/requirements.txt /app/requirements.txt

RUN pip install --upgrade pip

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
#Copy source code
COPY ./src /app/src

#Download model
RUN gdown 1LfH3zbsO6y9uCM_PquTVKOLhXooOWFBP -O /app/src/models/model.h5

RUN cd /app

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "80"]