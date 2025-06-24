let characters;
let details;

const sp = new URLSearchParams(window.location.search);
const id = sp.get("id");

async function getSpecies(id) {
    try {
        details = await fetch(`http://localhost:9001/api/species/${id}`).then((res) =>
            res.json()
          );

          document.getElementById("species_name").textContent = details.name;

        let details_tag = document.getElementById("species_details");

        Object.entries(details).forEach(([k,v]) => {
            const tag = document.createElement('p');
            tag.innerHTML = `<p>${k}: <span ></span> ${v}</p>`;
            details_tag.appendChild(tag);
        })
        characters = await fetch(`http://localhost:9001/api/species/${id}/characters`).then((res) =>
          res.json()
        );
        
        const char_html = characters.map((character) => {
            return `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`;
          });
        
          document.querySelector("#species_character_list").innerHTML = char_html.join("");
    } catch (err) {
        console.error(`Error reading species ${id} data.`, err.message);
    }
}

getSpecies(id);