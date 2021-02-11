import React from 'react'
import {withStyles} from '@material-ui/styles';
import chroma from 'chroma-js';
import DeleteIcon from '@material-ui/icons/Delete'

const styles = {
    root: {
        height: "25%",
        width: "20%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg": {
            transform: "scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: props => 
            chroma.contrast(props.color, "black") <= 6 ? "white" : "rgba(0,0,0,0.6)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
}

function DraggableColorBox(props) {
    const {classes, handleClick, color, name} = props;

    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);