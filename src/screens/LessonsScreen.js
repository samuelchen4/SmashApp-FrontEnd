import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../sidemenu/Sidebar';
import Navbar from '../components/navbar/Navbar';
import AddLesson from '../components/lesson/AddLesson';
// import '../../users.css';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { getLessons } from '../actions/lessonsActions';
import { getStudents } from '../actions/studentActions';
import { getPaytrackerInfo } from '../actions/paytrackerActions';
import { GET_LOGIN_SUCCESS } from '../constants/recept';

const LessonsScreen = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();

  const lessons = useSelector((state) => state.lessons);
  const { isLoading: lessonLoading, lessonsList } = lessons;

  const students = useSelector((state) => state.students);
  const { list: studentsList, isLoading: studentLoading } = students;

  const paytracker = useSelector((state) => state.paytracker);
  const { paytrackerList, isLoading: paytrackerLoading } = paytracker;

  useEffect(() => {
    // receptInfo
    if (isAuthenticated && !auth0Loading)
      dispatch({ type: GET_LOGIN_SUCCESS, payload: user });
    // lessons
    if (!lessonLoading && !lessonsList.length) dispatch(getLessons());
    // students
    if (!studentLoading && !studentsList.length) dispatch(getStudents());
    // paytracker
    if (!paytrackerLoading && !paytrackerList.length)
      dispatch(getPaytrackerInfo());
  }, [
    dispatch,
    isAuthenticated,
    auth0Loading,
    lessonLoading,
    lessonsList,
    studentLoading,
    studentsList,
    paytrackerLoading,
    paytrackerList,
  ]);

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
              <AddLesson lessons={lessonsList} />
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
