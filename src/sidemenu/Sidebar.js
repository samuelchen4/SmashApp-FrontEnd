import React from 'react';
import logo from '../imgs/gaologo.png';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-main'>
        <div className='sidebar-header'>
          <a className='' href='#'>
            <i className='bx bx-menu'></i>
            <span>SMASHCITY</span>
          </a>
        </div>
        <ul className='side-menu'>
          <motion.li
            whileHover={{ color: '#ffffff' }}
            transition={{ duration: 0.1 }}
            className='sidebar-btn'
          >
            <NavLink to='/'>
              <i class='bx bxs-home'></i>
              <span>Home</span>
            </NavLink>
          </motion.li>
          <motion.li
            whileHover={{ color: '#ffffff' }}
            transition={{ duration: 0.1 }}
            className='sidebar-btn'
          >
            <NavLink to='/users'>
              <i class='bx bxs-user'></i>
              <span>Users</span>
            </NavLink>
          </motion.li>
          <motion.li
            whileHover={{ color: '#ffffff' }}
            transition={{ duration: 0.1 }}
            className='sidebar-btn'
          >
            <NavLink to='/lessons'>
              <i class='bx bx-book'></i>
              <span>Lessons</span>
            </NavLink>
          </motion.li>
        </ul>
      </div>
      <footer className='sidebar-footer'>
        <img src={logo} alt='logo' />
        <p>made by: Samuel Chen</p>
      </footer>
    </div>
  );
};
export default Sidebar;
