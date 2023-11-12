from selectv import *
from savev import *
from get import *
from connection import *
import json
import pandas as pd
import mysql.connector



file = pd.read_csv('./movies_clean.csv', usecols=["id"])
current = 0
attemp = 0
limit = 100
flag = False

ids = ["tt19175696"]

conn = create_connection()
def main():
  global current
  global attemp
  global limit
  global flag

  if attemp > limit:
    return
  
  attemp += 1

  # f = open("imdbIds.json", "r")
  # imdbIds = json.loads(f.read())
  # save_genres(conn)

  last_movie = select_last_movie(conn)

  try:
    # for imdbIdDict in imdbIds:
    # for i, j in file.iterrows():
    for id in ids:
      current += 1
      # imdbId = j["id"]
      imdbId = id

      # if imdbId == last_movie:
      #   flag = True

      # if flag == False:
      #   continue

      # imdbId = imdbIdDict.get("imdbId")
      movie = select_movie(conn, imdbId)

      if movie is not None:
        cprint(f'{current}. MOVIE {imdbId.upper()} IS ALREADY IN DATABASE')
      else:
        data = get_movie(imdbId)
        if data is None:
          if type(imdbId) == str:
            cprint(f'{current}. DONT HAVE INFORMATION ABOUT {imdbId.upper()}')
        else:
          movieId = save_movie(conn,  imdbId, data)
          if (movieId):
            cprint(f'{current}. INSERT SUCCESSFULLY MOVIE {imdbId.upper()} {data.movie.name.upper()}')

  except Exception as error:
    print(error)
    current = 0
    main()

main()
conn.close()


