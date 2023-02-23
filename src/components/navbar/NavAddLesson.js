import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserLesson } from '../../actions/navbarActions';
import Select from 'react-select';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

const NavAddLesson = ({ setIsAddLesson }) => {
  // REDUX
  const dispatch = useDispatch();
  const { list: studentList, isLoading: studentListLoading } = useSelector(
    (state) => state.students
  );
  const { lessonsList, isLoading: lessonsListLoading } = useSelector(
    (state) => state.lessons
  );
  // END REDUX

  // inputs
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
  const [partners, setPartners] = useState([]);
  const [purchaseLessonDates, setPurchaseLessonDates] = useState([]);

  // options
  const [usersDropdown, setUsersDropdown] = useState([]);
  const [partnersDropdown, setPartnersDropdown] = useState([]);
  const [lessonsDropdown, setLessonsDropdown] = useState([]);
  const todaysDate = new Date();

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

  const renderPartnerDropdown = () => {
    setPartnersDropdown(
      studentList
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
      lessonsList.map((lesson) => {
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

  // create options
  useEffect(() => {
    if (!studentListLoading) {
      renderUsersDropdown();
      renderPartnerDropdown();
    }
    if (!lessonsListLoading) renderLessonsDropdown();
  }, [studentListLoading, lessonsListLoading, studentList, lessonsList]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user.value) alert(`no student selected!`);
    else if (!lesson.value) alert(`no lesson selected!`);
    else if (!purchaseLessonDates.length) alert(`no dates selected!`);
    else {
      dispatch(
        addUserLesson(user.value, purchaseLessonDates, lesson, partners)
      );
      setIsAddLesson(false);
    }
  };

  return (
    <section className='drop-down'>
      <h3 className='add-lesson-title'>Add Lesson</h3>
      <form className='add-lesson' onSubmit={submitHandler}>
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
          isDisabled={user.value ? false : true}
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
