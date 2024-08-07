
import CustomRouter from './Components/router/CustomRouter'
import { Link } from 'react-router-dom'
import "./App.css"

const App = () => {
  return (
    <div>
      <h1 id='pokedex-heading'>
        <Link className="pokedex-heading" to="/"></Link>
    </h1>
      <CustomRouter/>
    </div>
  )
}

export default App
