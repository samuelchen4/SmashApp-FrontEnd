import Axios from 'axios';
import React, { useState, useEffect } from 'react';

import NavAddUser from './NavAddUser';
import NavAddLesson from './NavAddLesson.js';
import './index.css';

const Navbar = () => {
  const domain = 'http//localhost:5000';
  const [isAddUser, setIsAddUser] = useState(false);
  const [isAddLesson, setIsAddLesson] = useState(false);
  const [isEditLesson, setIsEditLesson] = useState(false);

  const [lessonTypes, setLessonTypes] = useState([]);

  const active = (iconState) => {
    if (iconState) {
      return 'activeState';
    } else {
      return '';
    }
  };

  const clickAddUser = () => {
    setIsAddLesson(false);
    setIsEditLesson(false);
    setIsAddUser(!isAddUser);
  };

  const clickAddLesson = () => {
    setIsAddUser(false);
    setIsEditLesson(false);
    setIsAddLesson(!isAddLesson);
  };

  const clickEditLesson = () => {
    setIsAddUser(false);
    setIsAddLesson(false);
    setIsEditLesson(!isEditLesson);
  };

  // console.log(active(isAddUser));

  //Add Lesson stuff
  const [usersArr, setUsersArr] = useState([]);
  const [usersDropdown, setUsersDropdown] = useState([]);
  const [usersDropdownValue, setUsersDropdownValue] = useState(1);
  const getUsers = () => {
    Axios.get(`${domain}/navbar/addLesson/users`).then((res) => {
      console.log(res);
      setUsersArr(res.data);
    });
  };

  const renderUsersDropdown = () => {
    setUsersDropdown(
      usersArr.map((user) => {
        return (
          <option value={user.user_id}>
            {user.fn} {user.ln}
          </option>
        );
      })
    );
  };

  useEffect(() => {
    renderUsersDropdown();
  }, [usersArr]);

  const addUserDB = (e) => {
    e.preventDefault();
    // console.log(e.target.fn.value);
    Axios.post('http://localhost:5000/navbar/addUser', {
      fn: e.target.fn.value,
      ln: e.target.ln.value,
      dob: e.target.dob.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    }).then(() => {
      console.log('success');
      e.target.fn.value = '';
      e.target.ln.value = '';
      e.target.dob.value = '';
      e.target.phone.value = '';
      e.target.email.value = '';
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:5000/lessonType').then((res) => {
      // console.log(res.data);
      setLessonTypes(res.data.map((type) => type.type_name));
    });
  }, []);

  const addLessonDB = (e) => {
    e.preventDefault();
  };

  return (
    <div className='navbar'>
      <section>
        <button
          className={`add-user ${active(isAddUser)}`}
          onClick={clickAddUser}
        >
          <i className='bx bxs-user-plus'></i>
        </button>
        {isAddUser && <NavAddUser />}
      </section>
      <section>
        <button
          className={`add-lesson ${active(isAddLesson)}`}
          onClick={clickAddLesson}
        >
          <i className='bx bx-cart-add'></i>
        </button>
        {isAddLesson && <NavAddLesson />}
      </section>
      <section>
        <button
          className={`edit-lesson ${active(isEditLesson)}`}
          onClick={clickEditLesson}
        >
          <i className='bx bxs-edit'></i>
        </button>
        {isEditLesson && (
          <section className='drop-down'>
            <h3>Edit Lesson</h3>
            <form className='add-user'>
              <div className='name'>
                <input placeholder='First Name' name='first-name' type='text' />
                <input placeholder='Last Name' name='last-name' type='text' />
              </div>
              <input placeholder='Phone Number' name='phone' type='text' />
              <input placeholder='Email...' name='email' type='text' />
              <button className='dropDownSubmit'>Submit</button>
            </form>
          </section>
        )}
      </section>
    </div>
  );
};

export default Navbar;
