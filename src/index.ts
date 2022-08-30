// const P = new Pokedex.Pokedex()
import PokeAPI from 'pokeapi-typescript'

const P = PokeAPI.Pokemon

// const capitalizeFirstLetter = (value: string) => {
//   return value.charAt(0).toUpperCase() + value.slice(1)
// }

window.onload = async () => {
  const html = document.querySelector('.wrapper')

  const getPokemons = await P.listAll()
  const pokemons = getPokemons.results
  const filterPokemons = pokemons.filter((_, index) => index < 50)

  const responsePokemons = await Promise.all(
    filterPokemons.map(async (pokemon) => {
      const result = await PokeAPI.Pokemon.fetch(pokemon.name)

      return {
        id: result.id,
        name: result.name,
        image: result.sprites.front_default,
        type: result.types.map(({ type }) => type.name)
      }
    })
  )
  const cardsHtml = responsePokemons.map(
    (pokemon) => `
    <div class="card" data-id="${pokemon.id}">
      <img src="${pokemon.image}" width="50" height="50" />
      <span>${pokemon.name}</span>
    </div>
  `
  )

  if (html) html.innerHTML = cardsHtml.join('\n')
  // NOTE: Evento para abrir o modal ao clicar no card
  // const cardAll = document.querySelectorAll('.card')
  // cardAll.forEach(function (abobrinha) {
  //   abobrinha.addEventListener('click', function () {
  //     const modal = document.querySelector('.modal')
  //     modal!.classList.remove('modal--close')
  //     modal?.classList.add('modal--open')
  //     const useId = parseFloat(this.dataset.id)
  //     const pokemon = responsePokemons.find((data) => data.id === useId)
  //     const modal__content = document.querySelector('.modal__content')
  //     if (modal__content) {
  //       modal__content.innerHTML = `
  //       <div class="pokemon">
  //         <div class="pokemon__head">
  //           <button class="pokemon__back" type="button">
  //             <ion-icon name="chevron-back-outline"></ion-icon>
  //           </button>
  //           <span class="pokemon__id">#${pokemon.id}</span>
  //         </div>
  //         <div class="pokemon__main">
  //           <div class="pokemon__imagem">
  //             <div class="pokemon__blur" style="background-image: url(${
  //               pokemon.image
  //             });"></div>
  //             <img class="pokemon__imagem" src="${
  //               pokemon.image
  //             }" height="300" />
  //           </div>
  //           <div class="pokemon__info">
  //             <span class="pokemon__name">${pokemon.name}</span>
  //             <div class="pokemon__types">
  //               ${pokemon.type
  //                 .map(
  //                   (type) => `
  //                 <p class="pokemon__typeName pokemon__typeName--${type}">
  //                   ${capitalizeFirstLetter(type)}
  //                 </p>
  //               `
  //                 )
  //                 .join('\n')}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     `
  //     }
  //     // eventos
  //     const pokemon__back = document.querySelector('.pokemon__back')
  //     pokemon__back.addEventListener('click', function () {
  //       modal.classList.remove('modal--open')
  //       modal.classList.add('modal--close')
  //     })
  //   })
  // })
  // ELEMENTO .ADD_EVENTO('EVENTO DE CLICK', () => {
  //   // meu codigo
  // })
  // NOTE: Fecha todos os modal
  // const modal__close = document.querySelector('.modal__close')
  // modal__close.addEventListener('click', function () {
  //   const modal = document.querySelector('.modal')
  //   modal.classList.remove('modal--open')
  //   modal.classList.add('modal--close')
  // })
}
