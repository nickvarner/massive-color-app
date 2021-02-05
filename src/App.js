import {Route, Switch} from "react-router-dom"
import Palette from './Palette'
import seedColors from './seedColors';
import PaletteList from './PaletteList'
import { generatePalette } from './ColorHelpers'
import SingleColorPalette from './SingleColorPalette';

const App = () => {
  const findPalette = (id) => {
    return seedColors.find(function(palette){
      return palette.id === id;
    })
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />} />
        <Route exact path="/palette/:id" render={routeProps => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} /> }/>
        <Route exact path="/palette/:paletteId/:colorId" render={routeProps => <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(findPalette(routeProps.match.params.paletteId))} />} />
      </Switch>
    </div>
  );
}

export default App;
