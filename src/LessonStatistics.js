import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DonutChart from './DonutChart';
import LineChart from './LineChart';
import Axios from 'axios';

const LessonStatistics = ({ lessons }) => {
  const domain = 'http://localhost:5000';
  // const [totalSalesPurchases, setTotalSalesPurchases] = useState([]);
  const chartDate = new Date();
  const [doughnutSelect, setDoughnutSelect] = useState('month');
  const [doughnutData, setDoughnutData] = useState([]);
  //   const [data, setData] = useState({});

  const chartColors = ['#E29292', '#Bee292'];
  //fetch data for all charts, store each dataset as a property in object
  const fetchDoughnutData = () => {
    //Doughnut Chart Data
    Axios.get(`${domain}/lessons/statistics/doughnut`, {
      params: {
        sortByTSP: doughnutSelect,
        currentDate: '2022-05-11',
      },
    })
      .then((res) => {
        console.log(res);
        setDoughnutData([
          res.data.totalPurchases[0].purchasesBy,
          res.data.totalSales[0].salesBy,
        ]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDoughnutData();
  }, [doughnutSelect]);
  console.log(doughnutData);
  return (
    <div className='lessonStats'>
      <h3>Lesson Statistics</h3>
      <section>
        <div className='chart-controls'>
          <select
            value={doughnutSelect}
            onChange={(e) => {
              e.preventDefault();
              setDoughnutSelect(e.target.value);
            }}
          >
            {/* <option value='lifetime'>Lifetime</option> */}
            <option value='month'>Month</option>
            <option value='week'>Week</option>
          </select>
          <p>DISPLAY MONTH/WEEK</p>
        </div>
        <DonutChart data={doughnutData} chartColors={chartColors} />
      </section>

      <LineChart domain={domain} chartDate={chartDate} lessons={lessons} />
    </div>
  );
};

export default LessonStatistics;
