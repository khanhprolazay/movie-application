def base_movie_url(imdbId: str):
  return f'/titles/{imdbId}'

def movie_infor_url(imdbId: str, info: str):
  return base_movie_url(imdbId) if info == "" else f'{base_movie_url(imdbId)}?info={info}'