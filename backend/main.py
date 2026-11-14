from fastapi import FastAPI
from pathlib import Path
from fastapi.responses import Response, FileResponse
from fastapi.staticfiles import StaticFiles
from services.database import clubs_collection
from services.filter_build import build_filter_query
import json

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()

app.mount("/clubs/export", StaticFiles(directory="data"), name="export")
app.mount("/static", StaticFiles(directory=(BASE_DIR.parent / "frontend")), name="frontend")

json_pipeline = [
    {
        "$lookup": {
            "from": "stadiums",
            "localField": "football_club_stadium_id",
            "foreignField": "_id",
            "as": "stadium"
        }
    },
    {
        "$unwind": "$stadium"
    },
    {
        "$lookup": {
            "from": "leagues",
            "localField": "football_club_league_id",
            "foreignField": "_id",
            "as": "league"
        }
    },
    {
        "$unwind": "$league"
    },
    {  
        "$lookup": {
            "from": "trophies",
            "localField": "_id",
            "foreignField": "trophy_football_club_id",
            "as": "trophies"
        }
    },
    {
        "$project": {
            "_id": 0,
            "football_club_stadium_id": 0,
            "stadium._id": 0,
            "football_club_league_id": 0,
            "league._id": 0,
            "trophies.trophy_football_club_id": 0,
            "trophies._id": 0
        }
    }
]

csv_pipeline = [
    {
        "$lookup": {
            "from": "stadiums",
            "localField": "football_club_stadium_id",
            "foreignField": "_id",
            "as": "stadium"
        }
    },
    {
        "$unwind": "$stadium"
    },
    {
        "$lookup": {
            "from": "leagues",
            "localField": "football_club_league_id",
            "foreignField": "_id",
            "as": "league"
        }
    },
    {
        "$unwind": "$league"
    },
    {  
        "$lookup": {
            "from": "trophies",
            "localField": "_id",
            "foreignField": "trophy_football_club_id",
            "as": "trophies"
        }
    },
    {
        "$unwind": "$trophies"
    },
    {
        "$project": {
            "_id": 0,
            "football_club_name": 1,
            "football_club_country": 1,
            "football_club_city": 1,
            "football_club_founded": 1,
            "football_club_nickname": 1,
            "football_club_colors": 1,
            "football_club_mascots": 1,
            "football_club_official_page": 1,
            "last_updated": 1,
            "stadium_name": "$stadium.stadium_name",
            "stadium_city": "$stadium.stadium_city",
            "stadium_country": "$stadium.stadium_country",
            "stadium_capacity": "$stadium.stadium_capacity",
            "league_name": "$league.league_name",
            "league_country": "$league.league_country",
            "league_level": "$league.league_level",
            "league_number_of_teams": "$league.league_number_of_teams",
            "trophy_name": "$trophies.trophy_name",
            "trophy_number": "$trophies.trophy_number"
        }
    }
]

@app.get("/")
def home():
    return FileResponse((BASE_DIR.parent / "frontend") / "pages/index.html")

@app.get("/table")
def home():
    return FileResponse((BASE_DIR.parent / "frontend") / "pages/datatable.html")

@app.get("/api/clubs")
async def get_club(search: str = "", field: str | None = None):
    pipeline = json_pipeline.copy()
    match_query = build_filter_query(search, field)
    if (match_query):
        pipeline.insert(-1, match_query)
    query_res = list(clubs_collection.aggregate(pipeline))
    return Response(
        content=json.dumps(query_res, ensure_ascii=False, default=str),
        status_code=200,
        media_type="application/json"
    )