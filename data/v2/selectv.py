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
    cursor.execute("select id, imdbId from movie where id not in (select distinct movieId from movie_to_keyword)", ())
    rows = cursor.fetchall()
    cursor.close()
    
    return rows
  except:
    return None
  
def select_null_budget_movies(connection: mysql.connector.MySQLConnection):
  try:
    cursor = connection.cursor()
    cursor.execute("SELECT id, imdbId, voteCount from movie where id not in (SELECT DISTINCT movieId from director_to_movie)", ())
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
  
def select_actors(connection: mysql.connector.MySQLConnection):
  try:
    cursor = connection.cursor()
    cursor.execute('SELECT id, imdbId FROM actor where imageUrl is null', ())
    rows = cursor.fetchall()
    cursor.close()
    
    return rows
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

def select_currency(connection: mysql.connector.MySQLConnection, code: str):
  cursor = connection.cursor()
  try:
    query = "SELECT id FROM currency WHERE code = %s"
    cursor.execute(query, (code, ))
    row = cursor.fetchone()
    
    if row is not None:
      return row[0]
    else:
      cursor.execute("INSERT INTO currency (code) VALUES (%s)", (code, ))
      connection.commit()
      return cursor.lastrowid
  except Exception as e:
    print(e, flush=True)
    return None
  finally:
    cursor.close()

def select_keyword(connection: mysql.connector.MySQLConnection, name: str):
  cursor = connection.cursor()
  try:
    query = "SELECT id FROM keyword WHERE name = %s"
    cursor.execute(query, (name, ))
    row = cursor.fetchone()
    
    if row is not None:
      return row[0]
    else:
      cursor.execute("INSERT INTO keyword (name) VALUES (%s)", (name, ))
      return cursor.lastrowid
  except Exception as e:
    print(f'Error when inserting keywork: {e}', flush=True)
    return None
  finally:
    cursor.close()

class BudgetResult:
  def __init__(self, productionBudgetId, lifetimeGrossId, openingWeekendGrossId, worldwideGrossId):
    self.productionBudgetId = productionBudgetId
    self.lifetimeGrossId = lifetimeGrossId
    self.openingWeekendGrossId = openingWeekendGrossId
    self.worldwideGrossId = worldwideGrossId    

def select_budget(connection: mysql.connector.MySQLConnection, movieId: int):
  cursor = connection.cursor()
  try:
    query = "SELECT productionBudgetId,lifetimeGrossId, openingWeekendGrossId, worldwideGrossId FROM movie WHERE id = %s"
    cursor.execute(query, (movieId,))
    row = cursor.fetchone()
    
    return BudgetResult(row[0], row[1], row[2], row[3])
  except Exception as e:
    return None
  finally:
    cursor.close()

def select_null_video_movie(connection: mysql.connector.MySQLConnection):
  try:
    cursor = connection.cursor()
    cursor.execute("SELECT id, imdbId FROM movie WHERE id not in (SELECT DISTINCT movieId FROM video)", ())
    rows = cursor.fetchall()
    cursor.close()
    
    return rows
  except:
    return None


    