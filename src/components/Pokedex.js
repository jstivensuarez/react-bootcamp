import Grid from '@mui/material/Grid';
import PokemonList from './PokemonList';
import GeneralInfo from './General-Info';
import Search from './Search';
import React, { useContext } from 'react';
import { PokemonContext } from '../context/context';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Pokedex = () => {

    const { state: { loading } } = useContext(PokemonContext);

    return (
        <>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid item spacing={2} container>
                        <Grid item container>
                            <Search returnPath='/box'/>
                        </Grid>
                        <Grid item spacing={2} container>
                            <Grid item xs={4}>
                                <PokemonList />
                            </Grid>
                            <Grid item xs={8}>
                                <GeneralInfo />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
                        open={loading}>
                        <CircularProgress color='inherit' />
                    </Backdrop>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </>
    );
}

export default Pokedex;
