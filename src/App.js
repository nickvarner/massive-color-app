import {Route, Switch} from "react-router-dom"
import {useState} from 'react'
import Palette from './Palette'
import seedColors from './seedColors';
import PaletteList from './PaletteList'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './ColorHelpers'
import SingleColorPalette from './SingleColorPalette';

const App = () => {
  const [palettes, setPalettes] = useState(seedColors)
  const findPalette = (id) => {
    return palettes.find(palette => {
      return palette.id === id;
    })
  }
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette])
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/palette/new" render={routeProps => <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} /> } />
        <Route exact path="/" render={routeProps => <PaletteList palettes={palettes} {...routeProps} />} />
        <Route exact path="/palette/:id" render={routeProps => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} /> }/>
        <Route exact path="/palette/:paletteId/:colorId" render={routeProps => <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(findPalette(routeProps.match.params.paletteId))} />} />
      </Switch>
    </div>
  );
}

export default App;
