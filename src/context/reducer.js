
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
    case PokemonContextActions.removePokemonFromBox:
      const newList = state.boxPokemon.filter(p => p.name !== state.selectedPokemon.name)
        .map((pokemon, index) => {
          return { ...pokemon, position: index }
        });
      return {
        ...state,
        boxPokemon: newList,
        foundPokemon: newList,
        selectedPokemon: newList[0] ? newList[0] : {}
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
