from mysql.connector.cursor import MySQLCursor
from datetime import datetime
import mysql.connector
from time import time

def create_connection():
  return mysql.connector.connect(
    host="localhost",
    port=23306,
    user="root",
    password="root",
    database="movieservice",
  )

def format_date(date: str):
  try: 
    return datetime.strptime(date, '%Y-%m-%d')
  except:
    return None

def insert_movie(data, index: int, cursor: MySQLCursor):
  imdb_id = data["imdb_id"]

  print(f'\n- - - - - - - - - - - {index} {data["imdb_id"].upper()} {data["title"].upper()} - - - - - - - - - - -\n')

  query = ("INSERT INTO movie " 
            "(`imdbId`, `title`, `description`, `movieLength`, `rating`, `trailer`, `imageUrl`, `release`, `plot`, `banner`) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")

  release = format_date(data["release"])
  values = (imdb_id, data["title"], data["description"], data["movie_length"], data["rating"], data["trailer"], data["image_url"], release, data["plot"], data["banner"])
  cursor.execute(query, values)

  movie_id = cursor.lastrowid
  #  Insert to relation table between movie and genre
  genres = data["gen"]
  for genre in genres:
    select_query = "SELECT id FROM genre WHERE name = %s"
    cursor.execute(select_query, (genre["genre"], ))
    genre_select = cursor.fetchone()
    genre_id = genre_select[0]
    cursor.execute("INSERT INTO movie_genres_genre(movieId, genreId) VALUES (%s, %s)", (movie_id, genre_id))

  return movie_id
  

def insert_bio(content: str, cursor: MySQLCursor):
  if content is None:
    return None
  
  cursor.execute("INSERT INTO bio (`content`) VALUES (%s)", (content, ))
  return cursor.lastrowid

def insert_actor(data, bio_id: int, cursor: MySQLCursor):
  query = ("INSERT INTO actor "
          "(`imdbId`, `name`, `imageUrl`, `birthDay`, `birthPlace`, `partialBio`, `height`,`bioId`) "
          "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")
  values = (data["imdb_id"], data["name"], data["image_url"], format_date(data["birth_date"]), data["birth_place"], data["partial_bio"],  data["height"], bio_id)
  cursor.execute(query, values)
  return cursor.lastrowid

def insert_trademarks(trademarks: list, actor_id: int, cursor: MySQLCursor):
  if trademarks is not None:
    query = "INSERT INTO trademark (`content`, `actorId`) VALUES (%s, %s)"
    values = [(trademark, actor_id) for trademark in trademarks]
    cursor.executemany(query, values)

def insert_trivias(trivias: list, actor_id: int, cursor: MySQLCursor):
  if trivias is not None:
    query = "INSERT INTO trivia (`content`, `actorId`) VALUES (%s, %s)"
    values = [(trivia, actor_id) for trivia in trivias]
    cursor.executemany(query, values)

def insert_quotes(quotes: list, actor_id: int, cursor: MySQLCursor):
  if quotes is not None:
    query = "INSERT INTO quote (`content`, `actorId`) VALUES (%s, %s)"
    values = [(quote, actor_id) for quote in quotes]
    cursor.executemany(query, values)
      
def insert_actor_movie(movie_id: int, actor_id: int, role, cursor: MySQLCursor):
  if movie_id is not None and actor_id is not None:
    query = "INSERT INTO actor_to_movie (`movieId`, `actorId`, `role`) VALUES (%s, %s, %s)"
    values = (movie_id, actor_id, role)
    cursor.execute(query, values) 