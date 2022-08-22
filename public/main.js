const P = new Pokedex.Pokedex()

window.onload = async () => {
  const html = document.querySelector('.wrapper')

  const getPokemons = await P.getPokemons()
  const pokemons = getPokemons.results

  const filterPokemons = pokemons.filter((_, index) => index < 50)

  const responsePokemons = await Promise.all(Array.from(filterPokemons, async(data) => {
    const pokemon = await P.getPokemonByName(data.name)
    console.log (pokemon)
     
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.home.front_default
    }
  }))

  html.innerHTML = responsePokemons.map((pokemon) => {
    // console.log(pokemon)
    return `
      <div class="card" data-id="${pokemon.id}">
        <img src="${pokemon.image}" width="50" height="50" />
        <span>${pokemon.name}</span>
      </div>
    `
  }).join('\n')

  // NOTE: Evento para abrir o modal ao clicar no card
  const cardAll = document.querySelectorAll(".card")
  cardAll.forEach(function(abobrinha) {
    abobrinha.addEventListener('click', function() {
      const modal = document.querySelector(".modal")
      modal.classList.remove('modal--close')
      modal.classList.add('modal--open')

      const useId = parseFloat(this.dataset.id)
      const pokemon = responsePokemons.find((data) => data.id === useId)
      const modal__content = document.querySelector('.modal__content')
      console.log(pokemon)

      modal__content.innerHTML = `
        <div class"pokemon">
          <div class="pokemon__head">
            <button class="pokemon__back" type="button">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <span>#${pokemon.id}</span>
          </div>

          <div class="pokemon__main">
            <div class="pokemon__imagem">
              <img class="pokemon__imagem" src="${pokemon.image}" height="300" />
            </div>
            <div class=""pokemon__info>
              <span>${pokemon.name}</span>
            </div>

          </div>
        </div>
        
      `
      // eventos
      const pokemon__back = document.querySelector(".pokemon__back")
    pokemon__back.addEventListener('click', function() {
      modal.classList.remove('modal--open')
      modal.classList.add('modal--close')
    })

      
    })
  })

  // ELEMENTO .ADD_EVENTO('EVENTO DE CLICK', () => {

  //   // meu codigo
  // })

  // NOTE: Fecha todos os modal
  const modal__close = document.querySelector('.modal__close')
  modal__close.addEventListener('click', function() {
    const modal = document.querySelector(".modal")
    modal.classList.remove('modal--open')
    modal.classList.add('modal--close')
  })
}
