from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")
database = client["football_clubs_db"]
clubs_collection = database["football_clubs"]
stadiums_collection = database["stadiums"]
trophies_collection = database["trophies"]
league_collection = database["leagues"]