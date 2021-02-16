import {Route, Switch} from "react-router-dom"
import {useState, useEffect} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { generatePalette } from './ColorHelpers'
import Palette from './Palette'
import seedColors from './seedColors';
import PaletteList from './PaletteList'
import NewPaletteForm from './NewPaletteForm'
import Page from './Page'
import SingleColorPalette from './SingleColorPalette';

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
          <CSSTransition classNames='page' timeout={500} key={location.key}>
            <Switch location={location}>
              <Route exact path="/palette/new" render={routeProps => ( <Page> <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} /> </Page>)} /> 
              <Route exact path="/" render={routeProps => ( <Page> <PaletteList palettes={palettes} {...routeProps} deletePalette={deletePalette} /> </Page>)} /> 
              <Route exact path="/palette/:paletteId/:colorId" render={routeProps => ( <Page> <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(findPalette(routeProps.match.params.paletteId))} /> </Page>)} /> 
              <Route exact path="/palette/:id" render={routeProps => ( <Page> <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} /> </Page> )}/> 
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </div>
  );
}

export default App;
