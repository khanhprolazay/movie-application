from multiprocessing import Process
from connection import *
from selectv import *
from get import *
from savev import *
import math

def main(movies: any, begin: int, end: int):
  current = 0
  conn = create_connection()
  movieLenght = len(movies)
  try:
    # for imdbIdDict in imdbIds:
    for i in range(begin, end):
      current += 1

      id = movies[i][0]
      imdbId = movies[i][1]
      
      videos = get_videos(imdbId)
      for video in videos:
        save_video(conn, id, video)
      conn.commit()
      cprint(f"{i}/{movieLenght} Save {len(videos)} videos of {imdbId} successfully")

  except Exception as error:
    print(error)
  finally:
    conn.close()


if __name__ == "__main__":
  workCount = 2000

  conn = create_connection()
  movies = select_null_video_movie(conn)
  conn.close()

  length = len(movies)

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