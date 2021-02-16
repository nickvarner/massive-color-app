import React, { Component } from 'react'
import clsx from 'clsx';
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from "./Styles/ColorBoxStyles"

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        });
    }
    render() {
        const {name, background, id, paletteId, showingFullPalette, classes} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{ background }}>
                    <div
                        style={{ background }}
                        className={clsx(classes.copyOverlay, {[classes.showOverlay]: copied})}
                    />
                    <div className={clsx(classes.copyMsg, {[classes.showMsg]: copied})}>
                        <h1>copied</h1>
                        <p 
                            className={classes.copyText}
                            >{background}
                        </p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName} >{name}</span>
                        </div>
                        <button className={classes.copyBtn} >copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>more</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);