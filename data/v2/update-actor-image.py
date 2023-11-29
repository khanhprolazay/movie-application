from multiprocessing import Process
from connection import *
from selectv import *
from get import *
from savev import *
import math

def main(actors: any, begin: int, end: int):
  current = 0
  conn = create_connection()
  try:
    # for imdbIdDict in imdbIds:
    for i in range(begin, end):
      current += 1

      id = actors[i][0]
      imdbId = actors[i][1]
      # voteCount = movies[i][2]

      image = get_actor_image(imdbId)
      if image is not None:
        update_actor_image(conn, id, image)
        cprint(f'{current}. UPDATE IMAGE ACTOR {imdbId} SUCCESSFULLY')
      else:
        cprint(f'{current}. IMAGE ACTOR {imdbId} NOT FOUND')

  except Exception as error:
    print(error)
  finally:
    conn.close()


if __name__ == "__main__":
  workCount = 20000

  conn = create_connection()
  actors = select_actors(conn)
  conn.close()

  length = len(actors)

  procs = []
  ceil = math.ceil(length / workCount)
  for i in range(0, ceil):
    begin = workCount * i
    end = workCount * (i + 1) if i < ceil - 1 else length
    proc = Process(target=main, args=(actors, begin, end))
    procs.append(proc)
    proc.start()

  for proc in procs:
    proc.join()