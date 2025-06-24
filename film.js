let film;
let characters;
let planets;
let species;
let starships;
let vehicles;

const sp = new URLSearchParams(window.location.search);
const id = sp.get("id");

async function loadFilm(id) {
  // fetch the movie details
  try {
    film = await fetch(`http://localhost:9001/api/films/${id}`).then((res) =>
      res.json()
    );
    characters = await fetch(
      `http://localhost:9001/api/films/${id}/characters`
    ).then((res) => res.json());
    planets = await fetch(`http://localhost:9001/api/films/${id}/planets`).then(
      (res) => res.json()
    );
    species = await fetch(`http://localhost:9001/api/films/${id}/species`).then(
      (res) => res.json()
    );
    starships = await fetch(
      `http://localhost:9001/api/films/${id}/starships`
    ).then((res) => res.json());
    vehicles = await fetch(
        `http://localhost:9001/api/films/${id}/vehicles`
      ).then((res) => res.json());
  } catch (err) {
    console.error(`Error reading film ${id} data.`, err.message);
  }

  renderFilm({ film, characters, planets, species, starships, vehicles });
}

function renderFilm({ film, characters, planets, species, starships, vehicles }) {
  renderFilmDetails(film);
  renderCharacters(characters);
  renderPlanets(planets);
  renderSpecies(species);
  renderStarships(starships);
  renderVehicles(vehicles);
}

function renderFilmDetails(film) {
  document.querySelector("#film_name").textContent = film.title;
  document.querySelector("#film_release_date").textContent = film.release_date;
  document.querySelector("#film_director").textContent = film.director;
  document.querySelector("#film_episode_id").textContent = film.episode_id;
  document.querySelector("#film_synopsis").textContent = film.opening_crawl;
}

function renderCharacters(characters) {
  const char_html = characters.map((character) => {
    return `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`;
  });

  document.querySelector("#film_character_list").innerHTML = char_html.join("");
}

function renderPlanets(planets) {
  console.log(planets);
  const char_html = planets.map((planet) => {
    return `<li><a href="/planet.html?id=${planet.id}">${planet.name}</a></li>`;
  });

  document.querySelector("#film_planet_list").innerHTML = char_html.join("");
}

function renderSpecies(species) {
    const char_html = species.map((s) => {
        return `<li><a href="/species.html?id=${s.id}">${s.name}</a></li>`;
      });
    
      document.querySelector("#film_species_list").innerHTML = char_html.join("");
}

function renderStarships(starships) {
    const char_html = starships.map((s) => {
        return `<li><a href="/starships.html?id=${s.id}">${s.name}</a></li>`;
      });
    
      document.querySelector("#film_starships_list").innerHTML = char_html.join("");
}

function renderVehicles(vehicles) {
    const char_html = vehicles.map((s) => {
        return `<li><a href="/vehicles.html?id=${s.id}">${s.name}</a></li>`;
      });
    
      document.querySelector("#film_vehicles_list").innerHTML = char_html.join("");
}

loadFilm(id);
