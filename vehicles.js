let drivers;
let details;

const sp = new URLSearchParams(window.location.search);
const id = sp.get("id");

async function getVehicle(id) {
    try {
        details = await fetch(`http://localhost:9001/api/vehicles/${id}`).then((res) =>
            res.json()
          );

          document.getElementById("vehicle_name").textContent = details.vehicle_class;

        drivers = await fetch(`http://localhost:9001/api/vehicles/${id}/characters`).then((res) =>
          res.json()
        );
        
        const char_html = drivers.map((driver) => {
            return `<li><a href="/character.html?id=${driver.id}">${driver.name}</a></li>`;
          });
        
          document.querySelector("#vehicle_drivers>ul").innerHTML = char_html.join("");
    } catch (err) {
        console.error(`Error reading vehicle ${id} data.`, err.message);
    }
}

getVehicle(id);