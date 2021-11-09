
import PokemonContextActions from "./actions";

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case PokemonContextActions.setPokemonList:
      return {
        ...state,
        pokemonList: [...action.pokemonList]
      };
    case PokemonContextActions.setFoundPokemon:
      return {
        ...state,
        foundPokemon: [...action.foundPokemon]
      };
    case PokemonContextActions.setBoxPokemon:
      return {
        ...state,
        boxPokemon: [...state.boxPokemon, action.newPokemon]
      };
    case PokemonContextActions.setSelectedPokemon:
      return {
        ...state,
        selectedPokemon: { ...action.selectedPokemon },
      };
    case PokemonContextActions.setLoading:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return { ...state };
  }
};

export default pokemonReducer;
