//AGENDA SUB COMPONENT FOR GROUP CLASSES
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Classlist from './Classlist';
import AddStudent from './AddStudent';
import { motion, AnimatePresence } from 'framer-motion';
import PieChart from '../lesson/PieChart';

const Group = (groupInfo) => {
  const {
    lessonName,
    duration,
    type_id,
    scheduleddate,
    capacity,
    getPaytrackerUsers,
    receptInfo,
    price,
  } = groupInfo;
  const lessonType = type_id;
  // const lessonName = type_name;
  const lessonDate = scheduleddate;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';

  // console.log(Array.isArray(students));
  //if classlist is open or not
  const [isOpenClasslist, setIsOpenClasslist] = useState(0);
  // if add users is open or not
  const [isOpenAddStudent, setIsOpenAddStudent] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const [addStudentClicked, setAddStudentClicked] = useState(0);
  const [amountStudents, setAmountStudents] = useState(0);
  const [classlist, setClasslist] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  const [users, setUsers] = useState([]);

  //changes opacity of lessons based on action
  // const [isExecuted, setIsExecuted] = useState(false);
  // let actionExecuted = isExecuted ? 'Fade' : '';

  useEffect(() => {
    getClasslist();
    getUsers();
  }, []);

  useEffect(() => {
    setIsChecked(
      classlist.map((user) => {
        return {
          userId: user.user_id,
          purchaseId: user.purchase_id,
          paid: user.paid,
          attended: user.attended,
          purchaseHandled: user.purchaseHandled,
          priceWithDiscountIncluded: user.priceWithDiscountIncluded,
        };
      })
    );
  }, [classlist]);

  const getClasslist = () => {
    Axios.get(`${domain}/agenda/group/classlist/${lessonType}/${lessonDate}`)
      .then((res) => {
        setClasslist(res.data);
        setIsDisabled(res.data[0].purchaseHandled ? true : false);
      })
      .catch((err) => console.log(err));
  };

  const getUsers = () => {
    Axios.get(`${domain}/users`).then((res) => {
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

    if (isOpenClasslist && isOpenAddStudent) {
      setIsOpenClasslist(0);
    } else {
      setIsOpenClasslist(1);
    }
  };

  const undoSubmitAttendace = async () => {
    await Promise.all(
      isChecked.map(async (student) => {
        const purchaseId = student.purchaseId;
        await Axios.put(`${domain}/agenda/private/${purchaseId}/undoSale`).then(
          (res) => {
            getPaytrackerUsers();
            setIsOpenClasslist(1);
            setIsDisabled(false);
          }
        );
      })
    );
  };

  return (
    <motion.section
      // layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={` groupClass`}
    >
      <section className='groupLesson'>
        <div className='title'>
          <h5>{lessonName}</h5>
          <PieChart amountStudents={amountStudents} capacity={capacity} />
        </div>

        <div className='lesson-info'>
          <p className='lesson-time'>{duration}</p>
        </div>
        <div className='agenda-main-action'>
          <button
            className='btn'
            disabled={isDisabled}
            onClick={displayAddUser}
          >
            Add
          </button>
          <button
            className='btn'
            disabled={isDisabled}
            onClick={displayClasslist}
          >
            Classlist
          </button>
          <button
            className='undoBtn'
            disabled={!isDisabled}
            onClick={undoSubmitAttendace}
          >
            <i class='bx bx-undo'></i>
          </button>
        </div>
        <div className='lesson-addon'>
          <AnimatePresence>
            {isOpenAddStudent && (
              <AddStudent
                lessonType={lessonType}
                lessonName={lessonName}
                lessonDate={lessonDate}
                lessonPrice={price}
                users={users}
                setUsers={setUsers}
                classlist={classlist}
                getClasslist={getClasslist}
                setAddStudentClicked={setAddStudentClicked}
                setClasslist={setClasslist}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                setIsOpenClasslist={setIsOpenClasslist}
                receptInfo={receptInfo}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isOpenClasslist && (
              <motion.div
                key='classlist'
                animate={{ maxHeight: 2000, opacity: 1 }}
                initial={{ maxHeight: 0, opacity: 0 }}
                exit={{
                  maxHeight: 0,
                  opacity: 0,
                  transition: { ease: 'linear', duration: 0.2 },
                }}
                transition={{ ease: 'linear', duration: 0.3 }}
              >
                <Classlist
                  lessonType={lessonType}
                  lessonName={lessonName}
                  lessonDate={lessonDate}
                  addStudentClicked={addStudentClicked}
                  setAddStudentClicked={setAddStudentClicked}
                  setAmountStudents={setAmountStudents}
                  users={users}
                  setUsers={setUsers}
                  classlist={classlist}
                  setClasslist={setClasslist}
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  setIsDisabled={setIsDisabled}
                  getPaytrackerUsers={getPaytrackerUsers}
                  setIsOpenClasslist={setIsOpenClasslist}
                  receptInfo={receptInfo}
                  setIsOpenAddStudent={setIsOpenAddStudent}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.section>
  );
};

Group.defaultProps = {
  // time: 'no time',
  students: false,
};

export default Group;
