import React, { useEffect, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { PokemonContext } from '../context/context';
import PokemonContextActions from '../context/actions';
import eventBus from '../eventBus';

function PokemonList(props) {

    const { state: { loading, foundPokemon, selectedPokemon, boxPokemon }, dispatch } = useContext(PokemonContext);

    useEffect(() => {
        eventBus.on("onFilter", (foundList) => onFilterPokemon(foundList));
        eventBus.on("onChangePosition", (pokemon) => getSelectedPokemonInfo(pokemon));
        getPokemonList();
        return () => {
            eventBus.remove("onFilter");
            eventBus.remove("onChangePosition");
        }
    }, []);

    const getPokemonList = async () => {
        let list = [];
        if (props.isBox) {  
            list = [...boxPokemon];
            let pokemonInBox = list.length ?  list[0] : {};
            dispatch({ type: PokemonContextActions.setSelectedPokemon, selectedPokemon: pokemonInBox });
        } else {
            const { data: { results } } = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150');
            list = results.map((pokemon, index) => {
                return { ...pokemon, position: index }
            });

            dispatch({ type: PokemonContextActions.setPokemonList, pokemonList: list });
            getSelectedPokemonInfo(list[0]);
        }

        dispatch({ type: PokemonContextActions.setFoundPokemon, foundPokemon: list });
    }

    const getSelectedPokemonInfo = async (pokemon) => {
        if (pokemon.id) {
            dispatch({ type: PokemonContextActions.setSelectedPokemon, selectedPokemon: pokemon });
        } else {
            dispatch({ type: PokemonContextActions.setLoading, loading: true });
            const { data } = await axios.get(pokemon.url);
            dispatch({ type: PokemonContextActions.setSelectedPokemon, selectedPokemon: { ...data, position: pokemon.position } });
            dispatch({ type: PokemonContextActions.setLoading, loading: false });
        }
    }

    const onFilterPokemon = (foundList) => {
        if (foundList.length) {
            getSelectedPokemonInfo(foundList[0]);
        } else {
            dispatch({ type: PokemonContextActions.setSelectedPokemon, selectedPokemon: {} });
        }
    }

    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300
            }}>
            {
                (foundPokemon && foundPokemon.length) ? foundPokemon.map((pokemon, index) =>
                    <ListItem disablePadding key={index} onClick={() => getSelectedPokemonInfo(pokemon)}>
                        <ListItemButton>
                            <ListItemText primary={pokemon.name} />
                        </ListItemButton>
                    </ListItem>)
                    : !loading && <h1>¡No pokemon found!</h1>
            }
        </List>
    )
}

export default PokemonList;