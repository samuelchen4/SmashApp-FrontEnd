import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from './sidemenu/Sidebar';
import Navbar from './Navbar';
import AddLesson from './AddLesson';
import LessonStatistics from './LessonStatistics';
import Axios from 'axios';
import UserBlock from './UserBlock';
import './users.css';
import { motion, AnimatePresence } from 'framer-motion';

const Lessons = () => {
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    getLessons();
  }, []);

  const getLessons = () => {
    Axios.get(`${domain}/lessons`)
      .then((res) => {
        // console.log(res.data);
        setLessons(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='meat'>
      <Sidebar />
      <div className='right-side'>
        <Navbar />
        <div className='main'>
          <motion.main
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            className={`containerSolo allowScroll`}
          >
            <h2>Lessons</h2>
            <motion.div className='top userSection'>
              <AddLesson
                setLessons={setLessons}
                lessons={lessons}
                domain={domain}
              />
            </motion.div>
            <motion.div className='lessonModule userSection'>
              <LessonStatistics lessons={lessons} domain={domain} />
            </motion.div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
