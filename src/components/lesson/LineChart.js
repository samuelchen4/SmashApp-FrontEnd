import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const LineChart = ({ domain, chartDate, lessons, data }) => {
  const months = [
    { id: 1, month: 'January' },
    { id: 2, month: 'February' },
    { id: 3, month: 'March' },
    { id: 4, month: 'April' },
    { id: 5, month: 'May' },
    { id: 6, month: 'June' },
    { id: 7, month: 'July' },
    { id: 8, month: 'August' },
    { id: 9, month: 'September' },
    { id: 10, month: 'October' },
    { id: 11, month: 'November' },
    { id: 12, month: 'December' },
  ];
  const [select, setSelect] = useState('month');
  const [lineData, setLineData] = useState([]);
  const [renderLines, setRenderLines] = useState({
    label: 'ISC',
    data: data,
    // backgroundColor: chartColors,
  });

  const fetchLineData = () => {
    //Line Chart Data
    Axios.get(`${domain}/lessons/statistics/line`, {
      params: {
        sortByTSP: select,
        currentDate: chartDate,
      },
    })
      .then((res) => {
        // console.log(res);
        //set State to data
        setLineData(res.data.totalPurchases);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLineData();
  }, [lessons]);

  //   const renderLineData = () => {
  //     console.log(lineData);
  //     const dataValues = months.map((month) => {
  //       lineData.find((purchases) => {
  //         return purchases.month === month.id;
  //       });
  //     });
  //     console.log(dataValues);
  //   };
  //   useEffect(() => {
  //     renderLineData();
  //   }, [lineData]);

  //   console.log(lineData);
  return (
    <section>
      <div className='chart-controls'>
        <select
          value={select}
          onChange={(e) => {
            e.preventDefault();
            setSelect(e.target.value);
          }}
        >
          {/* <option value='lifetime'>Lifetime</option> */}
          <option value='month'>Month</option>
          <option value='week'>week</option>
        </select>
        <p>DISPLAY MONTH/WEEK</p>
      </div>
      <div className='chart lineChart'>
        <Chart
          type='line'
          data={{
            labels: months.map((month) => month.month),
            //   datasets: [renderLines],
            datasets: [
              {
                label: 'ISC',
                data:
                  //   months.map((month) => {
                  //     lineData.find((purchases) => {
                  //       if (month.id === purchases.month) {
                  //         return purchases.purchases;
                  //       } else {
                  //         return 1;
                  //       }
                  //     });
                  //   }),
                  [1, 10, 2, 3, 0, 0, 5, 2, 7, 10, 1, 7],
                backgroundColor: '#Bee292',

                borderColor: '#Bee292',
              },
            ],
          }}
        />
      </div>
    </section>
  );
};

export default LineChart;
