import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AgendaDatePicker from '../../AgendaDatePicker.js';
import { format } from 'date-fns';
import Select from 'react-select';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

const NavChangeLessonDate = (propsFromNavbar) => {
  const { allUsers, allLessons, domain } = propsFromNavbar;
  const todaysDate = new Date();

  const [user, setUser] = useState({
    label: '',
    value: 0,
  });
  const [usersDropdown, setUsersDropdown] = useState([]);

  const [lessons, setLessons] = useState([]);
  const [userLesson, setUserLesson] = useState({
    label: '',
    value: 0,
    userId: 0,
  });
  const [userLessonsDropdown, setUserLessonsDropdown] = useState([]);
  const [newLessonDate, setNewLessonDate] = useState({});

  //need user
  //lessons
  //method for retrieving lessons based on userId

  //get all lessons with attended = 0, handledPurchase = 0
  const getUserLessons = () => {
    Axios.get(`${domain}/navbar/changeLesson/getUserLessons`).then((res) => {
      console.log(res.data);
      setLessons(res.data);
    });
  };

  const filterLessonsByUser = () => {
    setUserLessonsDropdown(
      lessons
        .filter((lesson) => lesson.user_id == user.value)
        .map((lesson) => {
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
  };

  useEffect(() => {
    getUserLessons();
  }, []);

  useEffect(() => {
    filterLessonsByUser();
    setUserLesson('Select Lesson...');
  }, [user.value]);

  useEffect(() => {
    renderUsersDropdown();
  }, [allUsers]);

  const renderUsersDropdown = () => {
    setUsersDropdown(
      allUsers.map((user) => {
        return {
          label: `${user.fn} ${user.ln}`,
          value: user.user_id,
        };
      })
    );
  };

  const changeLessonDate = (e) => {
    e.preventDefault();

    //change lesson date based on purchase Id
    //purchaseId is the value property in userLesson object
    Axios.put(`${domain}/navbar/changeLesson/purchase/${userLesson.value}`, {
      newLessonDate: newLessonDate.format(),
    })
      .then((res) => {
        console.log(res);
        setUser({
          label: '',
          value: 0,
        });
        setUserLesson({
          label: '',
          value: 0,
          userId: 0,
        });
        setNewLessonDate({});
      })
      .catch((err) => console.log(err));
  };

  //   const purchase = async (e) => {
  //     e.preventDefault();
  //     Promise.all(
  //       purchaseLessonDates.map(async (purchaseLessonDate) => {
  //         const lessonDate = purchaseLessonDate.format();
  //         Axios.post(`${domain}/navbar/addLesson/purchase/user/${user.value}`, {
  //           lessonId: lesson.value,
  //           lessonName: lesson.label,
  //           lessonPrice: lesson.price,
  //           partnerArr: partners,
  //           purchaseLessonDate: lessonDate,
  //         }).then((res) => console.log(res));
  //       })
  //     )
  //       .then((res) => {
  //         setUser({ label: '', value: 0 });
  //         setLesson({ label: '', value: 0, price: 0, isSemi: false });
  //         setPartners([]);
  //         setPurchaseLessonDates([]);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return (
    <section className='drop-down'>
      <h3 className='add-lesson-title'>Change Lesson Date</h3>
      <form className='add-lesson' onSubmit={changeLessonDate}>
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
          isDisabled={user.value ? false : true}
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
        <button
          className='dropDownSubmit'
          // className='frontPageButton'
          type='submit'
        >
          Purchase
        </button>
      </form>
    </section>
  );
};

export default NavChangeLessonDate;
