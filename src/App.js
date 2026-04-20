import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import MovieDetails from './components/MovieDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/top-rated" component={TopRated} />
    <Route path="/upcoming" component={UpComing} />
    <Route path="/movie/:id" component={MovieDetails} />
  </Switch>
)
export default App
