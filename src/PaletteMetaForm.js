import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'


export default function PaletteMetaForm(props) {
    const [open, setOpen] = React.useState(false);
    const [newPaletteName, setNewPaletteName] = React.useState('');
    const {palettes} = props;
    React.useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
        });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handlePaletteChange = (evt) => {
        setNewPaletteName(evt.target.value)
    }

    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            create new palette
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
            <DialogContentText>
            </DialogContentText>
                <ValidatorForm onSubmit={() => props.savePalette(newPaletteName)}>
                    <TextValidator 
                        value={newPaletteName} 
                        label="palette name" 
                        onChange={handlePaletteChange} 
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['enter palette name', 'palette name must be unique']}
                    />
                    <Button variant="contained" color="primary" type="submit" >save palette</Button>
                </ValidatorForm>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
                palette name
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    }
