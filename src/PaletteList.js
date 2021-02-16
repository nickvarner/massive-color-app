import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from './Styles/PaletteListStyles'

const PaletteList = (props) => {
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [deletingId, setDeletingId] = React.useState(null)
    const {classes, palettes, deletePalette} = props;
      const handleClose = () => {
        setOpenDeleteDialog(false);
        setDeletingId('')
      };
    const goToPalette = (id) => {
        props.history.push(`/palette/${id}`);
    }
    const deletePaletteDialog = (id) => {
        setOpenDeleteDialog(true)
        setDeletingId(id)
    }
    const handleDelete = () => {
        deletePalette(deletingId);
        handleClose()
    }
    
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1 className={classes.heading}>react colors</h1>
                    <Link to="/palette/new" className={classes.createPalette}>create palette</Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {palettes.map(palette => (
                        <CSSTransition key={palette.id} classNames="fade" timeout={500}><MiniPalette {...palette} deletePaletteDialog={deletePaletteDialog} sendToPalette={goToPalette} key={palette.id} id={palette.id} /></CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <Dialog
                open={openDeleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">are you sure you want to delete this palette?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    deleting the palette removes the palette from the palette list. this action cannot be undone.
                    proceed?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    cancel
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    delete palette
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withStyles(styles)(PaletteList)