
FROM python:3.9

WORKDIR /app

ENV VIRTUAL_ENV=/opt/venv

RUN python -m venv $VIRTUAL_ENV

ENV PYTHONPATH /app/src

ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY ./src/requirements.txt /app/requirements.txt

RUN pip install --upgrade pip

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./src /app/src

RUN gdown 1LfH3zbsO6y9uCM_PquTVKOLhXooOWFBP -O /app/src/models/model.h5

RUN cd /app

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "80"]