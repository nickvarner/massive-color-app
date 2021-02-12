import React, { useState, useEffect } from 'react'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    ColorPickerForm: {
        width: "100%"
    },
    picker: {
        marginTop: "2rem"
    },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    colorNameInput: {
        width: "100%",
        height: "70px",

    }
}))

const ColorPickerForm = (props) => {
    const classes = useStyles();
    const {paletteFull, createColor, colors, palettes} = props;
    const [currentColor, setCurrentColor] = useState('teal');
    const [newColorName, setNewColorName] = useState('');
    const onChangeComplete = (newColor) => {
        setCurrentColor(newColor.hex);
    };
    const handleColorChange = (evt) => {
        setNewColorName(evt.target.value)
    }
    const handleSubmit = () => {
        const newColor = { color: currentColor, name: newColorName};
        createColor(newColor);
        setNewColorName('');
        changeToRandom();
    }
    const changeToRandom = () => {
        const allColors = palettes.map(p => p.colors).flat();
        let rand = Math.floor(Math.random() * allColors.length);
        const newColor = allColors[rand];
        onChangeComplete(newColor);
      }
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
    });
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorUnique', value => {
            return colors.every(
                ({ color }) => color !== currentColor
            );
        });
    });
    return (
        <div className={classes.ColorPickerForm}>
            <ChromePicker color={currentColor} onChangeComplete={onChangeComplete} className={classes.picker} width='100%' />
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator 
                    value={newColorName}
                    className={classes.colorNameInput}
                    placeholder="color name"
                    variant="filled"
                    margin="normal"
                    onChange={handleColorChange} 
                    validators={[
                        'required',
                        'isColorNameUnique',
                        'isColorUnique'
                    ]} 
                    errorMessages={[
                        'this field is required',
                        'color name must be unique',
                        'color already used'
                    ]} />
                <Button className={classes.addColor} variant="contained" color="primary" type="submit" style={{backgroundColor: currentColor}} disabled={paletteFull} >{paletteFull ? 'palette full' : 'add color'}</Button>
            </ValidatorForm>
        </div>
    )
}

export default ColorPickerForm;