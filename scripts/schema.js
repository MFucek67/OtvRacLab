use("football_clubs_db");

//deletion of old collections in db
db.trophies.drop();
db.football_clubs.drop();
db.stadiums.drop();

db.createCollection(
    "stadiums", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["stadium_name", "stadium_city", "stadium_country", "stadium_capacity"],
                properties: {
                    stadium_name: {
                        bsonType: "string",
                        description: "Name of football stadium."
                    },
                    stadium_city: {
                        bsonType: "string",
                        description: "City where football stadium is located."
                    },
                    stadium_country: {
                        bsonType: "string",
                        description: "Country where football stadium is located."
                    },
                    stadium_capacity: {
                        bsonType: "int",
                        minimum: 0,
                        description: "Maximum spectator capacity of the stadium."
                    }
                }
            }
        }
    }
);

db.createCollection(
    "football_clubs",
    {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["football_club_name", "football_club_country", "football_club_city", "football_club_founded",
                    "football_club_stadium_id", "football_club_colors", "last_updated"
                ],
                properties: {
                    football_club_name: {
                        bsonType: "string",
                        description: "Name of football club."
                    },
                    football_club_country: {
                        bsonType: "string",
                        description: "Country where football club is located."
                    },
                    football_club_city: {
                        bsonType: "string",
                        description: "City where football club is located."
                    },
                    football_club_founded: {
                        bsonType: "int",
                        minimum: 1800,
                        description: "Year when football club is founded."
                    },
                    football_club_league: {
                        bsonType: "string",
                        description: "Name of league football club is currently playing."
                    },
                    football_club_stadium_id: {
                        bsonType: "objectId",
                        description: "Reference to document in stadium collection."
                    },
                    football_club_nickname: {
                        bsonType: ["string", "null"],
                        description: "Nickname of football club."
                    },
                    football_club_colors: {
                        bsonType: "array",
                        minItems: 1,
                        items: {
                            bsonType: "string"
                        },
                        description: "Recognizable colors of football club."
                    },
                    football_club_mascots: {
                        bsonType: "array",
                        items: {
                            bsonType: "string"
                        },
                        description: "Official mascots of football club."
                    },
                    football_club_official_page: {
                        bsonType: ["string", "null"],
                        description: "Official page URL."
                    },
                    last_updated: {
                        bsonType: "date",
                        description: "Date when the club's current statistics were last updated."
                    }
                }
            }
        }
    }
);

db.createCollection(
    "trophies", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["trophy_name", "trophy_number", "trophy_football_club_id"],
                properties: {
                    trophy_name: {
                        bsonType: "string",
                        description: "Name of the trophy won."
                    },
                    trophy_number: {
                        bsonType: "int",
                        minimum: 1,
                        description: "Number of the trophies won."
                    },
                    trophy_football_club_id: {
                        bsonType: "objectId",
                        description: "Reference to document in football_clubs collection."
                    }
                }
            }
        }
    }
);