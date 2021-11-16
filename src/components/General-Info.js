import React, { useEffect, useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { PokemonContext } from '../context/context';
import PokemonDetails from './Details';
import detailsImg from '../images/details.PNG'
import PokemonButtons from './PokemonButtons';
import eventBus from '../eventBus';
import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBack';
import ForwardIcon from '@mui/icons-material/ArrowForward';
import typeColors from '../typeColors';

function GeneralInfo(props) {

    const { state: { selectedPokemon, boxPokemon, foundPokemon }} = useContext(PokemonContext);
    const [openModal, setOpenModal] = useState(false);
    const [border, setBorder] = useState('1px solid black');
    const [titleStyle, setTitleStyle] = useState({
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '10px',
        padding: '5px'
    });

    useEffect(() => {
        getBorderColor();
    }, [boxPokemon]);

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

    const getBorderColor = () => {
        if (props.isBox) {
            const types = boxPokemon.map(p => p.types[0].type.name);
            const color = mode(types);
            if (color) {
                const newBorder = '5px solid ' + typeColors[color];
                setBorder(newBorder);
                setTitleStyle({ ...titleStyle, backgroundColor: typeColors[color], color: 'white' });
            }
        }
    }

    const mode = (array) => {
        if (array.length === 0)
            return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for (var i = 0; i < array.length; i++) {
            var el = array[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

    const paperStyle = {
        border: border,
    }

    return (
        <>
            {
                selectedPokemon.name &&
                <Paper sx={{ p: 1 }} style={paperStyle}>
                    <Grid container>
                        <Grid item container xs={10} direction='column' alignItems='center'>
                            <Grid item>
                                <h1 style={titleStyle}>{selectedPokemon.name}</h1>
                            </Grid>
                            <Grid item container alignItems='center' direction='row'>
                                <Grid item xs={3} className='center-element'>
                                    <IconButton
                                        onClick={previousPokemon} color='primary'>
                                        <BackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={6} className='center-element'>
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
                                <button className='pokeButton' onClick={onOpenModal}><img src={detailsImg} alt='details button'/></button>
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