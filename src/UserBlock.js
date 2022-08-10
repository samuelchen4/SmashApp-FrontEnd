import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import User from './User';

const UserBlock = (user) => {
  const { user_id, fn, ln, email, phone, dob } = user;
  return (
    <Link to={`/user/${user_id}`}>
      <motion.div
        Layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h4>
          {fn} {ln}
        </h4>

        <div>
          {email && <p>Email: {email}</p>}
          {phone && <p>Phone: {phone}</p>}
          {dob && <p>dob: {dob.slice(0, 10)}</p>}
        </div>
      </motion.div>
    </Link>
  );
};

export default UserBlock;
