import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles/PaletteListStyles'

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const {classes, palettes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>react colors</h1>
                    <Link to="/palette/new">create palette</Link>
                </nav>
                <div className={classes.palettes}>
                {palettes.map(palette => (
                        <MiniPalette {...palette} deletePalette={deletePalette} handleClick={() => this.goToPalette(palette.id)} key={palette.id}/>
                ))}
                </div>
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(PaletteList)