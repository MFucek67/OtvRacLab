use("football_clubs_db");

const football_club_headers = [
    "football_club_name", "football_club_country", "football_club_city", "football_club_founded", "football_club_league",
    "football_club_nickname", "football_club_colors", "football_club_mascots", "football_club_official_page", "last_updated",
    "stadium_name", "stadium_city", "stadium_country", "stadium_capacity", "trophy_name", "trophy_number"
]

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
            from: "trophies",
            localField: "_id",
            foreignField: "trophy_football_club_id",
            as: "trophies"
        }
    },
    {
        $unwind: "$trophies"
    },
    {
        $project: {
            "_id": 0,
            "football_club_stadium_id": 0,
            "stadium._id": 0,
            "trophies.trophy_football_club_id": 0,
            "trophies._id": 0
        }
    },
]).toArray();

function getValue(obj, header) {
    if(header in obj) { //attribute we are looking for is in parent object
        let value = obj[header];
        if(Array.isArray(value)) {
            return value.join("|") //array members separated with |
        } else {
            return value;
        }
    }

    //attribute we are looking for is in child object or missing - we need to look in child
    for(const key of Object.keys(obj)) {
        if((key === "stadium") || (key === "trophies")) {
            if(header in obj[key]) {
                if(obj[key][header] != null) {
                    let value = obj[key][header];
                    if(Array.isArray(value)) {
                        return value.join(" and ")
                    } else {
                        return value;
                    }
                } else {
                    return ""
                }
            }
        }
    }

    return "" //attribute missing
}

const transform_club_obj_to_csv_line = (club_obj) => {
    let flattended_obj = [];
    for(const header of football_club_headers) {
        let value = getValue(club_obj, header);
        if(header === "last_updated") {
            value = value.toISOString();
        } else {
            value = value.toString()
        }
        //use standard CSV escaping
        //all strings that use " inside -> " gets doubled with another one of "
        //also, if string includes " or , or \n or \r, then whole string gets wrapped with ""
        if(value.includes('"')) {
            value = value.replaceAll('"', '""')
        }
        if (value.includes(",") || value.includes('"') || value.includes("\n") || value.includes("\r")) {
            value = '"' + value + '"';
        }
        flattended_obj.push(value);
    }

    const result = flattended_obj.join(",");
    return result;
};

print(football_club_headers.join(","));
result.forEach(club => {
    const csv_row = transform_club_obj_to_csv_line(club);
    print(csv_row);
});