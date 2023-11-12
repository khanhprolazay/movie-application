import requests
from get import *

# url = "https://api.themoviedb.org/3/movie/tt9362722"

# headers = {
#     "accept": "application/json",
#     "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzcwM2Y1MTYwOGJhMTUxOTc0YmI3NzMxYjM4MGQ2MiIsInN1YiI6IjY0ZWYwZTJlM2E5OTM3MDBlMmY2ZWNkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U-q7wujbpA6MEq24IRFeJFZncC6GVzmGPyRsxG8icDc"
# }

# response = requests.get(url, headers=headers)

movie = get_movie_v2("tt0001223")
print(type(movie.tagline))