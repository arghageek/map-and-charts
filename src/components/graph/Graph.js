import { FormControl, Select, InputLabel, MenuItem, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import { getDiseaseInfoWithDate } from '../../api/dataWithDateApi';
import numeral from 'numeral';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const Graph = ({ countries, setCountries, selectedCountry, setSelectedCountry, handleCountryChange }) => {
  const [graphData, setGraphData] = useState();
  const [days, setDays] = useState(30);

  const [selectionRange, setSelectionRange] = useState({
    startDate: moment(new Date()).subtract(6, 'd').toDate(),
    endDate: moment(new Date()).toDate(),
    key: 'selection',
  });

  const formattingChartData = (data, casesType = 'cases') => {
    const formattedArr = [];
    let lastPoint;

    for (let date in data[casesType]) {
      if (lastPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastPoint,
        };
        formattedArr.push(newDataPoint);
      }
      lastPoint = data[casesType][date];
    }

    return formattedArr;
  };

  const fetchGraphData = async () => {
    const response = await getDiseaseInfoWithDate(days);
    console.log(response.data);
    const formattedData = formattingChartData(response.data, 'cases');
    console.log(formattedData);
    setGraphData(formattedData);
  };

  useEffect(() => {
    fetchGraphData();
  }, [selectionRange]);

  const handleSelectDateRange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectionRange({
      startDate,
      endDate,
      key: 'selection',
    });

    setDays(moment(endDate).diff(moment(startDate), 'days') + 1);
  };

  return (
    <div className='graph'>
      {/* select country dropdown */}
      <FormControl fullWidth>
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

      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectDateRange}
        maxDate={new Date()}
      />
      {/* graph */}
      <Line
        options={options}
        data={{
          datasets: [
            {
              data: graphData,
              backgroundColor: '#f5f5f5',
              borderColor: '#cc1034',
            },
          ],
        }}
      />
    </div>
  );
};

export default Graph;
