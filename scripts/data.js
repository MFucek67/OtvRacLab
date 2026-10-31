use("football_clubs_db");

db.stadiums.insertMany(
    [
        {
            stadium_name: "Santiago Bernabeu",
            stadium_city: "Madrid",
            stadium_country: "Spain",
            stadium_capacity: NumberInt(83816)
        },
        {
            stadium_name: "Camp Nou",
            stadium_city: "Barcelona",
            stadium_country: "Spain",
            stadium_capacity: NumberInt(62657)
        },
        {
            stadium_name: "Allianz Arena",
            stadium_city: "München",
            stadium_country: "Germany",
            stadium_capacity: NumberInt(75024)
        },
        {
            stadium_name: "Signal Iduna Park",
            stadium_city: "Dortmund",
            stadium_country: "Germany",
            stadium_capacity: NumberInt(81365)
        },
        {
            stadium_name: "Stadion Maksimir",
            stadium_city: "Zagreb",
            stadium_country: "Croatia",
            stadium_capacity: NumberInt(35123)
        },
        {
            stadium_name: "Poljud",
            stadium_city: "Split",
            stadium_country: "Croatia",
            stadium_capacity: NumberInt(34183)
        },
        {
            stadium_name: "Stadion \"Brdo\"",
            stadium_city: "Ždralovi",
            stadium_country: "Croatia",
            stadium_capacity: NumberInt(1000)
        },
        {
            stadium_name: "Molineux Stadium",
            stadium_city: "Wolverhampton",
            stadium_country: "England",
            stadium_capacity: NumberInt(31750)
        },
        {
            stadium_name: "Stamford Bridge",
            stadium_city: "London",
            stadium_country: "England",
            stadium_capacity: NumberInt(40044)
        },
        {
            stadium_name: "San Siro (Giuseppe Meazza)",
            stadium_city: "Milano",
            stadium_country: "Italy",
            stadium_capacity: NumberInt(75923)
        },
        {
            stadium_name: "Groupama Arena",
            stadium_city: "Budapest",
            stadium_country: "Hungary",
            stadium_capacity: NumberInt(23698)
        }
    ]
);

print("Stadiums inserted successfully.");

const stadiums = db.stadiums.find().toArray();

const stadiumIds = {};
stadiums.forEach(element => {
    stadiumIds[element.stadium_name] = element._id;
});

db.football_clubs.insertMany(
    [
        {
            football_club_name: "Real Madrid",
            football_club_country: "Spain",
            football_club_city: "Madrid",
            football_club_founded: NumberInt(1902),
            football_club_league: "LaLiga",
            football_club_stadium_id: stadiumIds["Santiago Bernabeu"],
            football_club_nickname: "Los Merengues",
            football_club_colors: ["white"],
            football_club_mascots: [],
            football_club_official_page: "https://www.realmadrid.com",
            last_updated: ISODate()
        },
        {
            football_club_name: "Barcelona",
            football_club_country: "Spain",
            football_club_city: "Barcelona",
            football_club_founded: NumberInt(1899),
            football_club_league: "LaLiga",
            football_club_stadium_id: stadiumIds["Camp Nou"],
            football_club_nickname: "Blaugrana",
            football_club_colors: ["blue", "red"],
            football_club_mascots: ["CAT"],
            football_club_official_page: "https://www.fcbarcelona.com",
            last_updated: ISODate()
        },
        {
            football_club_name: "Bayern München",
            football_club_country: "Germany",
            football_club_city: "München",
            football_club_founded: NumberInt(1900),
            football_club_league: "Bundesliga",
            football_club_stadium_id: stadiumIds["Allianz Arena"],
            football_club_nickname: "Der FCB",
            football_club_colors: ["red", "white"],
            football_club_mascots: ["Berni"],
            football_club_official_page: "https://fcbayern.com",
            last_updated: ISODate()
        },
        {
            football_club_name: "Borussia Dortmund",
            football_club_country: "Germany",
            football_club_city: "Dortmund",
            football_club_founded: NumberInt(1909),
            football_club_league: "Bundesliga",
            football_club_stadium_id: stadiumIds["Signal Iduna Park"],
            football_club_nickname: "Der BVB",
            football_club_colors: ["black", "yellow"],
            football_club_mascots: ["EMMA"],
            football_club_official_page: "https://www.bvb.de",
            last_updated: ISODate()
        },
        {
            football_club_name: "Dinamo Zagreb",
            football_club_country: "Croatia",
            football_club_city: "Zagreb",
            football_club_founded: NumberInt(1945),
            football_club_league: "Hrvatska nogometna liga",
            football_club_stadium_id: stadiumIds["Stadion Maksimir"],
            football_club_nickname: "Modri",
            football_club_colors: ["blue"],
            football_club_mascots: ["Plavko"],
            football_club_official_page: "https://gnkdinamo.hr/",
            last_updated: ISODate()
        },
        {
            football_club_name: "Hajduk Split",
            football_club_country: "Croatia",
            football_club_city: "Split",
            football_club_founded: NumberInt(1911),
            football_club_league: "Hrvatska nogometna liga",
            football_club_stadium_id: stadiumIds["Poljud"],
            football_club_nickname: "Bili",
            football_club_colors: ["white"],
            football_club_mascots: ["Rico"],
            football_club_official_page: "https://hajduk.hr/",
            last_updated: ISODate()
        },
        {
            football_club_name: "Mladost Ždralovi",
            football_club_country: "Croatia",
            football_club_city: "Ždralovi",
            football_club_founded: NumberInt(1933),
            football_club_league: "Druga NL",
            football_club_stadium_id: stadiumIds["Stadion \"Brdo\""],
            football_club_nickname: "Ždralovi",
            football_club_colors: ["red", "black"],
            football_club_mascots: [],
            football_club_official_page: "https://mladost-zdralovi.hr/",
            last_updated: ISODate()
        },
        {
            football_club_name: "Wolverhampton Wanderers",
            football_club_country: "England",
            football_club_city: "Wolverhampton",
            football_club_founded: NumberInt(1877),
            football_club_league: "Championship",
            football_club_stadium_id: stadiumIds["Molineux Stadium"],
            football_club_nickname: "Wolves",
            football_club_colors: ["gold", "black"],
            football_club_mascots: ["Wolfie", "Wendy", "Wilfred"],
            football_club_official_page: "https://www.wolves.co.uk/",
            last_updated: ISODate()
        },
        {
            football_club_name: "Chelsea",
            football_club_country: "England",
            football_club_city: "London",
            football_club_founded: NumberInt(1905),
            football_club_league: "Premier League",
            football_club_stadium_id: stadiumIds["Stamford Bridge"],
            football_club_nickname: "The Blues",
            football_club_colors: ["blue", "white"],
            football_club_mascots: ["Stamford", "Bridget"],
            football_club_official_page: "https://www.chelseafc.com/en",
            last_updated: ISODate()
        },
        {
            football_club_name: "AC Milan",
            football_club_country: "Italy",
            football_club_city: "Milano",
            football_club_founded: NumberInt(1899),
            football_club_league: "Serie A",
            football_club_stadium_id: stadiumIds["San Siro (Giuseppe Meazza)"],
            football_club_nickname: "Rossoneri",
            football_club_colors: ["black", "red"],
            football_club_mascots: ["Milanello"],
            football_club_official_page: "https://www.acmilan.com/",
            last_updated: ISODate()
        },
        {
            football_club_name: "Inter Milan",
            football_club_country: "Italy",
            football_club_city: "Milano",
            football_club_founded: NumberInt(1908),
            football_club_league: "Serie A",
            football_club_stadium_id: stadiumIds["San Siro (Giuseppe Meazza)"],
            football_club_nickname: "Nerazzurri",
            football_club_colors: ["black", "blue"],
            football_club_mascots: [],
            football_club_official_page: "https://www.inter.it/",
            last_updated: ISODate()
        },
        {
            football_club_name: "Ferencvárosi TC",
            football_club_country: "Hungary",
            football_club_city: "Budapest",
            football_club_founded: NumberInt(1899),
            football_club_league: "Nemzeti Bajnokság I",
            football_club_stadium_id: stadiumIds["Groupama Arena"],
            football_club_nickname: "Fradi",
            football_club_colors: ["green", "white"],
            football_club_mascots: [],
            football_club_official_page: "https://www.fradi.hu/",
            last_updated: ISODate()
        }
    ]
);

print("Football clubs inserted successfully.");

const clubs = db.football_clubs.find().toArray();

const clubIds = {};
clubs.forEach(element => {
    clubIds[element.football_club_name] = element._id;
});

db.trophies.insertMany(
    [
        // Real Madrid
        {
            trophy_name: "Champions League Winner",
            trophy_number: NumberInt(15),
            trophy_football_club_id: clubIds["Real Madrid"]
        },
        {
            trophy_name: "LaLiga Winner",
            trophy_number: NumberInt(36),
            trophy_football_club_id: clubIds["Real Madrid"]
        },
        {
            trophy_name: "Copa Del Rey Winner",
            trophy_number: NumberInt(20),
            trophy_football_club_id: clubIds["Real Madrid"]
        },
        // Barcelona
        {
            trophy_name: "Champions League Winner",
            trophy_number: NumberInt(5),
            trophy_football_club_id: clubIds["Barcelona"]
        },
        {
            trophy_name: "LaLiga Winner",
            trophy_number: NumberInt(29),
            trophy_football_club_id: clubIds["Barcelona"]
        },
        {
            trophy_name: "Copa Del Rey Winner",
            trophy_number: NumberInt(32),
            trophy_football_club_id: clubIds["Barcelona"]
        },
        // Bayern
        {
            trophy_name: "Champions League Winner",
            trophy_number: NumberInt(6),
            trophy_football_club_id: clubIds["Bayern München"]
        },
        {
            trophy_name: "Bundesliga Winner",
            trophy_number: NumberInt(35),
            trophy_football_club_id: clubIds["Bayern München"]
        },
        {
            trophy_name: "DFB-Pokal Winner",
            trophy_number: NumberInt(21),
            trophy_football_club_id: clubIds["Bayern München"]
        },
        // Borussia Dortmund
        {
            trophy_name: "Champions League Winner",
            trophy_number: NumberInt(1),
            trophy_football_club_id: clubIds["Borussia Dortmund"]
        },
        {
            trophy_name: "Bundesliga Winner",
            trophy_number: NumberInt(8),
            trophy_football_club_id: clubIds["Borussia Dortmund"]
        },
        {
            trophy_name: "DFB-Pokal Winner",
            trophy_number: NumberInt(5),
            trophy_football_club_id: clubIds["Borussia Dortmund"]
        },
        // Dinamo Zagreb
        {
            trophy_name: "Inter-Cities Fairs Cup Winner",
            trophy_number: NumberInt(1),
            trophy_football_club_id: clubIds["Dinamo Zagreb"]
        },
        {
            trophy_name: "HNL Winner",
            trophy_number: NumberInt(26),
            trophy_football_club_id: clubIds["Dinamo Zagreb"]
        },
        {
            trophy_name: "Croatian Cup Winner",
            trophy_number: NumberInt(18),
            trophy_football_club_id: clubIds["Dinamo Zagreb"]
        },
        // Hajduk
        {
            trophy_name: "HNL Winner",
            trophy_number: NumberInt(6),
            trophy_football_club_id: clubIds["Hajduk Split"]
        },
        {
            trophy_name: "Croatian Cup Winner",
            trophy_number: NumberInt(8),
            trophy_football_club_id: clubIds["Hajduk Split"]
        },
        // Ždralovi
        {
            trophy_name: "3. HNL - North Champion",
            trophy_number: NumberInt(5),
            trophy_football_club_id: clubIds["Mladost Ždralovi"]
        },
        // Wolverhampton
        {
            trophy_name: "English First Division Winner",
            trophy_number: NumberInt(3),
            trophy_football_club_id: clubIds["Wolverhampton Wanderers"]
        },
        {
            trophy_name: "FA Cup Winner",
            trophy_number: NumberInt(4),
            trophy_football_club_id: clubIds["Wolverhampton Wanderers"]
        },
        // Chelsea
        {
            trophy_name: "Champions League Winner",
            trophy_number: NumberInt(2),
            trophy_football_club_id: clubIds["Chelsea"]
        },
        {
            trophy_name: "Europa League Winner",
            trophy_number: NumberInt(2),
            trophy_football_club_id: clubIds["Chelsea"]
        },
        {
            trophy_name: "Conference League Winner",
            trophy_number: NumberInt(1),
            trophy_football_club_id: clubIds["Chelsea"]
        },
        {
            trophy_name: "Premier League Winner",
            trophy_number: NumberInt(6),
            trophy_football_club_id: clubIds["Chelsea"]
        },
        {
            trophy_name: "FA Cup Winner",
            trophy_number: NumberInt(8),
            trophy_football_club_id: clubIds["Chelsea"]
        },
        // AC Milan
        {
            trophy_name: "Champions League Winner",
            trophy_number: NumberInt(7),
            trophy_football_club_id: clubIds["AC Milan"]
        },
        {
            trophy_name: "Serie A Winner",
            trophy_number: NumberInt(19),
            trophy_football_club_id: clubIds["AC Milan"]
        },
        {
            trophy_name: "Coppa Italia Winner",
            trophy_number: NumberInt(5),
            trophy_football_club_id: clubIds["AC Milan"]
        },
        // Inter Milan
        {
            trophy_name: "Champions League Winner",
            trophy_number: NumberInt(3),
            trophy_football_club_id: clubIds["Inter Milan"]
        },
        {
            trophy_name: "Serie A Winner",
            trophy_number: NumberInt(21),
            trophy_football_club_id: clubIds["Inter Milan"]
        },
        {
            trophy_name: "Coppa Italia Winner",
            trophy_number: NumberInt(10),
            trophy_football_club_id: clubIds["Inter Milan"]
        },
        // Ferencvárosi
        {
            trophy_name: "Inter-Cities Fairs Cup Winner",
            trophy_number: NumberInt(1),
            trophy_football_club_id: clubIds["Ferencvárosi TC"]
        },
        {
            trophy_name: "Hungarian League Winner",
            trophy_number: NumberInt(36),
            trophy_football_club_id: clubIds["Ferencvárosi TC"]
        },
        {
            trophy_name: "Hungarian Cup Winner",
            trophy_number: NumberInt(25),
            trophy_football_club_id: clubIds["Ferencvárosi TC"]
        }
    ]
);

print("Trophies inserted successfully.");