import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonLIst.css";
import Pokemon from "../PokemonDetails/Pokemon";

const PokemonLIst = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nexUrl, setNexUrl] = useState("");
  const[prevUrl, setPrevUrl] = useState('');

  async function downloadpokemon() {
    setIsLoading(true)
    const response = await axios.get(pokedexUrl)// 20pokemon list
    console.log(response);
    const pokemonResults = response.data.results; //we get the array of pokemons from result
   console.log(response.data);
   setNexUrl(response.data.next)
   setPrevUrl(response.data.previous);
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
  }, [pokedexUrl]);
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {(isLoading)? "Loading...": pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} key = {p.id}/>
        )}
      </div>
      <div className="controls">
        <button disabled={prevUrl == null} onClick={()=> setPokedexUrl(prevUrl)}>Prev</button>
        <button disabled= {nexUrl == null} onClick={()=>setPokedexUrl(nexUrl)}>Next</button>
      </div>
    </div>
  );
};

export default PokemonLIst;
