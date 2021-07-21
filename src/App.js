import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ArtistPage from './pages/ArtistPage/ArtistPage';
import AlbumPage from './pages/AlbumPage/AlbumPage';
import React, { useState, useEffect, useContext } from 'react'
import NavBar from './components/NavBar/NavBar';
import SearchPage from './pages/SearchPage/SearchPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faSearch, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import FavoritePage from './pages/FavoritePage/FavoritePage';
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
crossorigin="anonymous"></link>

library.add(fab, faHeart, faSearch, faHeartBroken)

function App() {

  return (
      <Router>
        <Switch>
            <Route path="/album/:id">
              <NavBar/>
              <AlbumPage/>
            </Route>

            <Route path="/artist">
              <NavBar/>
              <ArtistPage/>
            </Route>

            <Route path="/favorites">
              <NavBar/>
              <FavoritePage/>
            </Route>

            <Route path="/search">
              <NavBar/>
              <SearchPage/>
            </Route>

            <Route path="/">
              <NavBar/>
              <SearchPage/>
            </Route>

        </Switch>
      </Router>
  );
}

export default App;
