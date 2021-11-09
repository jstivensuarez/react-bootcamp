import { createContext } from "react";

const initialState = {
    pokemonList: [],
    foundPokemon: [],
    boxPokemon: [],
    selectedPokemon: {},
    loading: false,
};

const PokemonContext = createContext(initialState);

export {
    PokemonContext,
    initialState
};
