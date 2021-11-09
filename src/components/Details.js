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
import PokemonButtons from './PokemonButtons';

function PokemonDetails(props) {

    const { state: { foundPokemon, selectedPokemon }, dispatch } = useContext(PokemonContext);
    const [showFrontImg, setShowFront] = useState(true);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 450,
        bgcolor: 'background.paper',
        border: '1px solid #000'
    };

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
        <Modal {...props} >
            <Box sx={{ ...style }}>
                <Grid container direction='column'>
                    <Grid item xs={12} className='center-text'>
                        <h2 className='pokemon-title'>{selectedPokemon.id} - {selectedPokemon.name}</h2>
                    </Grid>
                    <Grid item container xs={12} direction='row'>
                        <Grid item container xs={8} >
                            <Grid item container xs={12} alignItems='center'>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={previousPokemon} color='primary'>
                                        <BackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={8}>
                                    {
                                        <img alt='pokemon' src={showFrontImg ?
                                            selectedPokemon.sprites.front_default
                                            : selectedPokemon.sprites.back_default
                                        } height={200} width={200} />
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={nextPokemon} color='primary'>
                                        <ForwardIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <div style={{ textAlign: 'center' }}>
                                    <IconButton
                                        onClick={() => setShowFront(!showFrontImg)} color='primary'>
                                        <SyncIcon />
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <ul style={{ height: '250px', overflow: 'scroll', overflowX: 'hidden' }}>
                                {
                                    selectedPokemon.moves.map((m, index) =>
                                        <li key={index}>{m.move.name}</li>
                                    )
                                }
                            </ul>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid item xs={8} className='center-text'>
                            <h3 className='pokemon-type blue-color'>
                                {
                                    selectedPokemon.types
                                    .map((t, index) => t.type.name)
                                    .join(' - ')
                                }

                            </h3>
                        </Grid>
                        <Grid item xs={4}>
                            <PokemonButtons {...props} />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default PokemonDetails;