import React, { useState, useEffect } from 'react';
import Lessons from './Lessons';
import { motion, AnimatePresence } from 'framer-motion';
import LessonsTable from './LessonsTable';
import Axios from 'axios';

const PaymentsOwed = (student) => {
  const {
    user_id,
    fn,
    ln,
    email,
    phone,
    dob,
    contacted,
    payForOwedLessons,
    paytrackerData,
  } = student;
  const userId = user_id;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const [isExpanded, setIsExpanded] = useState(false);
  // const [userInfo, setUserInfo] = useState('');
  const [lessonsInfo, setLessonsInfo] = useState([]);
  const [amountOwed, setAmountOwed] = useState(0);
  const [credit, setCredit] = useState(0);
  const [everyOverdueLesson, setEveryOverdueLesson] = useState([]);
  const [didContact, setDidContact] = useState(contacted);
  // const [overdueLessonsInfo, setOverdueLessonsInfo] = useState([]);

  //changes opacity of lessons based on action
  // const [isExecuted, setIsExecuted] = useState(false);
  let actionExecuted = didContact ? 'good' : '';

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  // const haveContacted = () => {
  //   setIsExecuted(!isExecuted);
  // };

  // change contactedStatus on DB
  const changeContactedStatus = () => {
    Axios.put(`${domain}/paytracker/user/${userId}/changeContacted`, {
      contactedStatus: !contacted,
    }).then(setDidContact(!contacted));
  };

  // get User info from user_id
  const getUserInfo = () => {
    Axios.get(`${domain}/paytracker/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        // setUserInfo(res.data.userInfo);
        setEveryOverdueLesson(res.data.everyOverdueLesson);
        setLessonsInfo(res.data.lessonInfo); //amount of lessons owe per type of lesson
        setCredit(res.data.credits.credit); //credits avaliable
        setAmountOwed(res.data.amountOwed.amountOwed); //amount Owed
        // setOverdueLessonsInfo(res.data.overdueLessonsInfo);
      })
      .catch((err) => console.log(err));
  };

  // query student info based on the student id passed from paymentTracker
  useEffect(() => {
    getUserInfo();
    //     getCredits();
  }, []);

  // useEffect(() => {
  //   setAmountOwed(
  //     lessonsInfo.reduce((totalOwed, lesson) => {
  //       return totalOwed + lesson.price * lesson.lessonAmount * -1;
  //     }, 0)
  //   );
  // }, [lessonsInfo]);

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
        {fn} {ln}
      </h5>
      <div className='contact-info'>
        {phone && <p>Phone: {phone}</p>}
        {email && <p>Email: {email}</p>}
      </div>
      <div className='amount-owed'>
        <p>Amount Owed: ${amountOwed}</p>
        {credit ? <p>Credit: ${credit}</p> : <p>Credit: $0</p>}
        <div className='action-buttons'>
          <button onClick={changeContactedStatus}>
            <i class='bx bx-check'></i>
          </button>
          <button onClick={() => payForOwedLessons(everyOverdueLesson, userId)}>
            <i class='bx bx-purchase-tag-alt'></i>
          </button>
          <button onClick={toggleExpand}>
            <i class='bx bx-chevron-down'></i>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && <LessonsTable lessonsInfo={lessonsInfo} />}
      </AnimatePresence>
    </motion.article>
  );
};

export default PaymentsOwed;
