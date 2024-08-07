
import CustomRouter from './Components/router/CustomRouter'
import { Link } from 'react-router-dom'
import "./App.css"

const App = () => {
  return (
    <div className='outer-pokemon'> 
      <h1 id='pokedex-heading'>
        <Link className="pokedex-heading" to="/">Pokedex</Link>
    </h1>
      <CustomRouter/>
    </div>
  )
}

export default App
