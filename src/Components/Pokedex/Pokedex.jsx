import React from 'react'
import Search from '../Search/Search'
import PokemonLIst from '../PokemonLIst/PokemonLIst'

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
      <h1 className='name'>Pokedex</h1>
      <Search/>
      <PokemonLIst/>
    </div>
  )
}

export default Pokedex
