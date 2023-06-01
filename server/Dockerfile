# 
FROM python:3.9

# 
WORKDIR /app

# 
COPY src/ /app

# 
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

RUN gdown 1LfH3zbsO6y9uCM_PquTVKOLhXooOWFBP -O /app/models/model.h5
# 
EXPOSE 80

# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]