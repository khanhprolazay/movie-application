from save_data import *
import threading
from time import time
import pandas as pd


# save_genre()
file = pd.read_csv('./movies_metadata.csv', usecols=["imdb_id"])


max_attemp = 100
current_attemp = 0
def main():
  global current_attemp
  global max_attemp

  if current_attemp > max_attemp:
    return
  
  current_attemp = current_attemp + 1

  try:
    connection = create_connection()
    last_movie = select_last_movie(connection)
    
    # flag = False
    # index = 0

    # if last_movie is not None:
    #   for i, j in file.iterrows():
    #     imdbId = j["imdb_id"]
    #     index = index + 1

    #     if type(imdbId) == float:
    #       continue

    #     if imdbId == last_movie:
    #       flag = True
    #       continue

    #     if (flag == False):
    #       print(f'\n- - - - - - - - - - - {index} MOVIE {imdbId.upper()} ALREADY IN DATABASE - - - - - - - - - - -\n')
    #       continue

    #     save(imdbId, index, connection)
    # else:
    #   save_genre()
    #   for i, j in file.iterrows():
    #     imdbId = j["imdb_id"]
    #     index = index + 1
    #     save(imdbId, index, connection)

    save("tt3203290", 6223, connection)

  except mysql.connector.Error as error:
    print(f'{error}')
    connection.close()
    main()
  

main()
