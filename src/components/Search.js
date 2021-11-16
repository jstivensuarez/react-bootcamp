import React, { useContext, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { PokemonContext } from '../context/context';
import eventBus from '../eventBus';
import { TextField } from '@mui/material';
import searchImg from '../images/search.PNG'
import orderbyImg from '../images/orderBy.PNG'
import changeImg from '../images/changeView.PNG'
import Grid from '@mui/material/Grid';
import PokemonContextActions from '../context/actions';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

function Search(props) {

    const { state: { pokemonList, boxPokemon }, dispatch } = useContext(PokemonContext);
    const [keyword, setKeyword] = useState('');
    const [openMenu, setOpenMenu] = React.useState(false);
    const anchorRef = React.useRef(null);

    const navigate = useNavigate();

    const filterData = () => {
        let list = props.isBox ? boxPokemon : pokemonList;
        if (keyword) {
            list = list.reduce((filtered, pokemon) => {
                if (pokemon.name.toLowerCase().startsWith(keyword.toLowerCase())) {
                    filtered.push({ ...pokemon, position: filtered.length });
                }
                return filtered;
            }, []);
        }

        list = getListWithPosition(list);
        eventBus.dispatch('onFilter', list);
        dispatch({ type: PokemonContextActions.setFoundPokemon, foundPokemon: list });
    };

    const changeView = () => {
        navigate(props.returnPath)
    }

    const handleToggle = () => setOpenMenu((prevOpen) => !prevOpen);

    const handleClose = (event, value) => {

        if (value) {
            orderPokemon(value);
        }

        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenMenu(false);
    };

    const orderPokemon = (criteriaItem) => {
        dispatch({ type: PokemonContextActions.setLoading, loading: true });
        let newList = [];
        if (criteriaItem === 'name') {
            newList = boxPokemon.sort((a, b) => a.name.localeCompare(b.name));
        } else
            if (criteriaItem === 'type') {
                newList = boxPokemon.sort((a, b) => a.types[0].type.name.localeCompare(b.types[0].type.name));
            } else {
                newList = boxPokemon;
            }
        newList = getListWithPosition(newList);
        eventBus.dispatch('onFilter', newList);
        dispatch({ type: PokemonContextActions.setFoundPokemon, foundPokemon: newList });
        dispatch({ type: PokemonContextActions.setLoading, loading: false });
    }

    const getListWithPosition = (list) => {
        return list.map((pokemon, index) => {
            return { ...pokemon, position: index }
        });
    }

    return (
        <>
            <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                <Grid container>
                    <Grid item xs={10}>
                        <TextField fullWidth type='search' onChange={(e) => setKeyword(e.target.value)} />
                    </Grid>
                    <Grid item container xs={2} >
                        <Grid item container xs={8} direction='row'>
                            <Grid item xs={6}>
                                {
                                    props.isBox &&
                                    <>
                                        <Button ref={anchorRef} onClick={handleToggle} className='pokeButton'>
                                            <img alt='orderby' src={orderbyImg} />
                                        </Button>
                                        <Popper open={openMenu} anchorEl={anchorRef.current} transition>
                                            {({ TransitionProps, placement }) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    style={{
                                                        transformOrigin:
                                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                    }}>
                                                    <Paper>
                                                        <ClickAwayListener onClickAway={handleClose}>
                                                            <MenuList autoFocusItem={openMenu}>
                                                                <MenuItem data-name={'name'} onClick={(e) => handleClose(e, 'name')}>Name</MenuItem>
                                                                <MenuItem data-type={'type'} onClick={(e) => handleClose(e, 'type')}>Type</MenuItem>
                                                            </MenuList>
                                                        </ClickAwayListener>
                                                    </Paper>
                                                </Grow>
                                            )}
                                        </Popper>
                                    </>
                                }
                            </Grid>

                            <Grid item xs={6}>
                                <button className='pokeButton' onClick={filterData}><img alt='search' src={searchImg} /></button>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <button className='pokeButton' onClick={changeView}><img alt='change view' src={changeImg} /></button>
                        </Grid>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}

export default Search;