import React, { useEffect } from 'react';
import Sidebar from '../sidemenu/Sidebar';
import PaymentTracker from '../components/paytracker/PaymentTracker';
import Agenda from '../components/agenda/Agenda';
import Navbar from '../components/navbar/Navbar';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_LOGIN_SUCCESS } from '../constants/recept';
import { getStudents } from '../actions/studentActions';
import { getLessons } from '../actions/lessonsActions';

const MainScreen = () => {
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.lessons);
  const { isLoading: lessonLoading, lessonsList } = lessons;

  const students = useSelector((state) => state.students);
  const { list: studentsList, isLoading: studentLoading } = students;

  const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: GET_LOGIN_SUCCESS, payload: user });
    }
    // get studentsList if not in global state yet
    if (!studentLoading && !studentsList.length) dispatch(getStudents());
    // get lessonsList if not in global state yet
    if (!lessonLoading && !lessonsList.length) dispatch(getLessons());
  }, [isAuthenticated, dispatch]);

  return (
    <div className='meat'>
      <Sidebar />
      <div className='right-side'>
        <Navbar />
        <motion.main
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.75 }}
          className='main'
        >
          <Agenda />
          <PaymentTracker />
        </motion.main>
      </div>
    </div>
  );
};

export default MainScreen;
