let planet_nameH1;
let planet_climateSpan;
let planet_diameterSpan;
let planet_populationSpan;
let planet_filmsUl;
let planet_charactersUl;

const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    planet_nameH1 = document.querySelector('h1#planet_name');
    planet_climateSpan = document.querySelector('span#planet_climate');
    planet_diameterSpan = document.querySelector('span#planet_diameter');
    planet_populationSpan = document.querySelector('span#planet_population');
    planet_filmsUl = document.querySelector('#planet_films>ul');
    planet_charactersUl = document.querySelector('#planet_characters>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
});

async function getPlanet(id) {
    let planet_details;
    try {
        planet_details = await fetchPlanet(id);
        planet_details.films = await fetchFilms(planet_details.id);
        planet_details.characters = await fetchCharacters(planet_details.id);
    } catch (e) {
        console.error(`Error reading character ${id} data.`, e.message);
    }
    renderPlanet(planet_details);
}

async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`
    return await fetch(planetUrl)
        .then(res => res.json())
}

async function fetchFilms(id) {
    let filmUrl = `${baseUrl}/planets/${id}/films`;
    return await fetch(filmUrl).then(res => res.json());
}

async function fetchCharacters(id) {
    let characterUrl = `${baseUrl}/planets/${id}/characters`;
    return await fetch(characterUrl).then(res => res.json());
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    planet_nameH1.textContent = planet?.name;
    planet_climateSpan.textContent = planet?.climate;
    planet_diameterSpan.textContent = planet?.diameter;
    planet_populationSpan.textContent = planet?.population;
    const characterLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`);
    planet_filmsUl.innerHTML = filmsLis.join("");
    planet_charactersUl.innerHTML = characterLis.join("");
}