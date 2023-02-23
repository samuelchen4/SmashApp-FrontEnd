import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, updateUserLesson } from '../../actions/navbarActions';
import Select from 'react-select';
import DatePicker from 'react-multi-date-picker';

const NavChangeLessonDate = ({ setIsEditLesson }) => {
  // REDUX
  const dispatch = useDispatch();
  const { list: studentList, isLoading: studentListLoading } = useSelector(
    (state) => state.students
  );

  const { isLoading: getUserInfoLoading, lessonChanged } = useSelector(
    (state) => state.navbarUserInfo.changeLesson
  );

  const { unattendedLessons } = lessonChanged;
  // END REDUX

  // inputs
  const todaysDate = new Date();
  const [user, setUser] = useState({
    label: '',
    value: 0,
  });
  const [userLesson, setUserLesson] = useState({
    label: '',
    value: 0,
    userId: 0,
  });

  // reload navbar state when user input changes
  useEffect(() => {
    dispatch(getUserInfo(user.value));
  }, [user]);

  // render options
  useEffect(() => {
    renderUsersDropdown();
  }, [studentList]);

  useEffect(() => {
    if (!getUserInfoLoading) filterLessonsByUser();
    if (getUserInfoLoading)
      setUserLesson({
        label: '',
        value: 0,
        userId: 0,
      });
  }, [user, getUserInfoLoading]);

  const filterLessonsByUser = () => {
    if (unattendedLessons.length) {
      setUserLessonsDropdown(
        unattendedLessons.map((lesson) => {
          const lessonDate = lesson.scheduleddate
            ? lesson.scheduleddate.slice(0, 10)
            : 'N/A';
          return {
            label: `${lesson.lessonName} ${lessonDate}`,
            value: lesson.purchase_id,
            userId: lesson.user_id,
            lessonDate,
          };
        })
      );
    }
  };

  const renderUsersDropdown = () => {
    setUsersDropdown(
      studentList.map((user) => {
        return {
          label: `${user.fn} ${user.ln}`,
          value: user.user_id,
        };
      })
    );
  };

  // work flow
  // 1) select user -> get unattended lessons -> set redux -> setUserLessonsDropdown -> submit new date

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user.value) alert(`no user selected!`);
    else if (!userLesson.value) alert(`no lesson selected!`);
    else if (!newLessonDate) alert(`no date selected!`);
    else {
      dispatch(updateUserLesson(userLesson, newLessonDate));
      setIsEditLesson(false);
    }
  };

  const [usersDropdown, setUsersDropdown] = useState([]);
  const [userLessonsDropdown, setUserLessonsDropdown] = useState([]);
  const [newLessonDate, setNewLessonDate] = useState({});

  return (
    <section className='drop-down'>
      <h3 className='add-lesson-title'>Change Lesson Date</h3>
      <form className='add-lesson' onSubmit={submitHandler}>
        <Select
          options={usersDropdown}
          onChange={setUser}
          placeholder='Select User'
          isSearchable
          noOptionsMessage={() => `Student not found`}
        />
        <Select
          options={userLessonsDropdown}
          onChange={setUserLesson}
          value={userLesson}
          placeholder='Select Lesson'
          isDisabled={user.value && !getUserInfoLoading ? false : true}
          isSearchable
          noOptionsMessage={() => `No lesson found`}
        />

        <DatePicker
          name='dates'
          format='YYYY/MM/DD'
          placeholder='Select Date'
          value={newLessonDate}
          onChange={setNewLessonDate}
          minDate={todaysDate}
          style={{
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            margin: '0',
            border: '1px solid grey',
          }}
          containerStyle={{
            width: '100%',
            height: '100%',
          }}
        />
        <button className='dropDownSubmit' type='submit'>
          Purchase
        </button>
      </form>
    </section>
  );
};

export default NavChangeLessonDate;
