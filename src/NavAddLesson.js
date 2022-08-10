import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AgendaDatePicker from './AgendaDatePicker.js';
import { format } from 'date-fns';
import SelectStudents from './SelectStudents';

const NavAddLesson = () => {
  const domain = 'http://localhost:5000';
  const [usersArr, setUsersArr] = useState([]);
  const [usersDropdown, setUsersDropdown] = useState([]);
  const [usersDropdownValue, setUsersDropdownValue] = useState(1);

  const [lessonsArr, setLessonsArr] = useState([]);
  const [lessonsDropdown, setLessonsDropdown] = useState([]);
  const [lessonsDropdownValue, setLessonsDropdownValue] = useState(1);

  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const [partnerId1, setPartnerId1] = useState(0);
  const [partnerId2, setPartnerId2] = useState(0);
  const [partnerId3, setPartnerId3] = useState(0);

  useEffect(() => {
    getUsers();
    getLessons();
  }, []);

  const getUsers = () => {
    Axios.get(`${domain}/navbar/addLesson/users`).then((res) => {
      //   console.log(res);
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

  const getLessons = () => {
    Axios.get(`${domain}/navbar/addLesson/lessons`).then((res) => {
      //   console.log(res);
      setLessonsArr(res.data);
    });
  };

  const renderLessonsDropdown = () => {
    setLessonsDropdown(
      lessonsArr.map((lesson) => {
        return <option value={lesson.type_id}>{lesson.type_name}</option>;
      })
    );
  };

  useEffect(() => {
    renderUsersDropdown();
    renderLessonsDropdown();
  }, [usersArr, lessonsArr]);

  const purchase = () => {
    Axios.post(`${domain}/navbar/addLesson/purchase`, {
      userId: usersDropdownValue,
      typeId: lessonsDropdownValue,
      lessonDate: selectedDate,
      partnerId1,
      partnerId2,
      partnerId3,
    }).then((res) => console.log(res));
  };

  return (
    <section className='drop-down'>
      <h3>Add Lesson</h3>
      <form
        className='add-lesson'
        onSubmit={(e) => {
          e.preventDefault();
          purchase();
        }}
      >
        <label htmlFor='user'>User:</label>
        <select
          name='user'
          value={usersDropdownValue}
          onChange={(e) => {
            setUsersDropdownValue(e.target.value);
          }}
          placeholder='names...'
        >
          {usersDropdown}
        </select>
        <label htmlFor='lesson'>Lesson:</label>
        <select
          name='lesson'
          id='lesson-type'
          value={lessonsDropdownValue}
          onChange={(e) => {
            setLessonsDropdownValue(e.target.value);
          }}
          placeholder='lessons...'
        >
          {lessonsDropdown}
        </select>
        <AgendaDatePicker
          wrapperClassName='datePicker'
          setSelectedDate={setSelectedDate}
        />
        <div className='partners'>
          <SelectStudents
            users={usersArr}
            partnerId={partnerId1}
            setPartnerId={setPartnerId1}
          />
          <SelectStudents
            users={usersArr}
            partnerId={partnerId2}
            setPartnerId={setPartnerId2}
          />
          <SelectStudents
            users={usersArr}
            partnerId={partnerId3}
            setPartnerId={setPartnerId3}
          />
        </div>
        <button className='dropDownSubmit' type='submit'>
          Purchase
        </button>
      </form>
    </section>
  );
};

export default NavAddLesson;
