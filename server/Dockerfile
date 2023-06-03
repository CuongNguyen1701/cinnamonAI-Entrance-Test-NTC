
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
RUN gdown 1kJvvTlT9VAqP1drZniMdzbYuO00CmNac -O /app/src/model/fingerprint.pb
RUN gdown 1SWhkFJH_QYhicFn6TePhpCtCSz4w-jQ8 -O /app/src/model/saved_model.pb
RUN gdown 1U6lTdDUktU7AwkzpCoKVMBM-5aLsI30T -O /app/src/model/variables/variables.data-00000-of-00001
RUN gdown 18x6TPScu6LOBCW9dptpOOce7rH-jtp-Y -O /app/src/model/variables/variables.index
RUN mkdir /app/src/model/assets

RUN cd /app

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "80"]