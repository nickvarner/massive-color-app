import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
                    <h1 className={classes.heading}>react colors</h1>
                    <Link to="/palette/new">create palette</Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {palettes.map(palette => (
                        <CSSTransition key={palette.id} classNames="fade" timeout={500}><MiniPalette {...palette} deletePalette={deletePalette} handleClick={() => this.goToPalette(palette.id)} key={palette.id} id={palette.id} /></CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(PaletteList)