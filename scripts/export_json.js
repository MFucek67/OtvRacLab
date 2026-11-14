use("football_clubs_db");

let result = db.football_clubs.aggregate([
    {
        $lookup: {
            from: "stadiums",
            localField: "football_club_stadium_id",
            foreignField: "_id",
            as: "stadium"
        }
    },
    {
        $unwind: "$stadium"
    },
    {
        $lookup: {
            from: "leagues",
            localField: "football_club_league_id",
            foreignField: "_id",
            as: "league"
        }
    },
    {
        $unwind: "$league"
    },
    {  
        $lookup: {
            from: "trophies",
            localField: "_id",
            foreignField: "trophy_football_club_id",
            as: "trophies"
        }
    },
    {
        $project: {
            "_id": 0,
            "football_club_stadium_id": 0,
            "stadium._id": 0,
            "football_club_league_id": 0,
            "league._id": 0,
            "trophies.trophy_football_club_id": 0,
            "trophies._id": 0
        }
    }
]).toArray();

const json = JSON.stringify(result, null, 4);
print(json);