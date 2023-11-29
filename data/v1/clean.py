import pandas as pd

movies = pd.read_csv('./movies.csv', usecols=["id", "duration"])
# years = ["2002", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]

def filter(movie):
  try:
    # year: str = movie["year"]
    minutes: int = int(movie["duration"].split(" min")[0])

    adaptedMinutes = minutes > 60
    # adaptedYear = any(element in year for element in years)

    return adaptedMinutes
  except:
    return False
  
movies = movies[movies.apply(lambda movie: filter(movie), axis=1)]
movies.to_csv("movies_clean.csv", index=False, header=True)