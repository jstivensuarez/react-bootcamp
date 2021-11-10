import React, { useState, useContext } from 'react';
import { PokemonContext } from '../context/context';
import catchImg from '../images/catch.PNG'
import releaseImg from '../images/release.PNG'
import PokemonContextActions from '../context/actions';
import eventBus from '../eventBus';

function PokemonButtons(props) {

    const { state: { selectedPokemon, boxPokemon }, dispatch } = useContext(PokemonContext);

    const onCatch = () => {
        if (!boxPokemon.find(p => p.id === selectedPokemon.id)) {
            const newPokemon = { ...selectedPokemon, position: boxPokemon.length }
            dispatch({ type: PokemonContextActions.setBoxPokemon, newPokemon });
            eventBus.dispatch('showMessage', { message: `¡${newPokemon.name} is your new pokemon!` });
        } else {
            eventBus.dispatch('showMessage', { message: `You already have ${selectedPokemon.name}...`, type: 'warning' });
        }
    }

    const onRelease = () => {
        const pokemonName = selectedPokemon.name;
        dispatch({ type: PokemonContextActions.removePokemonFromBox });
        eventBus.dispatch('showMessage', { message: `¡${pokemonName} was released!` });
    }

    return (
        <>
            {
                props.isBox ?
                    <>
                        <div className='center-text'>
                            <button className='pokeButton' onClick={onRelease}><img src={releaseImg} /></button>
                            <p className='lbl-button'>RELEASE</p>
                        </div>
                    </>
                    :
                    <>
                        <div className='center-text'>
                            <button className='pokeButton' onClick={onCatch}><img src={catchImg} /></button>
                            <p className='lbl-button'>CATCH</p>
                        </div>
                    </>
            }
        </>
    )
}

export default PokemonButtons;