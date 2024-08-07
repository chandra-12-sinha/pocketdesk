import React from 'react'
import Search from '../Search/Search'
import PokemonLIst from '../PokemonLIst/PokemonLIst'
import "./Pokedex.css"

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
     
      <Search/>
      <PokemonLIst/>
    </div>
  )
}

export default Pokedex
