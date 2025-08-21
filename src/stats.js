let url = 'https://nekoweb.org/api/site/info/kamuretsu.nekoweb.org';
let results;
let options = {
    method: 'GET',
};
let dateText = document.getElementById("lastUpdatedText");
async function getStats() {
    try {
        const f = await fetch(url, options);
        if (!f.ok) {
            throw new Error(`Response status: ${f.status}`);
        }
        const JsonThing = await f.json();
        results = JSON.stringify(JsonThing);
        let e = JSON.parse(results);
        if (dateText && e) {
            let date = new Date(e.updated_at);
            dateText.innerText = date.toUTCString();
        }
        else if (dateText) {
            dateText.innerText = "Couldn't fetch last update time ;(";
        }
        else {
            throw new Error("Can't get desired div.");
        }
    }
    catch (e) {
        console.error(e);
    }
}
//getStats(); Only uncomment when publishing, prevent getting rate limited
//# sourceMappingURL=stats.js.map