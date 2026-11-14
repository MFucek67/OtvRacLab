const football_club_headers = [
    "football_club_name", "football_club_country", "football_club_city", "football_club_founded", "football_club_nickname",
    "football_club_colors", "football_club_mascots", "football_club_official_page", "last_updated",
    "stadium_name", "stadium_city", "stadium_country", "stadium_capacity", "league_name", "league_country", "league_level",
    "league_number_of_teams", "trophy_name", "trophy_number"
]

let currentResults = [];

//event triggered when page and its resources load
window.addEventListener("load", () => {
    let table_body_el = document.getElementById("clubs_table_body");

    if (table_body_el) { //send query without query parameters (gets all documents) when table_body_el is loaded
        send_filtered_query();
    }
});

let search_form_el = document.getElementById("search_form");
if (search_form_el) {
    search_form_el.addEventListener("submit", (event) => {
        event.preventDefault(); //prevent refreshing of page and automatic sending of HTTP on URL in action field (default by browser when submitting <form>)
        send_filtered_query();
    });
}

//for changing URL (navigating)
function go_to(path) {
    window.location.href = path;
}

//loads documents into HTML table (using DOM of page)
function load_table(data) {
    let table_body_el = document.getElementById("clubs_table_body");

    //reset table from last search
    table_body_el.innerHTML = "";

    data.forEach(element => {
        const row = document.createElement("tr");

        const club_name = document.createElement("td");
        club_name.textContent = element.football_club_name;

        const club_country = document.createElement("td");
        club_country.textContent = element.football_club_country;

        const club_city = document.createElement("td");
        club_city.textContent = element.football_club_city;

        const club_founded = document.createElement("td");
        club_founded.textContent = element.football_club_founded;

        const club_nickname = document.createElement("td");
        club_nickname.textContent = "-"
        if (element.football_club_nickname != "" || element.football_club_nickname != null) {
            club_nickname.textContent = element.football_club_nickname;
        }

        const club_colors = document.createElement("td");
        club_colors.textContent = element.football_club_colors.join(", ");

        const club_mascots = document.createElement("td");
        club_mascots.textContent = "-"
        if (element.football_club_mascots !== undefined && element.football_club_mascots.length != 0)
        {
            club_mascots.textContent = element.football_club_mascots.join(", ");
        }

        const stadium_name = document.createElement("td");
        stadium_name.textContent = element.stadium.stadium_name;

        const stadium_city = document.createElement("td");
        stadium_city.textContent = element.stadium.stadium_city;

        const stadium_capacity = document.createElement("td");
        stadium_capacity.textContent = element.stadium.stadium_capacity;

        const league_name = document.createElement("td");
        league_name.textContent = element.league.league_name;

        const trophies = document.createElement("td");
        if (element.trophies.length > 0) {
            for (let i = 0; i < element.trophies.length; i++) {
                let trophy = element.trophies[i];
                let trophy_item = document.createElement("div");

                trophy_item.textContent = `${trophy.trophy_name} (${trophy.trophy_number})` //trophies and number of trophies will be one column
                trophies.appendChild(trophy_item);
            }
            trophies.classList.add("trophies_square");
        } else {
            trophies.textContent = "no trophies";
        }

        row.appendChild(club_name);
        row.appendChild(club_country);
        row.appendChild(club_city);
        row.appendChild(club_founded);
        row.appendChild(club_nickname);
        row.appendChild(club_colors);
        row.appendChild(club_mascots);
        row.appendChild(stadium_name);
        row.appendChild(stadium_city);
        row.appendChild(stadium_capacity);
        row.appendChild(league_name);
        row.appendChild(trophies);

        table_body_el.appendChild(row);
    });
}

//for sending query on database with filter
async function send_filtered_query() {
    const search = document.getElementById("search_input");
    const field = document.getElementById("search_select");

    let search_val = "";
    let field_val = "";

    if (search) {
        search_val = search.value;
        field_val = field.value;
    }

    fetch(`/api/clubs?search=${search_val}&field=${field_val}`)
    .then(result => {return result.json()})
    .then(data => {
        currentResults = data;
        load_table(currentResults);
    });
}

function download_filtered_csv() {

    const unwind_results = (obj) => {
        let results = [];
        if (obj.trophies.length === 0) {
            results.push(obj);
        } else {
            for (let i = 0; i < obj.trophies.length; i++) {
                let obj_unwinded = {
                    ...obj,
                    trophies: obj.trophies[i]
                };
                results.push(obj_unwinded);
            }
        }

        return results;
    };

    const get_value = (obj, header) => {
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
            if((key === "stadium") || (key === "trophies") || (key === "league")) {
                if(header in obj[key]) {
                    if(obj[key][header] != null) {
                        let value = obj[key][header];
                        if(Array.isArray(value)) {
                            return value.join("|")
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
    };

    const transform_club_obj_to_csv_line = (club_obj) => {
        let flattended_obj = [];
        for(const header of football_club_headers) {
            let value = get_value(club_obj, header);
            value = value.toString()
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

    const csv_rows = [football_club_headers.join(",")];

    currentResults.forEach(club => {
        //we need to make new objects for club (if club have more than 0 trophies -> all stay same, except trophies -> new trophy = new object)
        const club_unwinded = unwind_results(club);

        club_unwinded.forEach(club => {
            //transforming club objects to csv lines
            const csv_row = transform_club_obj_to_csv_line(club);
            csv_rows.push(csv_row);
        });
    });

    const csv = csv_rows.join("\n");
    const blob = new Blob([csv], {type: "text/csv"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_clubs.csv";
    link.click();

    URL.revokeObjectURL(url);
}

function download_filtered_json() {
    const json = JSON.stringify(currentResults, null, 4);
    const blob = new Blob([json], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_clubs.json";
    link.click();

    URL.revokeObjectURL(url);
}