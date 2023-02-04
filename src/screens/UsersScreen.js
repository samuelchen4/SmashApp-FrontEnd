import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../actions/studentActions';
import Sidebar from '../sidemenu/Sidebar';
import Navbar from '../Navbar';
import Axios from 'axios';
import UserBlock from '../UserBlock';
import Loader from '../components/Loader';
import '../users.css';
import { motion } from 'framer-motion';

const UsersScreen = () => {
  const [renderUsers, setRenderUsers] = useState('');
  const [search, setSearch] = useState('');

  //TESTING REDUX
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  // get object from state first
  const students = useSelector((state) => state.students);
  const { list: studentList, isLoading } = students;

  useEffect(() => {
    setRenderUsers(
      studentList
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
  }, [studentList, search]);

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
                <i className='bx bx-search-alt'></i>
              </div>
              <select
                name='sort-by'
                // onChange={(e) => setSortBy(e.target.value)}
              >
                <option value='ASC'>Ascending</option>
                <option value='DESC'>Descending</option>
              </select>
            </form>
            <motion.section layout className='user-grid'>
              {isLoading ? <Loader /> : renderUsers}
            </motion.section>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;
