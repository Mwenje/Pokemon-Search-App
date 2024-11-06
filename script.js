const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const errorMessage = document.getElementById("error-message");

const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");

const height = document.getElementById("height");
const weight = document.getElementById("weight");

const imgCardContainer = document.getElementById("img-card");

const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokemonUrlEndpoint =
  "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.trim().toLowerCase();

    if (pokemonNameOrId === "") {
      errorMessage.textContent = `Input is empty or contains only spaces.`;
      return;
    }

    errorMessage.textContent = "";

    const response = await fetch(`${pokemonUrlEndpoint}${pokemonNameOrId}`);

    const data = await response.json();

    console.log(data);

    //pokemon info
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    imgCardContainer.innerHTML = `
      <img id="pokemon-img" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;

    //pokemon stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    //pokemon types

    types.innerHTML = data.types
      .map(
        (type) =>
          `<span class="type ${type.type.name}">${type.type.name}</span>`
      )
      .join("");
  } catch (error) {
    resetDisplay();
    // alert("Pokémon not found");
    errorMessage.textContent = `Pokémon not found: ${error}`;
    // console.log(`Pokémon not found: ${err}`);
  }
};

const resetDisplay = () => {
  const imgCardContainer = document.getElementById("img-card");

  if (imgCardContainer) imgCardContainer.remove();

  pokemonName.textContent = "";
  pokemonID.textContent = "";
  types.innerHTML = "";
  height.textContent = "";
  weight.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getPokemon();
});
