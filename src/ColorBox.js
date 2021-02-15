import React, { Component } from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import "./Styles/ColorBox.css"
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
        const {name, background, id, paletteId, showLink, classes} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={`${classes.ColorBox} ColorBox`} style={{ background }}>
                    <div
                        style={{ background }}
                        className={`copy-overlay ${copied && "show"}`}
                    />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied</h1>
                        <p 
                            className={classes.dynText}
                            >{this.props.background}
                        </p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.dynText} >{name}</span>
                        </div>
                        <button className={`copy-button ${classes.dynText}`} >copy</button>
                    </div>
                    {showLink && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${classes.dynText}`}>more</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);