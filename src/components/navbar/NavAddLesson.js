import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AgendaDatePicker from '../../AgendaDatePicker.js';
import { format } from 'date-fns';
import Select from 'react-select';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

const NavAddLesson = (propsFromNavbar) => {
  const { allUsers, allLessons, domain, setIsAddLesson, receptInfo } =
    propsFromNavbar;

  const [user, setUser] = useState({
    label: '',
    value: 0,
  });
  const [lesson, setLesson] = useState({
    label: '',
    value: 0,
    price: 0,
    isSemi: false,
  });
  const [usersDropdown, setUsersDropdown] = useState([]);
  // const [usersDropdownValue, setUsersDropdownValue] = useState(1);

  const [partners, setPartners] = useState([]);
  const [partnersDropdown, setPartnersDropdown] = useState([]);
  const [lessonsDropdown, setLessonsDropdown] = useState([]);
  // const [lessonsDropdownValue, setLessonsDropdownValue] = useState(1);

  const todaysDate = new Date();
  const [purchaseLessonDates, setPurchaseLessonDates] = useState([]);
  // const [quantity, setQuantity] = useState(1);
  // const [selectedDate, setSelectedDate] = useState(
  //   format(new Date(), 'yyyy-MM-dd')
  // );

  useEffect(() => {
    console.log(allUsers);
    renderUsersDropdown();
  }, [allUsers]);

  useEffect(() => {
    renderLessonsDropdown();
  }, [allLessons]);

  useEffect(() => {
    renderPartnerDropdown();
  }, [user.value]);

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

  const renderPartnerDropdown = () => {
    setPartnersDropdown(
      allUsers
        .filter((partner) => partner.user_id != user.value)
        .map((user) => {
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
        const isSemi = lesson.type_name.toLowerCase().includes('semi');
        return {
          label: lesson.type_name,
          value: lesson.type_id,
          price: lesson.price,
          isSemi,
        };
      })
    );
  };

  const purchase = async (e) => {
    e.preventDefault();
    Promise.all(
      purchaseLessonDates.map(async (purchaseLessonDate) => {
        const lessonDate = purchaseLessonDate.format();
        Axios.post(`${domain}/navbar/addLesson/purchase/user/${user.value}`, {
          lessonId: lesson.value,
          lessonName: lesson.label,
          lessonPrice: lesson.price,
          partnerArr: partners,
          purchaseLessonDate: lessonDate,
          receptInitials: receptInfo.userInitials,
        }).then((res) => console.log(res));
      })
    )
      .then((res) => {
        setUser({ label: '', value: 0 });
        setLesson({ label: '', value: 0, price: 0, isSemi: false });
        setPartners([]);
        setPurchaseLessonDates([]);
        setIsAddLesson(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(partners);
  }, [partners]);

  useEffect(() => {
    // console.log(purchaseLessonDate.toDate());
  }, [purchaseLessonDates]);

  return (
    <section className='drop-down'>
      <h3 className='add-lesson-title'>Add Lesson</h3>
      <form className='add-lesson' onSubmit={purchase}>
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
        {lesson.isSemi ? (
          <Select
            options={partnersDropdown}
            onChange={setPartners}
            placeholder='Select User'
            isDisabled={!lesson.isSemi}
            isSearchable
            isMulti
            noOptionsMessage={() => `Student not found`}
          />
        ) : (
          ''
        )}
        <DatePicker
          name='dates'
          format='YYYY/MM/DD'
          placeholder='Select Date'
          multiple
          plugins={[<DatePanel />]}
          value={purchaseLessonDates}
          onChange={setPurchaseLessonDates}
          minDate={todaysDate}
          style={{
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            margin: '0',
            border: '1px solid grey',
          }}
          containerStyle={{
            // width: '100%',
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

export default NavAddLesson;
