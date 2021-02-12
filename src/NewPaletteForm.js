import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import { makeStyles} from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import arrayMove from 'array-move'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DraggableColorList'
import PaletteFormNav from './PaletteFormNav'
import Button from '@material-ui/core/Button'

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

export default function NewPaletteForm(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [currentColor, setCurrentColor] = useState('');
    const [colors, setColors] = useState([]);
    const [newColorName, setNewColorName] = useState('');
    const paletteFull = colors.length >= props.maxColors;
    NewPaletteForm.defaultProps = {
      maxColors: 20
  }
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
    });
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorUnique', value => {
            return colors.every(
                ({ color }) => color !== currentColor
            );
        });
    });
    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const onChangeComplete = (color) => {
        setCurrentColor(color.hex);
    };
    const createColor = () => {
        const newColor = { color: currentColor, name: newColorName};
        setColors([...colors, newColor]);
        setNewColorName('');
    }
    const handleColorChange = (evt) => {
        setNewColorName(evt.target.value)
    }
    const savePalette = (newPaletteName) => {
        const newName = newPaletteName
        const newPalette = {paletteName: newName, id: newName.toLowerCase().replace(/ /g, '-'), colors: colors};
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
    const addRandomColor = () => {
      const allColors = props.palettes.map(p => p.colors).flat();
      let rand = Math.floor(Math.random() * allColors.length);
      const randomColor = allColors[rand];
      setColors([...colors, randomColor]);
    }
    return (
      <div className={classes.root}>
        <PaletteFormNav open={open} classes={classes} palettes={props.palettes} handleDrawerOpen={handleDrawerOpen} savePalette={savePalette} />
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
          <Typography variant="h4">design your palette</Typography>
          <div>
            <Button variant="contained" color="secondary" onClick={clearColors} >clear palette</Button>
            <Button variant="contained" color="primary" onClick={addRandomColor} disabled={paletteFull}>{paletteFull ? 'palette full' : 'random color'}</Button>
          </div>
          <ChromePicker color={currentColor} onChangeComplete={onChangeComplete} />
          <ValidatorForm onSubmit={createColor}>
              <TextValidator 
              value={newColorName} 
              onChange={handleColorChange} 
              validators={[
                    'required',
                    'isColorNameUnique',
                    'isColorUnique'
                    ]} 
                errorMessages={[
                    'this field is required',
                    'color name must be unique',
                    'color already used'
                    ]} />
              <Button variant="contained" color="primary" type="submit" style={{backgroundColor: currentColor}} disabled={paletteFull} >{paletteFull ? 'palette full' : 'add color'}</Button>
          </ValidatorForm>
          
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
              <DraggableColorList colors={colors} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd} />
        </main>
      </div>
    );
  }