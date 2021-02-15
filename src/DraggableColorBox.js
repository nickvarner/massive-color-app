import React from 'react'
import {withStyles} from '@material-ui/styles';
import chroma from 'chroma-js';
import DeleteIcon from '@material-ui/icons/Delete'
import {SortableElement} from 'react-sortable-hoc'
import styles from './Styles/DraggableColorBoxStyles'

const DraggableColorBox = SortableElement((props) => {
    const {classes, handleClick, color, name} = props;
    const dynText = chroma.contrast(color, "black") <= 6 ? "white" : "rgba(0,0,0,0.6)"
    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent} style={{color: dynText}}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);