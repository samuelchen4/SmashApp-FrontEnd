import React, { useState, useEffect } from 'react';
import Sidebar from './sidemenu/Sidebar';
import Navbar from './Navbar';
import Axios from 'axios';
import UserBlock from './UserBlock';
import './users.css';
import { motion, AnimatePresence } from 'framer-motion';

const Users = () => {
  const domain = 'http://localhost:5000';
  const [users, setUsers] = useState([]);
  const [renderUsers, setRenderUsers] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('ASC');

  const getUsers = () => {
    Axios.get(`https://fzkytcnpth.execute-api.us-west-2.amazonaws.com/users`)
      .then((res) => {
        // console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, [sortBy]);

  useEffect(() => {
    setRenderUsers(
      users
        .filter((user) => {
          if (!search) {
            return user;
          } else if (
            `${user.fn} ${user.ln}`.toLowerCase().includes(search.toLowerCase())
          ) {
            return user;
          }
        })
        .map((user) => {
          console.log(user);
          return (
            <motion.article
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              // transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1, cursor: 'pointer' }}
              layout
              key={user.user_id}
              className='users'
            >
              <UserBlock {...user} />
            </motion.article>
          );
        })
    );
  }, [users, search]);

  // console.log(renderUsers);
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
            className='container'
          >
            <h2>USERS</h2>
            <form className='userControls'>
              <div className='search'>
                <input
                  placeholder='search...'
                  name='searchName'
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i class='bx bx-search-alt'></i>
              </div>
              <select
                name='sort-by'
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value='ASC'>Ascending</option>
                <option value='DESC'>Descending</option>
              </select>
            </form>
            <motion.section layout className='user-grid'>
              {renderUsers}
            </motion.section>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Users;
