import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { PokemonContext } from '../context/context';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import SyncIcon from '@mui/icons-material/Sync';
import BackIcon from '@mui/icons-material/ArrowBack';
import ForwardIcon from '@mui/icons-material/ArrowForward';
import eventBus from '../eventBus';
import PokemonContextActions from '../context/actions';

function PokemonDetails(props) {

    const { state: { foundPokemon, selectedPokemon }, dispatch } = useContext(PokemonContext);
    const [showFrontImg, setShowFront] = useState(true);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000'
    };

    const nextPokemon = () => {
        let position = selectedPokemon.position + 1;
        if (position > (foundPokemon.length - 1)) {
            position = 0;
        }
        updateSelectedPokemon(position)
    }

    const previousPokemon = () => {
        let position = selectedPokemon.position - 1;
        if (position < 0) {
            position = foundPokemon.length - 1;
        }
        updateSelectedPokemon(position);
    }

    const updateSelectedPokemon = (position) => {
        if (foundPokemon[position].id) {
            dispatch({ type: PokemonContextActions.setSelectedPokemon, selectedPokemon: foundPokemon[position] });
        } else {
            eventBus.dispatch("onChangePosition", foundPokemon[position]);
        }
    }

    return (
        <Modal {...props} >
            <Box sx={{ ...style }}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <h2>{selectedPokemon.name}</h2>
                    </Grid>
                    <Grid item container xs={12} direction="row">
                        <Grid item container xs={7}>
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={previousPokemon} color="primary">
                                        <BackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={8}>
                                    {
                                        <img alt="pokemon" src={showFrontImg ?
                                            selectedPokemon.sprites.front_default
                                            : selectedPokemon.sprites.back_default
                                        } height={200} width={200} />
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={nextPokemon} color="primary">
                                        <ForwardIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <div style={{ textAlign: 'center' }}>
                                    <IconButton
                                        onClick={() => setShowFront(!showFrontImg)} color="primary">
                                        <SyncIcon />
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <ul style={{ height: '250px', overflow: 'scroll', overflowX: 'hidden' }}>
                                {
                                    selectedPokemon.moves.map((m, index) =>
                                        <li key={index}>{m.move.name}</li>
                                    )
                                }
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default PokemonDetails;