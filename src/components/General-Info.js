import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { PokemonContext } from '../context/context';
import PokemonDetails from './Details';
import detailsImg from '../images/details.PNG'
import catchImg from '../images/catch.PNG'
import releaseImg from '../images/release.PNG'
import PokemonContextActions from '../context/actions';
import PokemonButtons from './PokemonButtons';
import eventBus from '../eventBus';
import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBack';
import ForwardIcon from '@mui/icons-material/ArrowForward';

function GeneralInfo(props) {

    const { state: { selectedPokemon, boxPokemon, foundPokemon }, dispatch } = useContext(PokemonContext);
    const [openModal, setOpenModal] = useState(false);

    const onOpenModal = () => setOpenModal(true);

    const onCloseModal = () => setOpenModal(false);

    const nextPokemon = () => {
        let position = selectedPokemon.position + 1;
        if (position > (foundPokemon.length - 1)) {
            position = 0;
        }
        eventBus.dispatch("onChangePosition", foundPokemon[position]);
    }

    const previousPokemon = () => {
        let position = selectedPokemon.position - 1;
        if (position < 0) {
            position = foundPokemon.length - 1;
        }
        eventBus.dispatch("onChangePosition", foundPokemon[position]);
    }


    return (
        <>
            {
                selectedPokemon.name &&
                <Paper sx={{ p: 1 }}>
                    <Grid container>
                        <Grid item container xs={10} direction='column' alignItems='center'>
                            <Grid item>
                                <h1>{selectedPokemon.name}</h1>
                            </Grid>
                            <Grid item container alignItems='center' direction='row'>
                                <Grid item xs={3}  className='center-element'>
                                    <IconButton
                                        onClick={previousPokemon} color='primary'>
                                        <BackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={6}  className='center-element'>
                                    <img alt='pokemon' src={selectedPokemon.sprites.front_default} height={'200px'} width={'200px'} />
                                </Grid>
                                <Grid item xs={3}>
                                    <IconButton
                                        onClick={nextPokemon} color='primary'>
                                        <ForwardIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={2} direction="row" alignItems='flex-end'>
                            <Grid item xs={6} className='center-text'>
                                <PokemonButtons {...props} />
                            </Grid>
                            <Grid item xs={6} className='center-text' >
                                <button className='pokeButton' onClick={onOpenModal}><img src={detailsImg} /></button>
                                <p className='lbl-button'>DETAILS</p>
                                <PokemonDetails open={openModal} onClose={onCloseModal} {...props} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            }
        </>
    )
}

export default GeneralInfo;