import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./PokemonLIst.css"

const PokemonLIst = () => {

  const[pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    async function downloadpokemon(){
        let response = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
        
        console.log(response);
        const pokemonResults = response.data.results;
        console.log(pokemonResults);
        const pokemonResultsPromise = pokemonResults.map((pokemon)=>
          axios.get(pokemon.url))
        console.log(pokemonResultsPromise);
        const pokemonData = await axios.all(pokemonResultsPromise)
        console.log(pokemonData);
        const result = pokemonData.map((pokeData)=>{
          const pokemon = pokeData.data;
          console.log(pokemon);
          return{
            name : pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            types: pokemon.types
          }
          
        });
        console.log(result);
        setPokemonList(result);
        setIsLoading(false);
      }
    useEffect(()=>{
        downloadpokemon();
    },[])
  return (
    <div className='pokemon-list-wrapper'>
      
      <div>Pokemon List</div>
      {(isLoading)? 'Loading..': 'Data downloaded'}
    </div>
  )
}

export default PokemonLIst
