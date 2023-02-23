import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { getLessons } from '../actions/lessonsActions';
import { getStudents } from '../actions/studentActions';
import { getPaytrackerInfo } from '../actions/paytrackerActions';
import { GET_LOGIN_SUCCESS } from '../constants/recept';
import Sidebar from '../sidemenu/Sidebar';
import Navbar from '../components/navbar/Navbar';
import UserBlock from '../components/users/UserBlock';
import MyLoader from '../components/MyLoader';
import '../styles/users.css';
import { motion } from 'framer-motion';

const UsersScreen = () => {
  const [renderUsers, setRenderUsers] = useState('');
  const [search, setSearch] = useState('');

  //TESTING REDUX
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();

  const lessons = useSelector((state) => state.lessons);
  const { isLoading: lessonLoading, lessonsList } = lessons;

  // get object from state first
  const students = useSelector((state) => state.students);
  const { list: studentList, isLoading } = students;

  const paytracker = useSelector((state) => state.paytracker);
  const { paytrackerList, isLoading: paytrackerLoading } = paytracker;

  useEffect(() => {
    // receptInfo
    if (isAuthenticated && !auth0Loading)
      dispatch({ type: GET_LOGIN_SUCCESS, payload: user });
    // lessons
    if (!lessonLoading && !lessonsList.length) dispatch(getLessons());
    // students
    if (!isLoading && !studentList.length) dispatch(getStudents());
    // paytracker
    if (!paytrackerLoading && !paytrackerList.length)
      dispatch(getPaytrackerInfo());
  }, [
    dispatch,
    isAuthenticated,
    auth0Loading,
    lessonLoading,
    lessonsList,
    isLoading,
    studentList,
    paytrackerLoading,
    paytrackerList,
  ]);

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
              {isLoading ? <MyLoader content='Loading...' /> : renderUsers}
            </motion.section>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;
