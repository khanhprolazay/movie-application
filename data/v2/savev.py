from get import *
from entity import *
from selectv import *

def cprint(content: str):
  print(f'\n- - - - - - - - - - - {content.upper()} - - - - - - - - - - -\n')

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
    print(f"Error: {err}")

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
        cursor.execute("INSERT INTO movie_genres_genre(movieId, genreId) VALUES (%s, %s)", (movieId, genre_id))

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
    
    relationQuery = ("INSERT INTO actor_to_movie"
             "(`actorId`, `movieId`, `role`)"
             "VALUES (%s, %s, %s)"
            )
    
    for cast in casts:
      actor = select_actor(connection, cast.imdbId)

      if actor:
        print(f'\nACTOR {cast.imdbId.upper()} {cast.name.upper()} ALREADY IN DATABASE')
        cursor.execute(relationQuery, (actor[0], movieId, cast.role))
      else:
        cursor.execute(castQuery, (cast.imdbId, cast.name, cast.imageUrl))
        cursor.execute(relationQuery, (cursor.lastrowid, movieId, cast.role))
        print(f'\nINSERT ACTOR {cast.imdbId.upper()} {cast.name.upper()} SUCCESSFULLY')

    connection.commit()
    return movieId
  
  except Exception as error:
    print(error)
    return None
  finally:
    cursor.close()

def update_release_date(connection: mysql.connector.MySQLConnection, movieId: int, date: datetime.date):
  cursor = connection.cursor()
  try:
    cursor.execute("UPDATE movie SET movie.release = %s WHERE id = %s", (date, movieId, ))
    connection.commit()
  except Exception as error:
    print(error)
  finally:
    cursor.close()

def update_vote_count(connection: mysql.connector.MySQLConnection, movieId: int, voteCount: int):
  cursor = connection.cursor()
  try:
    cursor.execute("UPDATE movie SET movie.voteCount = %s WHERE id = %s", (voteCount, movieId, ))
    connection.commit()
  except Exception as error:
    print(error)
  finally:
    cursor.close()

def update_tagline_image(connection, movieId, data):
  cursor = connection.cursor()
  try:
    cursor.execute("UPDATE movie SET movie.tagline = %s, movie.posterPath = %s, movie.backdropPath = %s WHERE id = %s", (data.tagline, data.posterPath, data.backdropPath, movieId, ))
    connection.commit()
  except Exception as error:
    print(error)
  finally:
    cursor.close()