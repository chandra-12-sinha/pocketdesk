import axios from 'axios'
import React, { useEffect } from 'react'

const PokemonLIst = () => {
    async function downloadpokemon(){
        let response = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
        console.log(response);
    }
    useEffect(()=>{
        downloadpokemon();
    },[])
  return (
    <div className='pokemon-list-wrapper'>
      PokemonLIst
    </div>
  )
}

export default PokemonLIst
