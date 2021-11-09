import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { PokemonContext } from '../context/context';
import PokemonDetails from './Details';
import detailsImg from '../images/details.PNG'
import catchImg from '../images/catch.PNG'
import releaseImg from '../images/release.PNG'
import PokemonContextActions from '../context/actions';

function GeneralInfo(props) {

    const { state: { selectedPokemon, boxPokemon }, dispatch } = useContext(PokemonContext);
    const [openModal, setOpenModal] = useState(false);

    const onOpenModal = () => setOpenModal(true);

    const onCloseModal = () => setOpenModal(false);

    const onCatch = () => {
        if (!boxPokemon.find(p => p.id === selectedPokemon.id)) {
            const newPokemon = { ...selectedPokemon, position: boxPokemon.length }
            dispatch({ type: PokemonContextActions.setBoxPokemon, newPokemon });
        }
    }

    const onRelease = () => {
        dispatch({ type: PokemonContextActions.removePokemonFromBox });
    }

    const getCatchButton = () => {
        return props.isBox ?
            <>
                <button className='pokeButton' onClick={onRelease}><img src={releaseImg} /></button>
                <span className='lbl-button'>RELEASE</span>
            </>
            :
            <>
                <button className='pokeButton' onClick={onCatch}><img src={catchImg} /></button>
                <span className='lbl-button'>CATCH</span>
            </>
    }

    return (
        <>
            {
                selectedPokemon.name &&
                <Paper sx={{ p: 1 }}>
                    <Grid container>
                        <Grid item container xs={9} direction='column' alignItems='center'>
                            <Grid item>
                                <h1>{selectedPokemon.name}</h1>
                            </Grid>
                            <Grid item>
                                <img alt='pokemon' src={selectedPokemon.sprites.front_default} height={200} width={200} />
                            </Grid>
                        </Grid>
                        <Grid item container xs={3} direction="row" alignItems='flex-end'>
                            <Grid item xs={6} className='center-text'>
                                {getCatchButton()}
                            </Grid>
                            <Grid item xs={6} className='center-text' >
                                <button className='pokeButton' onClick={onOpenModal}><img src={detailsImg} /></button>
                                <span className='lbl-button'>DETAILS</span>
                                <PokemonDetails open={openModal} onClose={onCloseModal} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            }
        </>
    )
}

export default GeneralInfo;