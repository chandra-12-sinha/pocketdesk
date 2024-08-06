
import { Route, Routes } from 'react-router-dom'
import PokemonReport from '../PokemonReport/PokemonReport'
import Pokedex from '../Pokedex/Pokedex'

const CustomRouter = () => {
  return (
   <Routes>
    <Route path = "/" element = {<Pokedex/>}/>
    <Route path = "/pokemon/:id" element={<PokemonReport/>}/>
   </Routes>
  )
}

export default CustomRouter
