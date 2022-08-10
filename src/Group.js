//AGENDA SUB COMPONENT FOR GROUP CLASSES
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Classlist from './Classlist';
import AddStudent from './AddStudent';
import { motion, AnimatePresence } from 'framer-motion';
import PieChart from './PieChart';

const Group = (groupInfo) => {
  const {
    type_name,
    students,
    time,
    type_id,
    user_id,
    selectedDate,
    price,
    capacity,
  } = groupInfo;
  // console.log(Array.isArray(students));
  //if classlist is open or not
  const [isOpenClasslist, setIsOpenClasslist] = useState(false);
  // if add users is open or not
  const [isOpenAddStudent, setIsOpenAddStudent] = useState(false);

  const [addStudentClicked, setAddStudentClicked] = useState(false);
  const [amountStudents, setAmountStudents] = useState(0);

  const [userIdArr, setUserIdArr] = useState([]);

  //changes opacity of lessons based on action
  const [isExecuted, setIsExecuted] = useState(false);
  let actionExecuted = isExecuted ? 'Fade' : '';

  const displayClasslist = (e) => {
    e.preventDefault();
    setIsOpenClasslist(!isOpenClasslist);
  };

  const displayAddUser = (e) => {
    e.preventDefault();
    setIsOpenAddStudent(!isOpenAddStudent);
  };

  // const getNumberStudents = () => {
  //   Axios.get(`${domain}/agenda/group/capacity`, {
  //     params: {
  //       type_id,
  //     },
  //   }).then((res) => console.log(res));
  // };

  // useEffect(() => {
  //   const addStudent = () => {
  //     const newStudent = { name: studentInfo, attendance: true };
  //     students.push(newStudent);
  //     console.log('added user');
  //   };
  //   addStudent(studentInfo);
  // }, [studentInfo]);

  return (
    <motion.section
      // layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={` groupClass`}
    >
      <div className='title'>
        <h5>{type_name}</h5>
        <PieChart amountStudents={amountStudents} capacity={capacity} />
      </div>

      <div className='lesson-info'>
        <p className='lesson-time'>{time}</p>
      </div>
      <div className='agenda-main-action'>
        <button className='btn' onClick={displayAddUser}>
          Add
        </button>
        <button className='btn' onClick={displayClasslist}>
          Classlist
        </button>
        <button
          className='undoBtn'
          // disabled={!isDisabled}
          // onClick={() => undo()}
        >
          <i class='bx bx-undo'></i>
        </button>
      </div>
      <div className='lesson-addon'>
        <AnimatePresence>
          {isOpenAddStudent && (
            <AddStudent
              typeId={type_id}
              selectedDate={selectedDate}
              setAddStudentClicked={setAddStudentClicked}
              userIdArr={userIdArr}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpenClasslist && (
            <Classlist
              students={students}
              type_id={type_id}
              typeName={type_name}
              selectedDate={selectedDate}
              addStudentClicked={addStudentClicked}
              setAddStudentClicked={setAddStudentClicked}
              setAmountStudents={setAmountStudents}
              setUserIdArr={setUserIdArr}
              price={price}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

Group.defaultProps = {
  time: 'no time',
  students: false,
};

export default Group;
