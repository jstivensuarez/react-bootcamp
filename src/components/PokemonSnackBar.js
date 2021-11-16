import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import eventBus from '../eventBus';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PokemonSnackBar = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    useEffect(() => {
        eventBus.on('showMessage', ({message, type}) => {
            if(type){
                setSeverity(type);
            }else{
                setSeverity('success');
            }
            setOpen(true);
            setMessage(message);
        });
        return () => {
            eventBus.remove('showMessage');
        }
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
            open={open}
            autoHideDuration={5000} onClose={handleClose}
        >
            <Alert severity={severity} sx={{ width: '100%' }} action={action}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default PokemonSnackBar;
