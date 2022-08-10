import React from 'react';
import Sidebar from './sidemenu/Sidebar';
import PaymentTracker from './PaymentTracker';
import Agenda from './Agenda';
import Navbar from './Navbar';
import Axios from 'axios';
import { motion } from 'framer-motion';

const Main = () => {
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

export default Main;
