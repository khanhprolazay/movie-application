import time
def test():
  print("something", end="")
  time.sleep(4)
  print(" and ", end="")
  time.sleep(4)
  print("something")

test()