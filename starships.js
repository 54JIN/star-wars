let pilots;
let details;

const sp = new URLSearchParams(window.location.search);
const id = sp.get("id");

async function getStarship(id) {
    try {
        details = await fetch(`http://localhost:9001/api/starships/${id}`).then((res) =>
            res.json()
          );

          document.getElementById("starship_name").textContent = details.starship_class;

        let details_tag = document.getElementById("starship_details");

        Object.entries(details).forEach(([k,v]) => {
            const tag = document.createElement('p');
            tag.innerHTML = `<p>${k}: <span ></span> ${v}</p>`;
            details_tag.appendChild(tag);
        })
        pilots = await fetch(`http://localhost:9001/api/starships/${id}/characters`).then((res) =>
          res.json()
        );
        console.log(pilots);
        const char_html = pilots.map((pilot) => {
            return `<li><a href="/character.html?id=${pilot.id}">${pilot.name}</a></li>`;
          });
        
          document.querySelector("#starship_pilots_list").innerHTML = char_html.join("");
    } catch (err) {
        console.error(`Error reading starship ${id} data.`, err.message);
    }
}

getStarship(id);