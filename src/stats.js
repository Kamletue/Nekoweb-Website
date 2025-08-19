let url = 'https://nekoweb.org/api/site/info/kamuretsu.nekoweb.org';
let results;
let options = {
    method: 'GET',
};
let welcometext = document.getElementById("WelcomeDiv");
let placeholder = 1755533657027;
let date = new Date(placeholder * 1000);
async function getStats() {
    try {
        const f = await fetch(url, options);
        if (!f.ok) {
            throw new Error(`Response status: ${f.status}`);
        }
        const JsonThing = await f.json();
        results = JSON.stringify(JsonThing);
        let e = JSON.parse(results);
        if (welcometext && e) {
            welcometext.innerText = e.updated_at;
        }
        else if (welcometext) {
            welcometext.innerText = "Couldn't fetch last update time ;(";
        }
        else {
            throw new Error("Can't get desired div.");
        }
    }
    catch (e) {
        console.error(e);
    }
}
//getStats();
//# sourceMappingURL=stats.js.map