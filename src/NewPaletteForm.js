import React, { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import arrayMove from 'array-move'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList'
import ColorPickerForm from './ColorPickerForm'
import PaletteFormNav from './PaletteFormNav'
import Button from '@material-ui/core/Button'

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  btns: {
    width: "100%",
  },
  btn: {
    width: "50%"
  }
}));

const NewPaletteForm = (props) => {
  //how to use default props with functional react component below
    const {maxColors = '20'} = props;
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(props.palettes[0].colors);
    const paletteFull = colors.length >= maxColors;
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const savePalette = (newPalette) => {
        newPalette.colors = colors;
        props.savePalette(newPalette);
        props.history.push('/');
    }
    const removeColor = (colorName) => {
      setColors(colors.filter(color => color.name !== colorName))
    }
    let onSortEnd = ({ oldIndex, newIndex }) => {
      setColors(
        arrayMove(colors, oldIndex, newIndex)
      )
    }
    const clearColors = () => {
      setColors([]);
    }
    const createColor = (newColor) => {
      setColors([...colors, newColor]);
  }
    const addRandomColor = () => {
      const allColors = props.palettes.map(p => p.colors).flat();
      let rand = Math.floor(Math.random() * allColors.length);
      const randomColor = allColors[rand];
      setColors([...colors, randomColor]);
    }

    return (
      <div className={classes.root}>
        <PaletteFormNav open={open} palettes={props.palettes} handleDrawerOpen={handleDrawerOpen} savePalette={savePalette} paletteFull={paletteFull} />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
               <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>design your palette</Typography>
            <div className={classes.btns}>
              <Button className={classes.btn} variant="contained" color="secondary" onClick={clearColors} >clear palette</Button>
              <Button className={classes.btn} variant="contained" color="primary" onClick={addRandomColor} disabled={paletteFull} > {paletteFull ? 'palette full' : 'random color'}</Button>
            </div>
            <ColorPickerForm paletteFull={paletteFull} createColor={createColor} colors={colors} palettes={props.palettes} />
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
              <DraggableColorList colors={colors} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd}  />
        </main>
      </div>
    );
  }

  export default NewPaletteForm;