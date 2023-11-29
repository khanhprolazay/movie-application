from multiprocessing import Process
from connection import *
from selectv import *
from get import *
from savev import *
import math
import time

def main(movies: any, begin: int, end: int):
  print(begin, end, flush=True)
  current = 0
  conn = create_connection()
  try:
    # for imdbIdDict in imdbIds:
    for i in range(begin, end):
      current += 1

      id = movies[i][0]
      imdbId = movies[i][1]
      # voteCount = movies[i][2]


      result = get_director_budget(imdbId)

      budgetResponse = result[0]
      directorResponse = result[1]

      budget = select_budget(conn, id)

      if budgetResponse.lifetimeGross is not None and budget.lifetimeGrossId is None:
        save_lifetime_gross(conn, id, budgetResponse.lifetimeGross)

      if budgetResponse.productionBudget is not None and budget.productionBudgetId is None:
        save_production_budget(conn, id, budgetResponse.productionBudget)

      if budgetResponse.openingWeekendGross is not None and budget.openingWeekendGrossId is None:
        save_opening_weekend_gross(conn, id, budgetResponse.openingWeekendGross)

      if budgetResponse.wordwideGross is not None and budget.worldwideGrossId is None:
        save_worldwide_gross(conn, id, budgetResponse.wordwideGross)

      save_directors(conn, id, directorResponse.directors)
      save_writers(conn, id, directorResponse.writers)

      conn.commit()
      cprint(f'{current}/{len(movies)} {imdbId} SUCCESSFULLY')

  except Exception as error:
    print(f'Error: {error}', flush=True)
  finally:
    conn.close()

def main_2():

  workCount = 2500

  conn = create_connection()
  # movies = select_null_budget_movies(conn)
  movies = [[109548, "tt27857392"]]
  length = len(movies)

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

if __name__ == "__main__":
  main_2()