import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import DraggableColorBox from './DraggableColorBox'
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
    const [newName, setNewName] = useState('')

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
        const newColor = { color: currentColor, name: newName};
        setColors([...colors, newColor]);
        setNewName('');
    }
    const handleChange = (evt) => {
        setNewName(evt.target.value)
    }
    const savePalette = () => {
        const newName = 'new test palette'
        const newPalette = {paletteName: newName, id: newName.toLowerCase().replace(/ /g, '-'), colors: colors};
        props.savePalette(newPalette);
        props.history.push('/');
    }
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
            <Button variant="contained" color="primary" onClick={savePalette} >save palette</Button>
          </Toolbar>
        </AppBar>
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
            <Button variant="contained" color="secondary">clear palette</Button>
            <Button variant="contained" color="primary">random color</Button>
          </div>
          <ChromePicker color={currentColor} onChangeComplete={onChangeComplete} />
          <ValidatorForm onSubmit={createColor}>
              <TextValidator 
              value={newName} 
              onChange={handleChange} 
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
              <Button variant="contained" color="primary" type="submit" style={{backgroundColor: currentColor}}>add color</Button>
          </ValidatorForm>
          
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
              {colors.map(color => 
                <DraggableColorBox color={color.color} name={color.name} >{color}</DraggableColorBox>)}
        </main>
      </div>
    );
  }