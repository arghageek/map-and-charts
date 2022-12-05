import { useEffect, useState } from 'react';
import { getCountryWiseDiseaseData } from './api/countriesApi';
import { Typography, Container } from '@mui/material';
import './App.css';
import Graph from './components/graph/Graph';
import CountryMap from './components/countryMap/CountryMap';
import { getOverallStat } from './api/allApi';

function App() {
  const [allCountries, setAllCountries] = useState([]); // contains all country full data
  const [countries, setCountries] = useState([]); // contains modified data for dropdown
  const [selectedCountry, setSelectedCountry] = useState('all'); // contains selected country code from dropdown
  const [selectedCountryData, setSelectedCountryData] = useState({}); // contains selected countries all data

  const fetchCountryWiseDiseaseData = async () => {
    const response = await getCountryWiseDiseaseData();
    console.log(response.data);
    setAllCountries(response.data);
    const countries = response?.data?.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso2,
    }));

    setCountries(countries);
  };

  const fetchSpecificCountryStat = (countryCode) => {
    const filteredCountry = allCountries?.find((country) => country.countryInfo.iso2 === countryCode);
    console.log(filteredCountry);
    setSelectedCountryData(filteredCountry);
  };

  const fetchOverallStat = async () => {
    const response = await getOverallStat();
    console.log(response);
    setSelectedCountryData(response.data);
  };

  const getCountryWithCountryCode = (countryCode) => {
    countryCode === 'all' ? fetchOverallStat() : fetchSpecificCountryStat(countryCode);
  };

  const handleCountryChange = async (e) => {
    setSelectedCountry(e.target.value);

    getCountryWithCountryCode(e.target.value);
  };

  useEffect(() => {
    fetchCountryWiseDiseaseData();
    // initially showing all data, not country wise data
    fetchOverallStat();
  }, []);

  return (
    <Container className='app'>
      <Typography
        variant='h3'
        textAlign='center'
      >
        Disease Tracker
      </Typography>

      <Graph
        countries={countries}
        setCountries={setCountries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        handleCountryChange={handleCountryChange}
      />
      <CountryMap />
    </Container>
  );
}

export default App;
