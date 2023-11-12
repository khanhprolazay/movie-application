from save_data import *

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
    movies = select_movie_image(connection)
    
    current = 0
    for movie in movies:
      movieId = movie[0]
      movieImdbId = movie[1]
      movieBanner = movie[2]
    
      exist = check_image_exist(movieBanner)
      if exist == False:
        print(f'\n- - - - - - - - - -{current}. {movieImdbId.upper()} MOVIE IMAGE NOT FOUND - - - - - - - - - -')
        delete_movie(movieImdbId, movieId, connection)
      else:
        print(f'\n- - - - - - - - - - {current}. {movieImdbId.upper()} MOVIE HAS IMAGE - - - - - - - - - -')

      current = current + 1
    
    # for ()

    # delete_movie("tt10028196", 9660, connection)

  except mysql.connector.Error as error:
    print(f'{error}')
    connection.close()
    main()
  # exist = check_image_exist("https://m.media-amazon.com/images/M/MV5BNTM5MGFkNjEtZmJkMi00ZDE4LWE2NTctNDc3MjQzYTUxNzc5XkEyXkFqcGdeQXVyMTA5NzIyMDY5._V1_.jpg")
  # if exist == False:
    

main()
