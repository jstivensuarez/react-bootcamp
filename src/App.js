import './App.css';
import React from 'react';
import PokemonProvider from './context/privider';
import Pokedex from './components/Pokedex';
import PokemonBox from './components/PokemonBox';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <PokemonProvider>
      <Router>
        <Routes>
            <Route exact path='/' element={<Pokedex/>} />
            <Route exact path='/box' element={<PokemonBox/>} />
            <Route exact path='/*' element={<Pokedex />} />
        </Routes>
      </Router>
    </PokemonProvider>
  );
}

export default App;
