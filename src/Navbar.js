import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import NavAddUser from './NavAddUser';
import NavAddLesson from './NavAddLesson.js';
import './index.css';
import NavChangeLessonDate from './NavChangeLessonDate';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const { user, isLoading } = useAuth0();
  const [isAddUser, setIsAddUser] = useState(false);
  const [isAddLesson, setIsAddLesson] = useState(false);
  const [isEditLesson, setIsEditLesson] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allLessons, setAllLessons] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      console.log(user);
    }
  }, [isLoading]);

  const [addUserInfo, setAddUserInfo] = useState({
    fn: '',
    ln: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleEditAddUserInfo = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newUserInfo = {
      ...addUserInfo,
    };

    newUserInfo[fieldName] = fieldValue;

    setAddUserInfo(newUserInfo);
  };

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

  // const renderUsersDropdown = () => {
  //   setUsersDropdown(
  //     usersArr.map((user) => {
  //       return (
  //         <option value={user.user_id}>
  //           {user.fn} {user.ln}
  //         </option>
  //       );
  //     })
  //   );
  // };

  // useEffect(() => {
  //   renderUsersDropdown();
  // }, [usersArr]);

  const addUserDB = (e) => {
    e.preventDefault();
    // console.log(e.target.fn.value);
    const submitAddUserData = { ...addUserInfo };
    Axios.post(`${domain}/navbar/addNewUser`, {
      fn: submitAddUserData.fn,
      ln: submitAddUserData.ln,
      dob: submitAddUserData.dob,
      phone: submitAddUserData.phone,
      email: submitAddUserData.email,
    })
      .then(() => {
        setAllUsers([...allUsers, submitAddUserData]);
        setAddUserInfo({ fn: '', ln: '', email: '', phone: '', dob: '' });
        setIsAddUser(false);
      })
      .catch((err) => console.log(err));
  };

  const getAddLessonsInfo = () => {
    Axios.get(`${domain}/navbar/addLesson/Info`)
      .then((res) => {
        console.log(res);
        setAllUsers(res.data.allUsers);
        setAllLessons(res.data.allLessons);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAddLessonsInfo();
  }, []);

  return (
    <div className='navbar'>
      <section>
        <button
          className={`add-user ${active(isAddUser)}`}
          onClick={clickAddUser}
        >
          <i className='bx bxs-user-plus'></i>
        </button>
        {isAddUser && (
          <NavAddUser
            addUserDB={addUserDB}
            handleEditAddUserInfo={handleEditAddUserInfo}
            addUserInfo={addUserInfo}
            setAddUserInfo={setAddUserInfo}
          />
        )}
      </section>
      <section>
        <button className={` ${active(isAddLesson)}`} onClick={clickAddLesson}>
          <i className='bx bx-cart-add'></i>
        </button>
        {isAddLesson && (
          <NavAddLesson
            allUsers={allUsers}
            allLessons={allLessons}
            domain={domain}
            setIsAddLesson={setIsAddLesson}
            receptInfo={user}
          />
        )}
      </section>
      <section>
        <button
          className={`edit-lesson ${active(isEditLesson)}`}
          onClick={clickEditLesson}
        >
          <i className='bx bxs-edit'></i>
        </button>
        {isEditLesson && (
          <NavChangeLessonDate
            allUsers={allUsers}
            allLessons={allLessons}
            domain={domain}
          />
        )}
      </section>
      <section>
        <LogoutButton />
      </section>
    </div>
  );
};

export default Navbar;
