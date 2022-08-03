const P = new Pokedex.Pokedex()

window.onload = async () => {
  const html = document.querySelector('.wrapper')

  const getPokemons = await P.getPokemons()
  const pokemons = getPokemons.results
  const filterPokemons = pokemons.filter((_, index) => index < 50)

  const responsePokemons = await Promise.all(Array.from(filterPokemons, async(data) => {
    const pokemon = await P.getPokemonByName(data.name)
    return {
      name: pokemon.name,
      image: pokemon.sprites.other.home.front_default
    }
  }))

  console.log(responsePokemons)

  html.innerHTML = responsePokemons.map((pokemon) => `
    <div class="card">
      <img src="${pokemon.image}" width="50" height="50" />
      <span>${pokemon.name}</span>
    </div>
  `).join('\n')

}
