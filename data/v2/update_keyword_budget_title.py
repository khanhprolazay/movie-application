from multiprocessing import Process
from connection import *
from selectv import *
from get import *
from savev import *
import math


def main(movies: any, begin: int, end: int):
  current = 0
  conn = create_connection()
  length = len(movies)
  try:
    # for imdbIdDict in imdbIds:
    for i in range(begin, end):
      current += 1

      id = movies[i][0]
      imdbId = movies[i][1]
      # voteCount = movies[i][2]

      keywords = get_keywords(imdbId)

      for keyword in keywords:
        keywordId = select_keyword(conn, keyword)
        if keywordId is not None:
          save_movie_keyword(conn, id, keywordId)
      
      conn.commit()
      cprint(f'{i}/{length} INSERT {imdbId} SUCCESSFULLY')

  except Exception as error:
    print(error)
  finally:
    conn.close()


if __name__ == "__main__":
  workCount = 20000

  conn = create_connection()
  movies = select_movies(conn)
  length = len(movies)

  segmentLength = int(length / workCount)
  last = length % workCount

  conn.close()

  procs = []
  ceil = math.ceil(length / workCount)
  for i in range(0, ceil):
    begin = workCount * i
    end = workCount * (i + 1) if i < ceil - 1 else length
    proc = Process(target=main, args=(movies, begin, end))
    procs.append(proc)
    proc.start()

  for proc in procs:
    proc.join()