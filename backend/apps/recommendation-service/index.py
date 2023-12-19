import pickle
import pika
import json
import os
from dotenv import load_dotenv

load_dotenv("./config/env/production.env")

broker_host = os.getenv("BROKER_HOST")
broker_port = os.getenv("BROKER_PORT")
broker_vhost = os.getenv("BROKER_VHOST")
broker_username = os.getenv("BROKER_USERNAME")
broker_password = os.getenv("BROKER_PASSWORD")

titles = pickle.load(open('./apps/recommendation-service/titles.pkl','rb'))
indices = pickle.load(open('./apps/recommendation-service/indices.pkl','rb'))
cosine_sim = pickle.load(open('./apps/recommendation-service/cosine_sim.pkl','rb'))

def get_recommendations(imdb_id):
    try:
        idx = indices[imdb_id]
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:31]
        movie_indices = [i[0] for i in sim_scores]
        return titles.iloc[movie_indices].to_json(orient='records')
    except:
        return json.dumps([])

def callback(channel, method, properties, body):
    try:
        print(" [x] Received %r" % body)
        decode = body.decode('utf-8')
        body_decode = json.loads(decode)
        imdbId = body_decode.get('data')

        recommendation = get_recommendations(imdbId)
        print(recommendation)
        channel.basic_publish('', routing_key=properties.reply_to, body=recommendation, properties=pika.BasicProperties(correlation_id=properties.correlation_id))
    except:
        print(" [x] Error")
        channel.basic_publish('', routing_key=properties.reply_to, body=json.dumps([]), properties=pika.BasicProperties(correlation_id=properties.correlation_id))

credentials = pika.PlainCredentials(broker_username, broker_password)
parameters = pika.ConnectionParameters(broker_host, broker_port, broker_vhost, credentials)
connection = pika.BlockingConnection(parameters)

channel = connection.channel()
channel.queue_declare(queue='RECOMMENDATION')
channel.basic_consume(queue='RECOMMENDATION', on_message_callback=callback, auto_ack=True)
print(' [*] Waiting for messages. To exit press CTRL+C...')
channel.start_consuming()