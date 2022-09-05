// adding student to Agenda group classlist
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import SelectSearch from 'react-select-search';
import './react-select-search.css';

const AddStudent = (propsFromGroup) => {
  const { lessonType, lessonDate, users, setUsers, setClasslist } =
    propsFromGroup;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  // const currentDate = format(new Date(), 'yyyy-MM-dd');
  // console.log(selectedDate);
  // console.log(typeId);
  // const [studentfn, setStudentfn] = useState('');
  // const [studentln, setStudentln] = useState('');
  // const [studentPhone, setStudentPhone] = useState('');
  // const [studentEmail, setStudentEmail] = useState('');

  // const [usersArr, setUsersArr] = useState([]);
  const [usersDropdown, setUsersDropdown] = useState([]);
  const [usersDropdownValue, setUsersDropdownValue] = useState(1);

  useEffect(() => {
    setPartnerDropdownData();
  }, []);

  // const getUsers = () => {
  //   //get Users for dropdown menu
  //   Axios.get(`${domain}/navbar/addLesson/users`).then((res) => {
  //     // console.log(res.data);
  //     setUsersArr(res.data);
  //   });
  // };

  const setPartnerDropdownData = () => {
    setUsersDropdown(
      users.map((user) => {
        return {
          name: `${user.fn} ${user.ln}`,
          value: user.user_id,
        };
      })
    );
  };

  // const renderUsersDropdown = () => {
  //   setUsersDropdown(
  //     usersArr.map((user) => {
  //       return (
  //         <option value={user.user_id} key={user.user_id}>
  //           {user.fn} {user.ln}
  //         </option>
  //       );
  //     })
  //   );
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   addStudentDB();
  //   setAddStudentClicked(true);

  //   setStudentfn('');
  //   setStudentln('');
  //   setStudentPhone('');
  //   setStudentEmail('');
  // };

  // const addStudentDB = () => {
  //   if (!userIdArr.includes(Number(usersDropdownValue))) {
  //     Axios.post(`${domain}/agenda/add`, {
  //       // fn: studentfn,
  //       // ln: studentln,
  //       // phone: studentPhone,
  //       // email: studentEmail,
  //       // typeId: typeId,
  //       // scheduledDate: selectedDate,

  //       userId: usersDropdownValue,
  //       scheduledDate: selectedDate,
  //       typeId,
  //     })
  //       .then((res) => {
  //         console.log(
  //           `User ${usersDropdownValue} was added to ${typeId} on ${selectedDate}`
  //         );
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else if (userIdArr.includes(Number(usersDropdownValue))) {
  //     alert(`This user has already been added to this class!`);
  //   }
  // };
  // console.log(`${studentfn} ${studentln}`);
  // console.log(userIdArr);
  return (
    <motion.form
      animate={{ maxHeight: 200, opacity: 1 }}
      initial={{ maxHeight: 0, opacity: 0 }}
      exit={{ maxHeight: 0, opacity: 0 }}
      transition={{ ease: 'linear', duration: 0.3 }}
      // onSubmit={onSubmit}
    >
      <div className='name'>
        {/* <div className='names'>
          <input
            type='text'
            name='fn'
            placeholder='firstname...'
            value={studentfn}
            onChange={(e) => setStudentfn(e.target.value)}
          />
          <input
            type='text'
            name='ln'
            placeholder='lastname...'
            value={studentln}
            onChange={(e) => setStudentln(e.target.value)}
          />
        </div>
        <input
          type='text'
          name='phone'
          placeholder='phone...'
          value={studentPhone}
          onChange={(e) => setStudentPhone(e.target.value)}
        />
        <input
          type='text'
          name='email'
          placeholder='email...'
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
        /> */}
        {/* <label htmlFor='user'>User:</label>
        <select
          name='user'
          value={usersDropdownValue}
          onChange={(e) => {
            setUsersDropdownValue(e.target.value);
            console.log(usersDropdownValue);
          }}
          placeholder='names...'
        >
          {usersDropdown}
        </select> */}
        <SelectSearch
          className='select-search'
          options={usersDropdown}
          multiple
          search
          placeholder='Select Student'
        />
      </div>
      <button type='submit'>Add Student</button>
    </motion.form>
  );
};

export default AddStudent;
