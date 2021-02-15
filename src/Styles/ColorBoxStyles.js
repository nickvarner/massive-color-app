import chroma from 'chroma-js';
import sizes from './sizes'

const styles = {
    ColorBox: {
        width: "20%",
        height: props => (props.showingFullPalette ? "25%" : "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        verticalAlign: "top",
        [sizes.down("lg")]: {
            width: "25%",
            height: props => (props.showingFullPalette ? "20%" : "50%")
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => (props.showingFullPalette ? "10%" : "50%")
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => (props.showingFullPalette ? "5%" : "10%")
        },
    },

    dynText: {
        color: props => 
            chroma.contrast(props.background, "black") <= 6 ? "white" : "rgba(0,0,0,0.6)"
    },
}

export default styles;