import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonLIst.css";
import Pokemon from "../PokemonDetails/Pokemon";

const PokemonLIst = () => {
  //const [pokemonList, setPokemonList] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  //const[pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
 // const [nexUrl, setNexUrl] = useState("");
  //const[prevUrl, setPrevUrl] = useState('');
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList:[],
    isLoading : true,
    pokedexUrl : "https://pokeapi.co/api/v2/pokemon/",
    nexUrl : "",
    prevUrl : ""
  })
  async function downloadpokemon() {
   
  setPokemonListState((state)=>({...state, isLoading: true}))
    
  const response = await axios.get(pokemonListState.pokedexUrl); // This downloads list of 20 pokemon. 
    const pokemonResults = response.data.results; //we get the array of pokemons from result
    //console.log(response.data);
   //setNexUrl(response.data.next)
   //setPrevUrl(response.data.previous);
    //console.log(pokemonResults);
    /*
            iterating over the array of pokemons, and using their url, to create an array of promises
            that will download those 20 pokemons.  
        */
       setPokemonListState((state)=>({
        ...state,
        nexUrl:response.data.next,
        prevUrl:response.data.previous
       }))
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
   // console.log(pokemonResultsPromise);  
    const pokemonData = await axios.all(pokemonResultsPromise);//// array of 20 pokemon detailed data
   //console.log(pokemonData);
  
        // now iterate on the data of each pokemon, and extract id, name, image and types.
     const pokemonListResult = pokemonData.map((pokeData) =>{
      const pokemon = pokeData.data;
      //console.log(pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
     })
       
    
  // console.log(pokemonListResult);
  // setPokemonList(pokemonListResult)
  setPokemonListState((state)=>({
    ...state,
    pokemonList:pokemonListResult,
    isLoading:false
  }))
  //  setIsLoading(false);
  }
  useEffect(() => {
    downloadpokemon();
  }, [pokemonListState.pokedexUrl]);
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {(pokemonListState.isLoading)? "Loading...": pokemonListState.pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} id ={p.id} key = {p.id}/>
        )}
      </div>
      <div className="controls">
      {/* <button disabled={prevUrl == null} onClick={()=> setPokedexUrl(prevUrl)}>Prev</button>
       <button disabled= {nexUrl == null} onClick={()=>setPokedexUrl(nexUrl)}>Next</button> */}
      
      <button disabled={pokemonListState.prevUrl == null} onClick={()=> setPokemonListState({...pokemonListState, pokedexUrl:pokemonListState.prevUrl})}> Prev </button>
      <button disabled={pokemonListState.nexUrl == null} onClick={()=> setPokemonListState({...pokemonListState, pokedexUrl:pokemonListState.nexUrl})}> Next </button>
      
      </div>
    </div>
  );
};

export default PokemonLIst;
