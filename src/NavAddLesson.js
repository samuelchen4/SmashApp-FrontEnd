import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AgendaDatePicker from './AgendaDatePicker.js';
import { format } from 'date-fns';
import Select from 'react-select';
import DatePicker from 'react-multi-date-picker';

const NavAddLesson = (propsFromNavbar) => {
  const { allUsers, allLessons, domain } = propsFromNavbar;

  const [user, setUser] = useState({});
  const [lesson, setLesson] = useState({});
  const [usersDropdown, setUsersDropdown] = useState([]);
  const [usersDropdownValue, setUsersDropdownValue] = useState(1);

  const [partners, setPartners] = useState([]);
  const [lessonsDropdown, setLessonsDropdown] = useState([]);
  const [lessonsDropdownValue, setLessonsDropdownValue] = useState(1);

  const [purchaseLessonDate, setPurchaseLessonDate] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  // const [partnerId1, setPartnerId1] = useState(0);
  // const [partnerId2, setPartnerId2] = useState(0);
  // const [partnerId3, setPartnerId3] = useState(0);

  useEffect(() => {
    renderUsersDropdown();
  }, [allUsers]);

  useEffect(() => {
    renderLessonsDropdown();
  }, [allLessons]);

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

  const renderLessonsDropdown = () => {
    setLessonsDropdown(
      allLessons.map((lesson) => {
        return {
          label: lesson.type_name,
          value: lesson.type_id,
          price: lesson.price,
        };
      })
    );
  };

  const purchase = () => {
    Axios.post(`${domain}/navbar/addLesson/purchase`, {
      userId: user,
      typeId: lessonsDropdownValue,
      lessonDate: selectedDate,
    }).then((res) => console.log(res));
  };

  useEffect(() => {
    console.log(partners);
  }, [partners]);

  useEffect(() => {
    console.log(purchaseLessonDate.toDate());
  }, [purchaseLessonDate]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
        <Select
          options={usersDropdown}
          onChange={setUser}
          placeholder='Select User'
          isSearchable
          noOptionsMessage={() => `Student not found`}
        />
        <Select
          options={lessonsDropdown}
          onChange={setLesson}
          placeholder='Select Lesson'
          isSearchable
          noOptionsMessage={() => `Student not found`}
        />
        <DatePicker
          placeholder='Select Date'
          value={purchaseLessonDate}
          onChange={setPurchaseLessonDate}
          style={{
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            // height: '26px',
          }}
          // containerStyle={{
          //   width: '100%',
          //   height: '100%',
          // }}
        />
        <Select
          options={usersDropdown}
          onChange={setPartners}
          placeholder='Select User'
          isSearchable
          isMulti
          noOptionsMessage={() => `Student not found`}
        />
        {/* <div className='partners'>
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
        </div> */}
        <button className='dropDownSubmit' type='submit'>
          Purchase
        </button>
      </form>
    </section>
  );
};

export default NavAddLesson;
