from multiprocessing import Process
from connection import *
from selectv import *
from get import *
from savev import *


def main(movies: any, begin: int, end: int):
  current = 0
  conn = create_connection()
  try:
    # for imdbIdDict in imdbIds:
    for i in range(begin, end):
      current += 1

      id = movies[i][0]
      imdbId = movies[i][1]
      voteCount = movies[i][2]

      if voteCount is None:
        updateVoteCount = get_vote_count(imdbId)
        if updateVoteCount is None:
          print(f'MOVIE {imdbId} HAS NO DATA ABOUT VOTE COUNT')
        else:
          update_vote_count(conn, id, updateVoteCount)
          cprint(f'{current}. UPDATE VOTE COUNT {imdbId} SUCCESSFULLY')

  except Exception as error:
    print(error)
  finally:
    conn.close()


if __name__ == "__main__":
  workCount = 10000

  conn = create_connection()
  movies = select_movies(conn)
  length = len(movies)

  segmentLength = int(length / workCount)
  last = length % workCount

  conn.close()

  segments = []
  for i in range(0, segmentLength):
    segments.append(workCount * (i + 1))
  segments.append(last)

  procs = []
  for segment in segments:
    begin = segment - workCount if segment % workCount == 0 else len(segments) * workCount 
    # begin = 0
    end = segment if segment % workCount == 0 else begin + segment
    proc = Process(target=main, args=(movies, begin, end))
    procs.append(proc)
    proc.start()

  for proc in procs:
    proc.join()