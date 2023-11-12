from save_data import *
from get_url import *
import pandas as pd
from time import time

max_attemp = 100
current_attemp = 0

dataframe = pd.DataFrame(columns=["imdb_id"])
beginYear = 1960
endYear = 1900

def main():
  global current_attemp
  global max_attemp
  global beginYear
  global dataframe

  if current_attemp > max_attemp:
    return
  
  current_attemp = current_attemp + 1

  try:    

    while beginYear >= endYear:
      print(f'\n- - - - - - - - - - - BEGIN INSERTING MOVIE IN YEAR {beginYear} - - - - - - - - - - -\n')
      t1 = time()
      for index in range(1, 1000):
        
        url = get_ids_url(beginYear, index)
        ids = get(url)

        if (ids is None):
          print(f'\n- - - - - - - - - - - INSERT MOVIES IN {beginYear} TAKES: {round(time() - t1, 2)} - - - - - - - - - - -\n')
          beginYear = beginYear - 1
          break

        for id in ids:
          tmp = { "imdb_id": id.get("imdb_id")}
          dataframe = dataframe.append(tmp, ignore_index=True)
        print(f'Insert year {beginYear} at page {index} successfully \n')
        

  except:
    print("Meet Error")
    main()

main()
dataframe.to_csv("ids.csv", index=False, header=True)