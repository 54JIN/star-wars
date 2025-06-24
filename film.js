let film;
let characters;
let planets;

const sp = new URLSearchParams(window.location.search);
const id = sp.get("id");

async function loadFilm(id) {
  // fetch the movie details
  try {
    film = await fetch(`http://localhost:9001/api/films/${id}`).then((res) =>
      res.json()
    );
    console.log(film);
    characters = await fetch(
      `http://localhost:9001/api/films/${id}/characters`
    ).then((res) => res.json());
    planets = await fetch(
      `http://localhost:9001/api/films/${id}/planets`
    ).then((res) => res.json());

  } catch (err) {
    console.error(`Error reading film ${id} data.`, err.message);
  }

  renderFilm({film, characters, planets});
}

function renderFilm({film, characters, planets}) {
    renderFilmDetails(film);
    renderCharacters(characters);
    renderPlanets(planets);
}

function renderFilmDetails(film) {
    document.querySelector("#film_name").textContent = film.title;
    document.querySelector("#film_release_date").textContent = film.release_date;
    document.querySelector("#film_director").textContent = film.director;
    document.querySelector("#film_episode_id").textContent = film.episode_id;
}

function renderCharacters(characters) {
    const char_html = characters.map((character) => {
        return `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`;
      });

    document.querySelector("#film_character_list").innerHTML = char_html.join("");
}

function renderPlanets(planets) {
    console.log(planets)
    const char_html = planets.map((planet) => {
        return `<li><a href="/planet.html?id=${planet.id}">${planet.name}</a></li>`;
      });

    document.querySelector("#film_planet_list").innerHTML = char_html.join("");
}

loadFilm(id);