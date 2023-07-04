"use strict";
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png
//  https://pokeapi.co/api/v2/pokemon/1
const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector("input");

const pokemonCount = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const initPokemon = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();
    console.log(data);
    createPokemon(data);
  }
};

const createPokemon = async (pokemon) => {
  const id = pokemon.id.toString().padStart(3, "0");
  const name = pokemon.name.toUpperCase();
  const weight = pokemon.weight;
  const type = pokemon.types[0].type.name.toLowerCase();

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokebox");
  pokemonEl.style.backgroundColor = colors[type];

  console.log(pokemon.id);

  const html = `
  <div class="pokebox_image-container">
  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
    alt=""
  />
  </div>
  <p class="poke-id">#${id}</p>
  <h3 class="poke-name">${name}</h3>
  <p class="poke-weight">Weight: ${weight}kg</p>
  <p class="poke-type">Type: ${type}</p>
  `;

  pokemonEl.innerHTML = html;
  pokeContainer.appendChild(pokemonEl);
};

search.addEventListener("input", function (event) {
  const pokeNames = document.querySelectorAll(".poke-name");
  const input = search.value.toLowerCase();

  pokeNames.forEach((pokeName) => {
    pokeName.parentElement.style.display = "block";

    if (!pokeName.innerHTML.toLowerCase().includes(input)) {
      pokeName.parentElement.style.display = "none";
    }
  });
});

initPokemon();
