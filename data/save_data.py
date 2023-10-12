import json
from get_url import *
import mysql.connector
import http.client
from datetime import datetime
import concurrent.futures
from insert import *
from time import time
import threading

keys = [
  '47cb7c8176mshc0ef462857ad683p1836c2jsn4d628e63f4f4', # khanhprolazay
  '994edc1814msh9720baaa2f51ef0p15ce82jsn57e05e9a5fad', # nguyendinhbao
  '9bdb4402bcmsh940628c68eb7799p11602djsna08a4d8dee15', # 20133067
  '29c851c75dmshbc26ec28a5af74cp1216dcjsn1026508195e1', # ledung
  '14b7cf1779msh3b2048dec54efbcp1c966fjsn3895527f2b65', # lythong
  '06a001c5b7msh48e62e94bf53e9cp10dd06jsndd62a7fe91fa', # kamisama
  '9827d3e07amsh6bd55352b2d9b67p18c90ajsne2d47f2d279f', # minhledang
  'af0bb035c1msh915ebf290c10b5fp1fd3cfjsna02984f8b7e7', # lu2002ny
  '2085cd7a7cmsha447e9ec238a2f3p174302jsnffceafecc14c', # 20133098
  '7b8dad13fdmshd855d1ddf886bdbp1c867cjsncadd382b728d', # lu2002nu
  'dfaf441a68msh7d9c27079dadc13p1b721djsn2626dcd87b0f', # totnvt02
  '347081a356msh8f319f1e55941c3p17237djsnd80d3651baff', # thuvan
]


def save(movie_imdb_id: str, index: int, connection: mysql.connector.MySQLConnection):
  movie_id = save_movie_information(movie_imdb_id, index, connection)
  if movie_id is not None:
    save_actor_information(movie_imdb_id, movie_id, connection)

def select_last_movie(connection: mysql.connector.MySQLConnection):
  try:
    cursor = connection.cursor()
    query = "SELECT imdbId FROM movie ORDER BY id DESC LIMIT 1";
    cursor.execute(query, ())
    row = cursor.fetchone()
    return row[0]
  except:
    return None

current_key = 0
nums_key = len(keys)
attemp = 0
def get(url):
  global attemp
  global current_key
  global nums_key  

  attemp = attemp + 1

  if attemp == nums_key + 1:
    print("- - - - - - - - - - - ALL PROVIDED KEY HAS REACH LIMITATION - - - - - - - - - - - ")
    attemp = 0
    raise Exception("ALL PROVIDED KEY HAS REACH LIMITATION")

  headers = {
    'X-RapidAPI-Key': keys[current_key],
    'X-RapidAPI-Host': "moviesminidatabase.p.rapidapi.com"
}

  conn = http.client.HTTPSConnection("moviesminidatabase.p.rapidapi.com")
  conn.request("GET", url, headers=headers)
  res = conn.getresponse()

  data = res.read()
  result = json.loads(data.decode("utf-8"))
  conn.close()

  # Check if the key has reach limit
  message = result.get("message");
  if message is not None:
    print(message)
    print(f'\n- - - - - - - {keys[current_key]} HAS REACH LIMITATION. CHANGING KEY ... - - - - - - -\n')

    # Change api key
    if (current_key == nums_key - 1):
      current_key = 0
    else:
      current_key = current_key + 1

    # Try one more
    return get(url)
  
  attemp = 0
  return result.get("results")

def save_genre():
  genres = get("/genres/")
  connection = create_connection()
  cursor = connection.cursor()

  try:
    for genre in genres:
      insert_query = "INSERT INTO genre (name) VALUES (%s)"
      data = (genre["genre"], )
      cursor.execute(insert_query, data)
    connection.commit()

  except mysql.connector.Error as err:
    print(f"Error: {err}")

  finally:
    cursor.close()
    connection.close()

def save_movie_information(movie_imdb_id: str, index: int, connection: mysql.connector.MySQLConnection):
  cursor = connection.cursor()
  cursor.execute("SELECT * FROM movie WHERE imdbId = %s", (movie_imdb_id, ))
  row = cursor.fetchone()

  if row is not None:
    print(f'\n- - - - - - - - - - - {index} MOVIE {movie_imdb_id.upper()} ALREADY IN DATABASE - - - - - - - - - - -\n')
    cursor.close()
    return None

  try:
    url = get_movie_information_url(movie_imdb_id)
    data = get(url);

    if data is not None:
      movie_id = insert_movie(data, index, cursor)
      connection.commit()
      cursor.close()
      return movie_id
    
    return None

  except mysql.connector.Error as err:
    print(f"Error: {err}")
    cursor.close()
    return None
  
  except TypeError as err:
    if type(movie_imdb_id) == str:
      print(f'\n- - - - - - - - - - - {index} DONT HAVE INFORMATION ABOUT MOVIE {movie_imdb_id.upper()} - - - - - - - - - - -\n')
    
    if type(movie_imdb_id) == float:
      print(f'\n- - - - - - - - - - - {index} DONT HAVE INFORMATION ABOUT MOVIE {movie_imdb_id.upper()} - - - - - - - - - - -\n')
    cursor.close()
    return None

  finally:
    # Close the cursor
    cursor.close()
  
def save_actor_information(movie_imdb_id: str, movie_id: int, connection: mysql.connector.MySQLConnection): 
  actors = get(get_movie_cast_url(movie_imdb_id))

  # [{'role': 'Director', 'actor': {'imdb_id': 'nm0005124', 'name': 'John Lasseter'}}, ...]
  cursor = connection.cursor()
  t1 = time()
  try: 
    roles = actors["roles"]
    
    for role in roles:
      role_name = role["role"]
      actor_imdb_id = role["actor"]["imdb_id"]

      # Check if the actor exist in the database
      cursor.execute("SELECT id FROM actor where imdbId = %s", (actor_imdb_id, ))
      actor = cursor.fetchone()   
  
      # If actor is already in database, only insert a realation
      # Else, get actor information, insert it and and relation
      if actor is not None:
        actor_id = actor[0]
        print(f'Actor {actor_imdb_id} is already in database')
        insert_actor_movie(movie_id, actor_id, role_name, cursor)
        connection.commit()
      else:
        t2 = time()

        inf_url = get_actor_information_url(actor_imdb_id)
        bio_url = get_actor_bio_url(actor_imdb_id)
        urls = [inf_url, bio_url]

        with concurrent.futures.ThreadPoolExecutor() as executor:
          results = executor.map(get, urls)
          
        infor = next(results)
        bio = next(results)

        biography = None
        try:
          biography = bio.get("biography")
        except:
          print(f'Actor {actor_imdb_id} has no biography')

        imageUrl = infor.get("image_url")
        if biography is not None:
          #Insert bio
          bio_id = insert_bio(biography.get("bio"), cursor)

          #Insert actor
          actor_id = insert_actor(infor, bio_id, cursor)
          insert_actor_movie(movie_id, actor_id, role_name, cursor)

          if imageUrl is not None:
            trademarks = biography.get("trademarks")
            trivias = biography.get("trivia")
            quotes = biography.get("quotes")

            insert_trademarks(trademarks, actor_id, cursor)
            insert_trivias(trivias, actor_id, cursor)
            insert_quotes(quotes, actor_id, cursor)
          else:
            print(f'Actor {actor_imdb_id} has no image url')

          print(f'Insert actor: {actor_imdb_id} {infor.get("name")} takes: {round(time() - t2, 2)}s')
          connection.commit()  

        else:
          #Insert actor
          actor_id = insert_actor(infor, None, cursor)
          insert_actor_movie(movie_id, actor_id, role_name, cursor)
          connection.commit()
          print(f'Actor {actor_imdb_id} has no biography')
        
  except mysql.connector.Error as err:
    print(f"Error: {err}")    
    connection.close()

  except TypeError as err:
    # print(f"Error: {err}")
    print(f'\n- - - - - - - - - - - DONT HAVE INFORMATION ABOUT ROLE FOR MOVIE {movie_imdb_id.upper()} TYPE ERROR - - - - - - - - - - -\n')
    cursor.close()
  
  except AttributeError:
    print(f'\n- - - - - - - - - - - DONT HAVE INFORMATION ABOUT ROLE FOR MOVIE {movie_imdb_id.upper()} ATTRIBUTE ERROR - - - - - - - - - - -\n')
    cursor.close()

  finally:
    print(f'\n- - - - - - - - - - - INSERT MOVIE {movie_imdb_id.upper()} TAKES {round(time()-t1, 2)}s - - - - - - - - - - -\n')
    cursor.close()


  cursor.close()

def delete_actor_has_no_image():
  connection = create_connection()
  cursor = connection.cursor()

  try:
    cursor.execute("SELECT id from actor where imageUrl is null")
    rows = cursor.fetchall()

    for row in rows:
      actor_id = row[0]

      cursor.execute("SELECT * FROM actor_to_movie where actorId = %s", (actor_id, ))
      relation_ids = cursor.fetchall()

      if relation_ids is not None:
        for relation_id in relation_ids:
          print(relation_id[0])
          cursor.execute("DELETE FROM actor_to_movie WHERE id = %s", (relation_id[0], ))
          connection.commit()

      cursor.execute("DELETE FROM trivia WHERE actorId = %s", (actor_id, ))
      cursor.execute("DELETE FROM quote WHERE actorId = %s", (actor_id, ))
      cursor.execute("DELETE FROM trademark WHERE actorId = %s", (actor_id, ))
      
      cursor.execute("DELETE FROM actor WHERE id = %s", (actor_id, ))
      connection.commit()
  except mysql.connector.Error as error:
    print(error)

  finally:
    cursor.close()
    connection.close()
