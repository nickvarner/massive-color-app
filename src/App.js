import {Route, Switch} from "react-router-dom"
import {useState, useEffect} from 'react'
import Palette from './Palette'
import seedColors from './seedColors';
import PaletteList from './PaletteList'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './ColorHelpers'
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
      <Switch>
        <Route exact path="/palette/new" render={routeProps => <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} /> } />
        <Route exact path="/" render={routeProps => <PaletteList palettes={palettes} {...routeProps} deletePalette={deletePalette} />} />
        <Route exact path="/palette/:id" render={routeProps => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} /> }/>
        <Route exact path="/palette/:paletteId/:colorId" render={routeProps => <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(findPalette(routeProps.match.params.paletteId))} />} />
      </Switch>
    </div>
  );
}

export default App;
