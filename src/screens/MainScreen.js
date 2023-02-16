import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../sidemenu/Sidebar';
import PaymentTracker from '../PaymentTracker';
import Agenda from '../Agenda';
import Navbar from '../Navbar';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAgendaLessons } from '../actions/agendaActions';
import { GET_LOGIN_SUCCESS } from '../constants/recept';
import { getLessons } from '../actions/lessonsActions';

const MainScreen = () => {
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.lessons);
  const { isLoading: lessonLoading, lessonsList } = lessons;

  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: GET_LOGIN_SUCCESS, payload: user });
    }
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
