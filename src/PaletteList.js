import {Link} from 'react-router-dom';

const PaletteList = (props) => {
    const {palettes} = props;
    return (
        <div>
            <h1>react colors</h1>
            {palettes.map(palette => (
                <Link to={`/palette/${palette.id}`}>
                    {palette.paletteName}
                </Link>
            ))}
        </div>
    )
}

export default PaletteList