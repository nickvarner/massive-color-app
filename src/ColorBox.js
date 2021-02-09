import React, { Component } from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import "./ColorBox.css"

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this);
        this.contrastCheck = this.contrastCheck.bind(this);
    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        });
    }
    contrastCheck (color) {
        if(chroma.contrast(color, "black") < 6) {
            return "white"
        } else {
            return "rgba(0,0,0,0.5)"
        }
    }
    render() {
        const {name, background, id, paletteId, showLink} = this.props;
        const {copied} = this.state;
        const isContrast = this.contrastCheck(background)
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className="ColorBox" style={{ background }}>
                    <div
                        style={{ background }}
                        className={`copy-overlay ${copied && "show"}`}
                    />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied</h1>
                        <p style={{ color: isContrast }} >{this.props.background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span style={{ color: isContrast }} >{name}</span>
                        </div>
                        <button className="copy-button" style={{ color: isContrast }}>copy</button>
                    </div>
                    {showLink && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className="see-more" style={{ color: isContrast }}>more</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox