import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import { getDiseaseInfoWithDate } from '../../api/dataWithDateApi';

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
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const Graph = () => {
  const [graphData, setGraphData] = useState(); // stores formatted graph data
  const [days, setDays] = useState(30); // chart for how many days

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Box
        display='flex'
        justifyContent='center'
      >
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelectDateRange}
          maxDate={new Date()}
        />
      </Box>
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
