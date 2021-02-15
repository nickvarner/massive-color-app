import React, { useState } from 'react'
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Button from '@material-ui/core/Button'
import PaletteMetaForm from './PaletteMetaForm';
import useStyles from './Styles/PaletteFormNavStyles'

const PaletteFormNav = (props) => {
    const [formShowing, setFormShowing] = useState(false)
    const classes = useStyles();
    const {open, palettes, handleDrawerOpen, savePalette} = props;
    const showForm = () => {
        setFormShowing(true)
    }
    const hideForm = () => {
        setFormShowing(false)
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
                        <MenuOpenIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        create your own palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/" className={classes.link}>
                        <Button className={classes.btn} variant="contained" color="secondary">go back</Button>
                    </Link>
                    <Button className={classes.btn} variant="contained" color="primary" onClick={showForm}>
                        save palette
                    </Button>
                </div>
            </AppBar>
            {formShowing && <PaletteMetaForm palettes={palettes} savePalette={savePalette} hideForm={hideForm} />}
        </div>
    )
}

export default PaletteFormNav