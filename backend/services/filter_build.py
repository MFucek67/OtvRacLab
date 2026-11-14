import re

ALL_FIELDS = {
    "football_club_name": "football_club_name",
    "football_club_country": "football_club_country",
    "football_club_city": "football_club_city",
    "football_club_founded": "football_club_founded",
    "football_club_nickname": "football_club_nickname",
    "football_club_color": "football_club_colors",
    "football_club_mascot": "football_club_mascots",
    "stadium_name": "stadium.stadium_name",
    "stadium_city": "stadium.stadium_city",
    "stadium_country": "stadium.stadium_country",
    "stadium_capacity": "stadium.stadium_capacity",
    "league_name": "league.league_name",
    "league_country": "league.league_country",
    "trophy_name": "trophies.trophy_name",
    "trophy_number": "trophies.trophy_number"
}

def build_filter_query(search: str, field: str | None = None):
    if (not search):
        return None

    fields = [field] if field else list(ALL_FIELDS.keys())

    conditions = []

    for f in fields:
        db_field = ALL_FIELDS[f]

        if (f in ["football_club_founded", "stadium_capacity", "trophy_number"]):
            if search.isdigit():
                conditions.append({db_field: int(search)}) #user needs to type full number, not just start of it to get result
        else:
            conditions.append({
                db_field: {
                    "$regex": f"^{re.escape(search)}", #user can write just start of (string) field to get result
                    "$options": "i" #case insensitive
                }
            })

    if (not conditions):
        return None

    return {
        "$match": {
            "$or": conditions
        }
    }