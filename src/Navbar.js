import React, { Component } from 'react'
import Select from "@material-ui/core/Select"
import Slider from 'rc-slider';
import { MenuItem, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';
import 'rc-slider/assets/index.css'
import styles from './Styles/NavBarStyles'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this)
    }
    handleFormatChange(evt) {
        this.setState({ format: evt.target.value, open: true });
        this.props.handleChange(evt.target.value);
    }
    closeSnackbar() {
        this.setState({ open: false })
    }
    render() {
        const {level, changeLevel, showingAllColors, classes } = this.props;
        const {format, open} = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/">reactcolorpicker</Link>
                </div>
                    {showingAllColors && (<div className={classes.sliderContainer}>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
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
                    </div>)}
                    <div className={classes.selectContainer}>
                        <Select value={format} onChange={this.handleFormatChange} >
                            <MenuItem value="hex">hex - #ffffff</MenuItem>
                            <MenuItem value="rgb">rgb(255,255,255)</MenuItem>
                            <MenuItem value="rgba">rgba(255,255,255,1.0)</MenuItem>
                        </Select>
                    </div>
                    <Snackbar 
                        anchorOrigin={{ vertical: "bottom", horizontal: "left"}} 
                        open={open} 
                        autoHideDuration={3000} 
                        message={<span id="message id">format changed to {format}</span>}
                        ContentProps={{
                            "aria-describedby": "message-id"
                        }}
                        onClose={this.closeSnackbar}
                        action={[
                            <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close" >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);
