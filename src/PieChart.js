import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const PieChart = (data) => {
  const { amountStudents, capacity } = data;

  return (
    <div className='capacity'>
      <Chart
        type='pie'
        data={{
          labels: [],
          datasets: [
            {
              label: 'capacity',
              data: [amountStudents, capacity - amountStudents],
              backgroundColor: ['#E29292', '#Bee292'],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          tooltips: { enabled: false },
          hover: { mode: null },
        }}
        width='40px'
        height='40px'
      />
    </div>
  );
};

export default PieChart;
