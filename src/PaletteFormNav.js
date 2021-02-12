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
import PaletteMetaForm from './PaletteMetaForm';

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
    const {open, palettes, handleDrawerOpen, savePalette} = props;
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
                    <PaletteMetaForm palettes={palettes} savePalette={savePalette} />
                    <Link to="/">
                        <Button variant="contained" color="secondary">go back</Button>
                    </Link>
                </div>
            </AppBar>
        </div>
    )
}

export default PaletteFormNav