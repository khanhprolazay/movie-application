import mysql.connector 
import mysql

def select_genre(connection: mysql.connector.MySQLConnection, genre: str):
  try:
    cursor = connection.cursor()
    query = "SELECT * FROM genre where name = %s"
    cursor.execute(query, (genre, ))
    row = cursor.fetchone()
    cursor.close()
    
    return row
  except:
    return None
  
def select_movie(connection: mysql.connector.MySQLConnection, imdbId: str):
  try:
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM movie WHERE imdbId = %s", (imdbId, ))
    row = cursor.fetchone()
    cursor.close()
    
    return row
  except:
    return None
  
def select_movies(connection: mysql.connector.MySQLConnection):
  try:
    cursor = connection.cursor()
    cursor.execute("SELECT id, imdbId, voteCount FROM movie", ())
    rows = cursor.fetchall()
    cursor.close()
    
    return rows
  except:
    return None
  
def select_null_votecount_movies(connection: mysql.connector.MySQLConnection):
  try:
    cursor = connection.cursor()
    cursor.execute("SELECT id, imdbId, voteCount FROM movie WHERE voteCount is null", ())
    rows = cursor.fetchall()
    cursor.close()
    
    return rows
  except:
    return None
  
def select_null_poster_movies(connection: mysql.connector.MySQLConnection):
  try:
    cursor = connection.cursor()
    cursor.execute("SELECT id, imdbId FROM movie WHERE posterPath is null", ())
    rows = cursor.fetchall()
    cursor.close()
    
    return rows
  except:
    return None
  
def select_null_release_movie(connection: mysql.connector.MySQLConnection):
  try:
    cursor = connection.cursor()
    cursor.execute("SELECT id, movie.imdbId FROM movie WHERE movie.release is null")
    rows = cursor.fetchall()
    cursor.close()
    
    return rows
  except:
    return None
  
def select_actor(connection: mysql.connector.MySQLConnection, imdbId: str):
  try:
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM actor WHERE imdbId = %s", (imdbId, ))
    row = cursor.fetchone()
    cursor.close()
    
    return row
  except:
    return None

def select_last_movie(connection: mysql.connector.MySQLConnection):
  cursor = connection.cursor()
  try:
    query = "SELECT imdbId FROM movie ORDER BY id DESC LIMIT 1"
    cursor.execute(query, ())
    row = cursor.fetchone()
    return row[0]
  except:
    return None
  finally:
    cursor.close()