import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import styles from './Styles/MiniPaletteStyles'
import React, {PureComponent} from 'react'

class MiniPalette extends PureComponent {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    };
    handleClick(evt) {
        evt.stopPropagation();
        this.props.deletePaletteDialog(this.props.id);
    }
    goToPalette() {
        this.props.sendToPalette(this.props.id)
    }
    render() {
        const { classes, paletteName, emoji, colors } = this.props;
        const miniColorBoxes = colors.map(color => (
            <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />));
        return (
            <div className={classes.root} onClick={this.goToPalette}>
                <DeleteIcon className={classes.deleteIcon} style={{transition: "all 0.3s ease-in-out"}} onClick={this.handleClick} />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>          
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);