
def get_movie_information_url(movie_imdb_id: str) -> str:
    return f'/movie/id/{movie_imdb_id}/';

def get_movie_cast_url(movie_imdb_id: str) -> str: 
    return f'/movie/id/{movie_imdb_id}/cast/'

def get_actor_information_url(actor_imdb_id: str) -> str:
    return f'/actor/id/{actor_imdb_id}/'

# Contain biographt, quote, trademark and trivia
def get_actor_bio_url(actor_imdb_id: str) -> str:
    return f'/actor/id/{actor_imdb_id}/bio/'

# def get_image_url(movie_imdb_id: str):
#   return f'/titles/{movie_imdb_id}'




