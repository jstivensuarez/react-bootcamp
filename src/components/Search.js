import React, { useContext, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { PokemonContext } from '../context/context';
import eventBus from '../eventBus';
import { TextField } from '@mui/material';
import searchImg from '../images/search.PNG'
import changeImg from '../images/changeView.PNG'
import Grid from '@mui/material/Grid';
import PokemonContextActions from '../context/actions';
import { useNavigate } from "react-router-dom";

function Search(props) {

    const { state: { pokemonList, boxPokemon }, dispatch } = useContext(PokemonContext);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const filterData = () => {
        let list = props.isBox ? boxPokemon : pokemonList;
        if (keyword !== '') {
            const results = pokemonList.filter((pokemon) =>
                pokemon.name.toLowerCase().startsWith(keyword.toLowerCase()));
            list = results.map((pokemon, index) => {
                return { ...pokemon, position: index }
            });
        }
        eventBus.dispatch("onFilter", list);
        dispatch({ type: PokemonContextActions.setFoundPokemon, foundPokemon: list });
    };

    const changeView = () => {
        navigate(props.returnPath)
    }

    return (
        <>
            <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                <Grid container>
                    <Grid item xs={10}>
                        <TextField fullWidth type="search" onChange={(e) => setKeyword(e.target.value)} />
                    </Grid>
                    <Grid item container xs={2} >
                        <Grid item xs={6}>
                            <button className="pokeButton" onClick={filterData}><img alt='search' src={searchImg} /></button>
                        </Grid>
                        <Grid item xs={6}>
                            <button className="pokeButton" onClick={changeView}><img alt='change view' src={changeImg} /></button>
                        </Grid>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}

export default Search;