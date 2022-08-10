import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const DonutChart = ({ data, chartColors }) => {
  return (
    <div className='chart'>
      <Chart
        type='doughnut'
        data={{
          labels: ['Sales', 'Purchases'],
          datasets: [
            {
              label: 'volume',
              data: data,
              backgroundColor: chartColors,
            },
          ],
        }}
      />
    </div>
  );
};

export default DonutChart;
