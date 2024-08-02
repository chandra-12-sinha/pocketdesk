import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonLIst.css";
import Pokemon from "../PokemonDetails/Pokemon";

const PokemonLIst = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon/";

  async function downloadpokemon() {
    let response = await axios.get(POKEDEX_URL); /// 20 pokemon list 

    console.log(response);
    const pokemonResults = response.data.results; //we get the array of pokemons from result
    console.log(pokemonResults);
    /*
            iterating over the array of pokemons, and using their url, to create an array of promises
            that will download those 20 pokemons.  
        */
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    console.log(pokemonResultsPromise);
    const pokemonData = await axios.all(pokemonResultsPromise);//// array of 20 pokemon detailed data
   console.log(pokemonData);
    // const result = pokemonData.map((pokeData) => {
        // now iterate on the data of each pokemon, and extract id, name, image and types.
     const pokemonListResult = pokemonData.map((pokeData) =>{
      const pokemon = pokeData.data;
      console.log(pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
     })
       
    
   console.log(pokemonListResult);
   setPokemonList(pokemonListResult)
   setIsLoading(false);
  }
  useEffect(() => {
    downloadpokemon();
  }, []);
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {(isLoading)? "Loading...": pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} key = {p.id}/>
        )}
      </div>
      <div className="controls">
        <button>Prev</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default PokemonLIst;
