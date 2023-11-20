from entity import Movie, Cast, Video, Budget, OpeningWeekendGross
from datetime import datetime

def format_date(date: any):
  try:
    year = date.get("year")
    month = date.get("month")
    day = date.get("day")

    if year is None:
      return None
    
    if month is None:
      return datetime.datetime(year, 1, 1)
    
    if day is None:
      return datetime.datetime(year, month, 1)
    
    return datetime.datetime(year, month, day)

  except Exception as error:
    return None
  
def tranform_runtime(information: any):
  try:  
    runtime = information.get("runtime")
    return None if runtime is None else runtime.get("seconds")/60
  except:
    return None
  
def tranform_image(information: any):
  try:  
    return information.get("primaryImage").get("url")
  except:
    return None

def transform_movie(imdbId: str, information: any):
  try:
    name = information.get("originalTitleText").get("text")
    imageUrl = tranform_image(information)
    releaseDate = format_date(information.get("releaseDate"))
    movieLength = tranform_runtime(information)
    plot = transform_plot(information)
    rating = transform_rating(information)
    genres = transform_genres(information)
    voteCount = transform_votecount(information)

    return Movie(imdbId, name, imageUrl, releaseDate, movieLength, plot, rating, genres, voteCount)
  except Exception as error:
    print(f'Error when trasform {imdbId}: {error}', flush=True)
    return None
  

def transform_trailers(videos: any) -> list[Video]:
  try:
    array = videos.get("primaryVideos").get("edges")
    result = []

    for item in array:
      node = item.get("node")
      imdbId = node.get("id")      
      playbackUrls = node.get("playbackURLs")

      transformItem = Video(imdbId, playbackUrls[0]["mimeType"]) 
      result.append(transformItem)

    return result
  except Exception as error:
    return []
  
def trasfrom_description(desc: any) -> str:
  try:
    return desc.get("summaries").get("edges")[0].get("node").get("plotText").get("plaidHtml")
  except Exception as error:
    return None
  
def transform_casts(casts: any) -> list[Cast]:
  def getImage(node: any):
    try:
      return node["name"]["primaryImage"]["url"]
    except:
      return None
    
  try:
    result = []
    casts = casts.get("cast").get("edges")
    for cast in casts:
      node = cast.get("node")
      image = node["name"]["primaryImage"] 

      try:
        actor = Cast(
          node["name"]["id"],
          node["name"]["nameText"]["text"],
          getImage(node),
          node["characters"][0]["name"] 
        )
        result.append(actor)
      except:
        pass
      
    return result
  except Exception as error:
    return result
  
def transform_plot(plot: any) -> str:
  try:
    return plot.get("plot").get("plotText").get("plainText")
  except Exception as error:
    return None
  
def transform_rating(information: any) -> float:
  try:
    return information["ratingsSummary"]["aggregateRating"]
  except Exception as error:
    return None
  
def transform_votecount(information: any) -> float:
  try:
    return information["ratingsSummary"]["voteCount"]
  except Exception as error:
    return None
  

def transform_genres(genres: any) -> list[str]:
  try:
    genres = genres["genres"]["genres"]
    result = []
    for genre in genres:
      result.append(genre["text"])
    return result
  except Exception as error:
    return []
  
def transfromProductionBudget(data: any):
  try:
    budget = data["productionBudget"]["budget"]
    return Budget(budget["amount"], budget["currency"])
  except Exception as error:
    return None
  
def transfromLifetimeGross(data: any):
  try:
    total = data["lifetimeGross"]["total"]
    return Budget(total["amount"], total["currency"])
  except Exception as error:
    return None
  
def transformOpeningWeekendGross(data: any):
  try:
    total = data["openingWeekendGross"]["gross"]["total"]
    weekendEndDate = datetime.strptime(data["openingWeekendGross"]["weekendEndDate"], '%Y-%m-%d')
    return OpeningWeekendGross(total["amount"], total["currency"], weekendEndDate)
  except Exception as error:
    print(error, flush=True)
    return None
  
def transfromWorldwideGross(data: any):
  try:
    total = data["worldwideGross"]["total"]
    return Budget(total["amount"], total["currency"])
  except Exception as error:
    return None
  

def transformDirectors(data: any) -> list[Cast]:
  try:
    creadits = data["directors"][0]["credits"]
    return list(map(lambda director: Cast(director["name"]["id"], director["name"]["nameText"]["text"], None, None), creadits))
  except Exception as error:
    return []

def transformWriters(data: any) -> list[Cast]:
  try:
    creadits = data["writers"][0]["credits"]
    return list(map(lambda writer: Cast(writer["name"]["id"], writer["name"]["nameText"]["text"], None, None), creadits))
  except Exception as error:
    return []