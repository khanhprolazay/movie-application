FROM python:3.10-alpine

ADD apps/recommendation-service/* ./apps/recommendation-service/
ADD config ./config

RUN pip install pika python-dotenv pandas

CMD ["python", "./apps/recommendation-service/index.py"]