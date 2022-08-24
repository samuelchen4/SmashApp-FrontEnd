import React, { useState, useEffect } from 'react';
import Lessons from './Lessons';
import { motion, AnimatePresence } from 'framer-motion';
import LessonsTable from './LessonsTable';
import Axios from 'axios';

const PaymentsOwed = (student) => {
  const { user_id } = student;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const [isExpanded, setIsExpanded] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [lessonsInfo, setLessonsInfo] = useState([]);
  const [amountOwed, setAmountOwed] = useState(0);
  const [credit, setCredit] = useState(0);
  const [contacted, setContacted] = useState(false);

  //changes opacity of lessons based on action
  const [isExecuted, setIsExecuted] = useState(false);
  let actionExecuted = isExecuted ? 'good' : '';

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const haveContacted = () => {
    setIsExecuted(!isExecuted);
  };

  // const calcAmountOwed = () =>
  //   lessonsInfo.reduce((totalOwed, lesson) => {
  //     return totalOwed + lesson.price * lesson.lessonAmount * -1;
  //   }, 0);

//   const getCredits = () => {
//     Axios.get(`${domain}/tracker/user/credits`, {
//       params: {
//         userId: user_id,
//       },
//     })
//       .then((res) => {
//         console.log(res);
//         setCredit(res.data.credits);
//       })
//       .catch((err) => console.log(err));
//   };

  // get User info from user_id
  const getUserInfo = () => {
    const userId = user_id
    Axios.get(`${domain}/paytracker/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data.userInfo);
        setLessonsInfo(res.data.lessonInfo);
        setCredit(res.data.credits)
      })
      .catch((err) => console.log(err));
  };

  // query student info based on the student id passed from paymentTracker
  useEffect(() => {
    getUserInfo();
//     getCredits();
  }, []);

  useEffect(() => {
    setAmountOwed(
      lessonsInfo.reduce((totalOwed, lesson) => {
        return totalOwed + lesson.price * lesson.lessonAmount * -1;
      }, 0)
    );
  }, [lessonsInfo]);

  // console.log(lessonsInfo);
  // console.log(amountOwed);
  return (
    <motion.article
      // layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={`payment-block ${actionExecuted}`}
    >
      <h5>
        {userInfo.fn} {userInfo.ln}
      </h5>
      <div className='contact-info'>
        {userInfo.phone && <p>Phone: {userInfo.phone}</p>}
        {userInfo.email && <p>Email: {userInfo.email}</p>}
      </div>
      <div className='amount-owed'>
        <p>Amount Owed: ${amountOwed}</p>
        {credit ? <p>Credit: ${credit}</p> : <p>Credit: $0</p>}
        <div className='action-buttons'>
          <button onClick={haveContacted}>
            <i class='bx bx-check'></i>
          </button>
          <button onClick={toggleExpand}>
            <i class='bx bx-chevron-down'></i>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && <LessonsTable {...userInfo} />}
      </AnimatePresence>
    </motion.article>
  );
};

export default PaymentsOwed;
