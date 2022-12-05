import { Map, TileLayer, Circle, Popup } from 'react-leaflet';
import './CountryMap.css';
import { FormControl, Select, InputLabel, MenuItem, Box } from '@mui/material';

const casesTypeColors = {
  cases: {
    hex: '#cc1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
};

const CountryMap = ({
  center,
  zoom,
  countries,
  setCountries,
  selectedCountry,
  setSelectedCountry,
  handleCountryChange,
  allCountries,
  casesType,
  selectedCountryData,
}) => {
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
      {/* select country dropdown */}
      <FormControl sx={{ width: 200 }}>
        <InputLabel id='demo-simple-select-label'>Countries</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedCountry}
          label='Countries'
          onChange={handleCountryChange}
          variant='filled'
        >
          <MenuItem value='all'>All</MenuItem>
          {countries?.map((country) => (
            <MenuItem
              key={country.name}
              value={country.value}
            >
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className='country-map'>
        <Map
          center={center}
          zoom={zoom}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {handlePlotData(allCountries, casesType)}
        </Map>
      </div>
    </Box>
  );
};

export default CountryMap;
