import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';

const PaletteList = (props) => {
    const {palettes} = props;
    return (
        <div>
            <MiniPalette />
            <h1>react colors</h1>
            {palettes.map(palette => (
                <Link to={`/palette/${palette.id}`}>
                    <MiniPalette {...palette} />
                </Link>
            ))}
        </div>
    )
}

export default PaletteList