import {Route, Switch} from "react-router-dom"
import {useState, useEffect} from 'react'
import Palette from './Palette'
import seedColors from './seedColors';
import PaletteList from './PaletteList'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './ColorHelpers'
import SingleColorPalette from './SingleColorPalette';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './Styles/App.css'

const App = () => {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState( savedPalettes || seedColors);
  const findPalette = (id) => {
    return palettes.find(palette => {
      return palette.id === id;
    })
  }
  const deletePalette = (id) => {
    const newPalettes = palettes.filter(palette => palette.id !== id);
    setPalettes(newPalettes)
  }
  const savePalette =  (newPalette) => {
    setPalettes([...palettes, newPalette]);
  }
  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes])
  return (
    <div className="App">
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition classNames='fade' timeout={500} key={location.key}>
            <Switch location={location}>
              <Route exact path="/palette/new" render={routeProps => ( <div className="page"> <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} /> </div>)} /> 
              <Route exact path="/" render={routeProps => ( <div className="page"> <PaletteList palettes={palettes} {...routeProps} deletePalette={deletePalette} /> </div>)} /> 
              <Route exact path="/palette/:paletteId/:colorId" render={routeProps => ( <div className="page"> <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(findPalette(routeProps.match.params.paletteId))} /> </div>)} /> 
              <Route exact path="/palette/:id" render={routeProps => ( <div className="page"> <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} /> </div> )}/> 
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </div>
  );
}

export default App;
