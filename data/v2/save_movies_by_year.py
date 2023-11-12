from get import *
from selectv import *
from savev import *
from connection import *
import json
import pandas as pd
import mysql.connector
import json

# years = [2027, 2026, 2025, 2024, 2023, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]
years = [2013, 2012, 2011, 2010]
pageLimit = 60
flag = False

def get_by_years():
  result = []
  for year in years:
    for i in range(30, pageLimit + 1):
      movies = get_movies_by_year(year, i)
      for movie in movies:
        result.append(movie.get("id"))
    
    with open(f'{year}_1.json', 'w', encoding='utf-8' ) as f:
      json.dump(result, f, ensure_ascii=False, indent=4)
    result = []

def save_by_years(conn: any, year: int):
  global flag

  f = open(f'{year}_1.json', "r")
  imdbIds = json.loads(f.read())
  imdbIds = list(set(imdbIds))
  
  total = len(imdbIds)
  last_movie = select_last_movie(conn)

  current = 0

  for imdbId in imdbIds:
    current += 1

    # if imdbId == last_movie:
    #   flag = True

    # if flag == False:
    #   continue

    movie = select_movie(conn, imdbId)

    if movie is not None:
      cprint(f'{year} {current}/{total}. MOVIE {imdbId.upper()} IS ALREADY IN DATABASE')
    else:
      data = get_movie(imdbId)
      if data is None:
        if type(imdbId) == str:
          cprint(f'{year} {current}/{total}. DONT HAVE INFORMATION ABOUT {imdbId.upper()}')
      else:
        movieId = save_movie(conn,  imdbId, data)
        if (movieId):
          cprint(f'{year} {current}/{total}. INSERT SUCCESSFULLY MOVIE {imdbId.upper()} {data.movie.name.upper()}')


current = 0

def main():
  global flag
  conn = create_connection()
  try:
    for i in range(0, len(years)):
      year = years[i]
      save_by_years(conn, year)
      # current += 1
  except Exception as error:
    print(error)
    flag = False
    main()

  conn.close()

main()