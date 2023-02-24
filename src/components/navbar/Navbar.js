import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NavAddUser from './NavAddUser';
import NavAddLesson from './NavAddLesson.js';
import '../../styles/index.css';
import NavChangeLessonDate from './NavChangeLessonDate';
import LogoutButton from '../auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../../actions/studentActions';

const Navbar = () => {
  const [isAddUser, setIsAddUser] = useState(false);
  const [isAddLesson, setIsAddLesson] = useState(false);
  const [isEditLesson, setIsEditLesson] = useState(false);

  const dispatch = useDispatch();
  const { list: studentList } = useSelector((state) => state.students);

  const [addUserInfo, setAddUserInfo] = useState({
    fn: '',
    ln: '',
    email: '',
    phone: '',
    dob: '',
  });

  // submits user data
  const submitUserHandler = (e) => {
    e.preventDefault();
    const { fn, ln } = addUserInfo;

    if (!fn.length || !ln.length) alert(`no first name or last name`);
    // check if user already exists in data base
    else if (
      !studentList.some((student) => student.fn === fn && student.ln === ln)
    ) {
      // dispatch add user
      dispatch(addStudent(addUserInfo));
    } else {
      window.alert(`${fn} ${ln} already exists in database`);
    }
    setIsAddUser(false);
  };

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
            handleEditAddUserInfo={handleEditAddUserInfo}
            addUserInfo={addUserInfo}
            submitUserHandler={submitUserHandler}
          />
        )}
      </section>
      <section>
        <button className={` ${active(isAddLesson)}`} onClick={clickAddLesson}>
          <i className='bx bx-cart-add'></i>
        </button>
        {isAddLesson && <NavAddLesson setIsAddLesson={setIsAddLesson} />}
      </section>
      <section>
        <button
          className={`edit-lesson ${active(isEditLesson)}`}
          onClick={clickEditLesson}
        >
          <i className='bx bxs-edit'></i>
        </button>
        {isEditLesson && (
          <NavChangeLessonDate setIsEditLesson={setIsEditLesson} />
        )}
      </section>
      <section>
        <LogoutButton />
      </section>
    </div>
  );
};

export default Navbar;
