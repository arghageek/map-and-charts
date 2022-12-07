import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import './CountryMap.css';
import { Box } from '@mui/material';

const casesTypeColors = {
  cases: {
    hex: '#cc1034',
    multiplier: 200,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 600,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 1400,
  },
};

const CountryMap = ({ center, zoom, allCountries, casesType }) => {
  const handlePlotData = (data, casesType = 'cases') => {
    return data.map((country) => (
      <Circle
        key={country.country}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
      >
        <Popup>
          <div>
            <div style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
            <div>{country.country}</div>
            <div>
              <b>Cases:</b> {country.cases}
            </div>
            <div>
              <b>Recovered:</b> {country.recovered}
            </div>
            <div>
              <b>Deaths:</b> {country.deaths}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
  };

  return (
    <Box marginTop={4}>
      <div className='country-map'>
        <MapContainer
          center={center}
          zoom={zoom}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {handlePlotData(allCountries, casesType)}
        </MapContainer>
      </div>
    </Box>
  );
};

export default CountryMap;
