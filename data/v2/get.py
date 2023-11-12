import json
import datetime
from link import *
import http.client
from transform import *
import requests
from entity import *
from concurrent.futures import ThreadPoolExecutor

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
  'da0389b86emshe53cd333500c9ddp1c6ddajsnf3fda4504ace', # nguyenthanhtuan697100@gmail.com
  '1099b61c8emshcfa5154d8e78632p103658jsn7aee446d7d49', #totletruong54@gmail.com
]

tokens = [
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzcwM2Y1MTYwOGJhMTUxOTc0YmI3NzMxYjM4MGQ2MiIsInN1YiI6IjY0ZWYwZTJlM2E5OTM3MDBlMmY2ZWNkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U-q7wujbpA6MEq24IRFeJFZncC6GVzmGPyRsxG8icDc',
]

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
    'X-RapidAPI-Host': "moviesdatabase.p.rapidapi.com"
}

  conn = http.client.HTTPSConnection("moviesdatabase.p.rapidapi.com")
  conn.request("GET", url, headers=headers)
  res = conn.getresponse()

  data = res.read()
  result = json.loads(data.decode("utf-8"))
  conn.close()

  # Check if the key has reach limit
  message = result.get("message")
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

def get_v2(url: str):

  try:
    headers = {
      "accept": "application/json",
      "Authorization": f'Bearer {tokens[0]}' # khanhprolazay
    }

    conn = http.client.HTTPSConnection("api.themoviedb.org")
    conn.request("GET", url, headers=headers)
    res = conn.getresponse()

    data = res.read()
    result = json.loads(data.decode("utf-8"))
    conn.close()

    return result
  
  except Exception as error:
    print(error)
    return None

  
class GetMovieResult:
  def __init__(self, movie: Movie, desc: str, casts: list[Cast], trailers: list[Video]):
    self.movie = movie
    self.casts = casts
    self.desc= desc
    self.trailers = trailers

class GetMovieResultV2:
  def __init__(self, backdropPath: str, posterPath: str, tagline: str):
    self.backdropPath = backdropPath
    self.posterPath = posterPath
    self.tagline = tagline


def get_movie(imdbId: str) -> GetMovieResult | None:
  try:
    urls = [
      movie_infor_url(imdbId, "base_info"),
      movie_infor_url(imdbId, "summaries"), 
      movie_infor_url(imdbId, "extendedCast"), 
      movie_infor_url(imdbId, "primaryVideos"), 
    ]
    with ThreadPoolExecutor() as executor:
      results = executor.map(get, urls)

    movie = transform_movie(imdbId, next(results))
    desc = trasfrom_description(next(results))
    casts = transform_casts(next(results))
    trailers = transform_trailers(next(results))

    return None if movie is None else GetMovieResult(movie, desc, casts, trailers)
  except Exception as error:
    return None
  
def get_movies_by_year(year: int, page: int):
  movies = get(f'/titles?titleType=movie&page={page}&limit=50&year={year}&info=id')
  return movies if movies != None else []

def get_movie_release(imdbId: str) -> datetime.date | None:
  try:
    movie = get(movie_infor_url(imdbId, ""))

    releaseDate = movie.get("releaseDate")
    releaseYear = movie.get("releaseYear")

    return format_date(releaseDate) if releaseDate is not None else format_date(releaseYear)
  except Exception as error:
    return None
  
def get_vote_count(imdbId: str) -> int:
  try:
    movie = get(movie_infor_url(imdbId, "rating"))
    return movie.get("ratingsSummary").get("voteCount")
  
  except Exception as error:
    return None

def get_movie_v2(imdbId: str) -> GetMovieResultV2 | None:
  try:
    uri = f'/3/movie/{imdbId}'
    movie = get_v2(uri)

    posterPath = movie.get("poster_path")
    backdropPath = movie.get("backdrop_path")
    tagline = movie.get("tagline")
    
    return GetMovieResultV2(backdropPath, posterPath, tagline)
  except Exception as error:
    return None