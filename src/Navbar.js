import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {level, changeLevel} = this.props;
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
                </div>
            </header>
        )
    }
}

export default Navbar;
