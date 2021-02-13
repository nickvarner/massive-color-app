import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'


export default function PaletteMetaForm(props) {
    const [stage, setStage] = React.useState('form')
    const [newPaletteName, setNewPaletteName] = React.useState('');
    const {palettes, hideForm, savePalette} = props;
    React.useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
        });
    const handlePaletteChange = (evt) => {
        setNewPaletteName(evt.target.value)
    }
    const showEmojiPicker = () => {
        setStage('emoji')
    }
    const saveEmoji = (newEmoji) => {
        const newPalette = {paletteName: newPaletteName, id: newPaletteName.toLowerCase().replace(/ /g, '-'), emoji: newEmoji.native };
        savePalette(newPalette)
    }

    return (
        <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
            <DialogTitle>choose an emoji to represent your palette</DialogTitle>
            <Picker onSelect={saveEmoji} title='pick an emoji' />
        </Dialog>
        <Dialog open={stage === "form"} onClose={hideForm} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">choose palette name</DialogTitle>
            <ValidatorForm onSubmit={showEmojiPicker}>
                <DialogContent>
                    <DialogContentText>
                        enter a unique name for your new palette
                    </DialogContentText>
                    <TextValidator 
                        value={newPaletteName} 
                        label="palette name"
                        fullWidth
                        margin="normal" 
                        onChange={handlePaletteChange} 
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['enter palette name', 'palette name must be unique']}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit" >save palette</Button> 
                </DialogActions>
            </ValidatorForm>
        </Dialog>
        </div>
    );
    }
