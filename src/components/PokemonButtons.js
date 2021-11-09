import React, { useState, useContext } from 'react';
import { PokemonContext } from '../context/context';
import catchImg from '../images/catch.PNG'
import releaseImg from '../images/release.PNG'
import PokemonContextActions from '../context/actions';

function PokemonButtons(props) {

    const { state: { selectedPokemon, boxPokemon }, dispatch } = useContext(PokemonContext);

    const onCatch = () => {
        if (!boxPokemon.find(p => p.id === selectedPokemon.id)) {
            const newPokemon = { ...selectedPokemon, position: boxPokemon.length }
            dispatch({ type: PokemonContextActions.setBoxPokemon, newPokemon });
        }
    }

    const onRelease = () => dispatch({ type: PokemonContextActions.removePokemonFromBox });

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