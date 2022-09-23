import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './sidemenu/Sidebar';
import PaymentTracker from './PaymentTracker';
import Agenda from './Agenda';
import Navbar from './Navbar';
import Axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';

const Main = () => {
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const [paytrackerData, setPaytrackerData] = useState([]);

  const { user, isAuthenticated } = useAuth0();

  let receptionInitials = '';

  if (isAuthenticated) {
    // receptionInitials = user.user_metadata.initials;
    console.log(isAuthenticated);
  }

  const getPaytrackerUsers = () => {
    //get paytrackerData
    Axios.get(`${domain}/paytracker`)
      .then((res) => {
        console.log(res.data);
        setPaytrackerData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPaytrackerUsers();
  }, []);

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated == false) {
      <Navigate to='/login' />;
    }
  }, [isAuthenticated]);

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
          <Agenda
            setPaytrackerData={setPaytrackerData}
            getPaytrackerUsers={getPaytrackerUsers}
          />
          <PaymentTracker
            paytrackerData={paytrackerData}
            setPaytrackerData={setPaytrackerData}
          />
        </motion.main>
      </div>
    </div>
  );
};

export default Main;
