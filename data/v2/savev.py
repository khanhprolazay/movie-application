from get import *
from entity import *
from selectv import *

def cprint(content: str):
  print(f'\n- - - - - - - - - - - {content.upper()} - - - - - - - - - - -\n', flush=True)

def save_genres(connection: mysql.connector.MySQLConnection):
  genres = get("/titles/utils/genres")
  cursor = connection.cursor()

  try:
    for genre in genres:
      if genre:
        row = select_genre(connection, genre)
        if row is None:
          query = "INSERT INTO genre (name) VALUES (%s)"
          cursor.execute(query, (genre, ))
    connection.commit()

  except mysql.connector.Error as err:
    print(f"Error: {err}", flush=True)

  finally:
    cursor.close()

def save_movie(connection: mysql.connector.MySQLConnection, imdbId: str, data: GetMovieResult):
  cursor = connection.cursor()

  movie = data.movie
  desc = data.desc
  casts = data.casts
  trailers = data.trailers  

  try:
    # Save movie
    query = ("INSERT INTO movie " 
            "(`imdbId`, `title`, `description`, `movieLength`, `rating`, `imageUrl`, `release`, `plot`, `voteCount`)"
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)")
    values = (imdbId, movie.name, desc, movie.movieLength, movie.rating, movie.imageUrl, movie.releaseDate, movie.plot, movie.voteCount)
    cursor.execute(query, values)

    # Save genres
    
    movieId = cursor.lastrowid
    for genre in movie.genres:
        select_query = "SELECT id FROM genre WHERE name = %s"
        cursor.execute(select_query, (genre, ))
        genre_select = cursor.fetchone()
        genre_id = genre_select[0]
        cursor.execute("INSERT INTO movie_to_genre(movieId, genreId) VALUES (%s, %s)", (movieId, genre_id))

    # Save trailers
    query = ("INSERT INTO trailer"
             "(`movieId`, `imdbId`, `type`)"
             "VALUES (%s, %s, %s)"
            )
    for trailer in trailers:
      values = (movieId, trailer.imdbId, trailer.type)
      cursor.execute(query, values)

    # Save casts
    castQuery = ("INSERT INTO actor"
             "(`imdbId`, `name`, `imageUrl`)"
             "VALUES (%s, %s, %s)"
            )
    
    relationQuery = ("INSERT INTO cast_to_movie"
             "(`actorId`, `movieId`, `role`)"
             "VALUES (%s, %s, %s)"
            )
    
    for cast in casts:
      actor = select_actor(connection, cast.imdbId)

      if actor:
        print(f'\nACTOR {cast.imdbId.upper()} {cast.name.upper()} ALREADY IN DATABASE', flush=True)
        cursor.execute(relationQuery, (actor[0], movieId, cast.role))
      else:
        cursor.execute(castQuery, (cast.imdbId, cast.name, cast.imageUrl))
        cursor.execute(relationQuery, (cursor.lastrowid, movieId, cast.role))
        print(f'\nINSERT ACTOR {cast.imdbId.upper()} {cast.name.upper()} SUCCESSFULLY', flush=True)

    connection.commit()
    return movieId
  
  except Exception as error:
    print(error, flush=True)
    return None
  finally:
    cursor.close()

def update_release_date(connection: mysql.connector.MySQLConnection, movieId: int, date: datetime.date):
  cursor = connection.cursor()
  try:
    cursor.execute("UPDATE movie SET movie.release = %s WHERE id = %s", (date, movieId, ))
    connection.commit()
  except Exception as error:
    print(error, flush= True)
  finally:
    cursor.close()

def update_vote_count(connection: mysql.connector.MySQLConnection, movieId: int, voteCount: int):
  cursor = connection.cursor()
  try:
    cursor.execute("UPDATE movie SET movie.voteCount = %s WHERE id = %s", (voteCount, movieId, ))
    connection.commit()
  except Exception as error:
    print(error,flush=True)
  finally:
    cursor.close()

def update_tagline_image(connection, movieId, data):
  cursor = connection.cursor()
  try:
    cursor.execute("UPDATE movie SET movie.tagline = %s, movie.posterPath = %s, movie.backdropPath = %s WHERE id = %s", (data.tagline, data.posterPath, data.backdropPath, movieId, ))
    connection.commit()
  except Exception as error:
    print(error,flush=True)
  finally:
    cursor.close()

def save_directors(connection: mysql.connector.MySQLConnection, movieId: int, directos: list[Cast]):
  cursor = connection.cursor()
  try:
    for director in directos:
      actor = select_actor(connection, director.imdbId)
      if actor:
        print(f'\nDIRECTOR {director.imdbId.upper()} {director.name.upper()} ALREADY IN DATABASE', flush=True)
        cursor.execute("INSERT INTO director_to_movie(actorId, movieId) VALUES (%s, %s)", (actor[0], movieId))
      else:
        cursor.execute("INSERT INTO actor(imdbId, name) VALUES (%s, %s)", (director.imdbId, director.name))
        cursor.execute("INSERT INTO director_to_movie(actorId, movieId) VALUES (%s, %s)", (cursor.lastrowid, movieId))
        print(f'\nINSERT DIRECTOR {director.imdbId.upper()} {director.name.upper()} SUCCESSFULLY', flush=True)
  except Exception as error:
    print(error, flush=True)
  finally:
    cursor.close()

def save_writers(connection: mysql.connector.MySQLConnection, movieId: int, writers: list[Cast]):
  cursor = connection.cursor()
  try:
    for writer in writers:
      actor = select_actor(connection, writer.imdbId)
      if actor:
        print(f'\nWRITER {writer.imdbId.upper()} {writer.name.upper()} ALREADY IN DATABASE', flush=True)
        cursor.execute("INSERT INTO writer_to_movie(actorId, movieId) VALUES (%s, %s)", (actor[0], movieId))
      else:
        cursor.execute("INSERT INTO actor(imdbId, name) VALUES (%s, %s)", (writer.imdbId, writer.name))
        cursor.execute("INSERT INTO writer_to_movie(actorId, movieId) VALUES (%s, %s)", (cursor.lastrowid, movieId))
        print(f'\nINSERT WRITER {writer.imdbId.upper()} {writer.name.upper()} SUCCESSFULLY', flush=True)
  except Exception as error:
    print(error, flush=True)
  finally:
    cursor.close()

def save_production_budget(connection: mysql.connector.MySQLConnection, movieId: int, budget: Budget):
  cursor = connection.cursor()
  try:
    currencyId = select_currency(connection, budget.currency)
    cursor.execute("INSERT INTO budget(amount, currencyId) VALUES (%s, %s)", (budget.amount, currencyId))
    cursor.execute("UPDATE movie SET productionBudgetId = %s WHERE id = %s", (cursor.lastrowid, movieId))
  except Exception as error:
    print(f'Error at budget: {error}', flush=True)
  finally:
    cursor.close()

def save_lifetime_gross(connection: mysql.connector.MySQLConnection, movieId: int, gross: Budget):
  cursor = connection.cursor()
  try:
    currencyId = select_currency(connection, gross.currency)
    cursor.execute("INSERT INTO budget(amount, currencyId) VALUES (%s, %s)", (gross.amount, currencyId))
    cursor.execute("UPDATE movie SET lifetimeGrossId = %s WHERE id = %s", (cursor.lastrowid, movieId))
  except Exception as error:
    print(f'Error at lifetime: {error}', flush=True)
  finally:
    cursor.close()

def save_opening_weekend_gross(connection: mysql.connector.MySQLConnection, movieId: int, gross: OpeningWeekendGross):
  cursor = connection.cursor()
  try:
    currencyId = select_currency(connection, gross.currency)
    cursor.execute("INSERT INTO budget(amount, currencyId) VALUES (%s, %s)", (gross.amount, currencyId))
    cursor.execute("INSERT INTO opening_weekend_gross(weekendEndDate, budgetId) VALUES(%s, %s)", (gross.weekendEndDate, cursor.lastrowid))
    cursor.execute("UPDATE movie SET openingWeekendGrossId = %s WHERE id = %s", (cursor.lastrowid, movieId))
  except Exception as error:
    print(f'Error at weekend: {error}', flush=True)
  finally:
    cursor.close()

def save_worldwide_gross(connection: mysql.connector.MySQLConnection, movieId: int, gross: Budget):
  cursor = connection.cursor()
  try:
    currencyId = select_currency(connection, gross.currency)
    cursor.execute("INSERT INTO budget(amount, currencyId) VALUES (%s, %s)", (gross.amount, currencyId))
    cursor.execute("UPDATE movie SET worldwideGrossId = %s WHERE id = %s", (cursor.lastrowid, movieId))
  except Exception as error:
    print(f'Error at worldwide: {error}', flush=True)
  finally:
    cursor.close()

def update_actor_image(connection: mysql.connector.MySQLConnection, actorId: int, imageUrl: str):
  cursor = connection.cursor()
  try:
    cursor.execute("UPDATE actor SET imageUrl = %s WHERE id = %s", (imageUrl, actorId, ))
    connection.commit()
  except Exception as error:
    print(error, flush=True)
  finally:
    cursor.close()

def save_movie_keyword(connection: mysql.connector.MySQLConnection, movieId: int, keywordId: int):
  cursor = connection.cursor()
  try:
    cursor.execute("INSERT INTO movie_to_keyword(movieId, keywordId) VALUES (%s, %s)", (movieId, keywordId))
  except Exception as error:
    print(f'Error when inserting movie keyword relation: {error}', flush=True)
  finally:
    cursor.close()

def update_movie_title(connection: mysql.connector.MySQLConnection, movieId: int, title: str):
  cursor = connection.cursor()
  try:
    cursor.execute("UPDATE movie SET title = %s WHERE id = %s", (title, movieId, ))
  except Exception as error:
    print(error, flush=True)
  finally:
    cursor.close()