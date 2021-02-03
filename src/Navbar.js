import React, { Component } from 'react'
import Select from "@material-ui/core/Select"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import './Navbar.css'
import { MenuItem } from '@material-ui/core';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex' }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        this.setState({ format: evt.target.value });
        this.props.handleChange(evt.target.value);
    }
    render() {
        const {level, changeLevel } = this.props;
        const {format} = this.state;
        return (
            <header className="NavBar">
                <div className="logo">
                    <a href="#">reactcolorpicker</a>
                        <div className="slider-container">
                            <span>Level: {level}</span>
                            <div className="slider">
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                onAfterChange={changeLevel}
                                step={100}
                                trackStyle={{ backgroundColor: 'transparent' }}
                                handleStyle={{
                                    borderColor: 'green',
                                    height: 13,
                                    width: 13,
                                    marginLeft: -7,
                                    marginTop: -3,
                                    backgroundColor: 'green',
                                    boxShadow: 'none'
                                }}
                                railStyle={{height: 8}}
                                />   
                            </div>
                        </div>
                        <div className="select-container">
                            <Select value={format} onChange={this.handleChange} >
                                <MenuItem value="hex">hex - #ffffff</MenuItem>
                                <MenuItem value="rgb">rgb(255,255,255)</MenuItem>
                                <MenuItem value="rgba">rgba(255,255,255,1.0)</MenuItem>
                            </Select>
                        </div>
                </div>
            </header>
        )
    }
}

export default Navbar;
