from selectv import *
from get import *
from savev import *
from connection import *

conn = create_connection()

try:
  data = select_null_release_movie(conn)

  for row in data:
    id = row[0]
    imdbId = row[1]

    date = get_movie_release(imdbId)
    print(date)
  
    if date:
      update_release_date(conn, id, date)
      cprint(f'UPDATE MOVIE {imdbId.upper()} SUCCESSFULLY')
    else:
      cprint(f'MOVIE {imdbId.upper()} DONT HAVE RELEASE DAY')
except Exception as error:
  print(error)

conn.close()
# print(get_movie_release("tt0053559"))
