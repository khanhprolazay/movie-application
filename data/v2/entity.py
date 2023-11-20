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

class Budget:
  def __init__(self, amount: float, currency: str):
    self.amount = amount
    self.currency = currency

class OpeningWeekendGross:
  def __init__(self, amount: float, currency: str, weekendEndDate: datetime.date):
    self.amount = amount
    self.currency = currency
    self.weekendEndDate = weekendEndDate

class BudgetResponse:
  def __init__(self, productionBudget: Budget, lifetimeGross: Budget, openingWeekendGross: OpeningWeekendGross, wordwideGross: Budget):
    self.productionBudget = productionBudget
    self.lifetimeGross = lifetimeGross
    self.openingWeekendGross = openingWeekendGross
    self.wordwideGross = wordwideGross
    
    
class DirectorResponse:
  def __init__(self, directors: list[Cast], writers: list[Cast]):
    self.directors = directors
    self.writers = writers
