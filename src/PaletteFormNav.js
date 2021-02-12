import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
}));

const PaletteFormNav = (props) => {
    const classes = useStyles();
    const [newPaletteName, setNewPaletteName] = useState('');
    const {open, palettes, handleDrawerOpen} = props;
    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });
    const handlePaletteChange = (evt) => {
        setNewPaletteName(evt.target.value)
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        create your own palette
                    </Typography>
                </Toolbar>
                <div className="classes navBtns">
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
                        <Link to="/">
                            <Button variant="contained" color="secondary">go back</Button>
                        </Link>
                    </div>
            </AppBar>
        </div>
    )
}

export default PaletteFormNav