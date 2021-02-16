import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    ColorPickerForm: {
        width: "100%"
    },
    picker: {
        width: "100% !important",
        marginTop: "2rem"
      },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    colorNameInput: {
        width: "100%",
        height: "70px",
    }
}))

export default useStyles;
