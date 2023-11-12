import datetime

class Video:
  def __init__(self, imdbId: str, type: str):
    self.imdbId = imdbId
    self.type = type

class Cast:
  def __init__(self, imdbId: str, name: str, imageUrl: str, role: str):
    self.imdbId = imdbId
    self.name = name
    self.imageUrl = imageUrl
    self.role = role

class Movie:
  def __init__(self, imdbId: str, name: str, imageUrl: str, releaseDate: datetime.date, movieLength: float, plot: str, rating: float, genres: list[str], voteCount: int) -> None:
    self.imdbId = imdbId;
    self.name = name
    self.imageUrl = imageUrl
    self.releaseDate = releaseDate
    self.movieLength = movieLength
    self.plot = plot
    self.rating = rating
    self.genres = genres
    self.voteCount = voteCount