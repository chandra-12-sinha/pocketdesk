
import Search from '../Search/Search'
import PokemonLIst from '../PokemonLIst/PokemonLIst'
import "./Pokedex.css"
import { useState } from 'react'

function Pokedex() {

  const [search, setSearch] = useState("");

  return (
    <div className='pokedex-wrapper'>
     
      <Search search={search} setSearch={setSearch}/>
      <PokemonLIst search={search}/>

    </div>
  )
}

export default Pokedex
