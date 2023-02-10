import React, { useState, useEffect } from 'react';
import { apiDomain } from '../utils/domains';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../sidemenu/Sidebar';
import Navbar from '../Navbar';
import AddLesson from '../AddLesson';
import LessonStatistics from '../LessonStatistics';
import { getLessons } from '../actions/lessonsActions';
import Axios from 'axios';
import '../users.css';
import { motion } from 'framer-motion';

const LessonsScreen = () => {
  const dispatch = useDispatch();

  // going to remove this
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    dispatch(getLessons());
  }, [dispatch]);

  const lessonsObj = useSelector((state) => state.lessons);
  const { lessonsList, isLoading } = lessonsObj;

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
                lessons={lessonsList}
                domain={apiDomain}
                isLoading={isLoading}
              />
            </motion.div>
            <motion.div className='lessonModule userSection'>
              {/* <LessonStatistics lessons={lessonsList} domain={apiDomain} /> */}
            </motion.div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default LessonsScreen;
