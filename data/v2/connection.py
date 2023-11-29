import mysql.connector

def create_connection() -> mysql.connector.MySQLConnection:
  return mysql.connector.connect(
    host="localhost",
    port=23306,
    user="root",
    password="root",
    database="movieservice",
  )