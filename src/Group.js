//AGENDA SUB COMPONENT FOR GROUP CLASSES
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Classlist from './Classlist';
import AddStudent from './AddStudent';
import { motion, AnimatePresence } from 'framer-motion';
import PieChart from './PieChart';

const Group = (groupInfo) => {
  const { type_name, duration, type_id, scheduleddate, capacity } = groupInfo;
  const lessonType = type_id;
  const typeName = type_name;
  const lessonDate = scheduleddate;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';

  // console.log(Array.isArray(students));
  //if classlist is open or not
  const [isOpenClasslist, setIsOpenClasslist] = useState(false);
  // if add users is open or not
  const [isOpenAddStudent, setIsOpenAddStudent] = useState(false);

  const [addStudentClicked, setAddStudentClicked] = useState(false);
  const [amountStudents, setAmountStudents] = useState(0);
  const [classlist, setClasslist] = useState([]);
  const [users, setUsers] = useState([]);

  //changes opacity of lessons based on action
  const [isExecuted, setIsExecuted] = useState(false);
  let actionExecuted = isExecuted ? 'Fade' : '';

  const getClasslist = () => {
    Axios.get(`${domain}/agenda/group/classlist/${lessonType}/${lessonDate}`)
      .then((res) => {
        console.log(res.data);
        setClasslist(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getUsers = () => {
    Axios.get(`${domain}/users`).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  };

  const displayClasslist = (e) => {
    e.preventDefault();
    setIsOpenClasslist(!isOpenClasslist);
  };

  const displayAddUser = (e) => {
    e.preventDefault();
    setIsOpenAddStudent(!isOpenAddStudent);
  };

  useEffect(() => {
    getClasslist();
    getUsers();
  }, []);

  return (
    <motion.section
      // layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={` groupClass`}
    >
      <div className='title'>
        <h5>{typeName}</h5>
        <PieChart amountStudents={amountStudents} capacity={capacity} />
      </div>

      <div className='lesson-info'>
        <p className='lesson-time'>{duration}</p>
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
              lessonType={lessonType}
              lessonDate={lessonDate}
              users={users}
              setUsers={setUsers}
              setAddStudentClicked={setAddStudentClicked}
              setClasslist={setClasslist}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpenClasslist && (
            <Classlist
              lessonType={lessonType}
              typeName={typeName}
              lessonDate={lessonDate}
              addStudentClicked={addStudentClicked}
              setAddStudentClicked={setAddStudentClicked}
              setAmountStudents={setAmountStudents}
              users={users}
              setUsers={setUsers}
              classlist={classlist}
              setClasslist={setClasslist}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

Group.defaultProps = {
  // time: 'no time',
  students: false,
};

export default Group;
