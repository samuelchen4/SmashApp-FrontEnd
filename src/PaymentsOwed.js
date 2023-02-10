import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LessonsTable from './LessonsTable';
import Axios from 'axios';
import PaytrackerPurchaseModal from './PaytrackerPurchaseModal';

const PaymentsOwed = (student) => {
  const {
    user_id,
    fn,
    ln,
    email,
    phone,
    dob,
    contacted,
    contactedBy,
    isCg,
    receptInfo,
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
  const [unpaidLessons, setUnpaidLessons] = useState([]);
  const [didContact, setDidContact] = useState(contacted);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isContactedBy, setIsContactedBy] = useState(contactedBy);
  // const [contactedBy, setContactedBy] = useState('D.L.');

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
    let contactInitials = receptInfo.userInitials;
    if (didContact) contactInitials = '';

    Axios.put(`${domain}/paytracker/user/${userId}/changeContacted`, {
      contactedStatus: !contacted,
      contactedBy: contactInitials,
    })
      .then((res) => {
        console.log(res);
        setDidContact(!didContact);
        setIsContactedBy(contactInitials);
      })
      .catch((err) => console.log(err));
  };

  // get User info from user_id
  const getUserInfo = () => {
    Axios.get(`${domain}/paytracker/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        // setUserInfo(res.data.userInfo);
        setEveryOverdueLesson(res.data.everyOverdueLesson); //purchase ids of owed lessons
        setLessonsInfo(res.data.lessonInfo); //amount of lessons owe per type of lesson
        setCredit(res.data.credits.credit); //credits avaliable
        setAmountOwed(res.data.amountOwed.amountOwed); //amount Owed
        // setOverdueLessonsInfo(res.data.overdueLessonsInfo);
        setUnpaidLessons(res.data.unpaidLessons);
      })
      .then(console.log(unpaidLessons))
      .catch((err) => console.log(err));
  };

  // query student info based on the student id passed from paymentTracker
  useEffect(() => {
    getUserInfo();
    //     getCredits();
  }, []);

  return (
    <motion.article
      // layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={`payment-block ${actionExecuted}`}
    >
      <div className='payTracker-title'>
        <h5>
          {fn} {ln} {isCg ? '💖' : ''}
        </h5>
        <h5>{isContactedBy ? isContactedBy : ''}</h5>
      </div>

      <div className='contact-info'>
        {phone && <p>Phone: {phone}</p>}
        {email && <p>Email: {email}</p>}
      </div>
      <div className='amount-owed'>
        <p>Amount Owed: ${amountOwed}</p>
        {credit ? <p>Credit: ${credit}</p> : <p>Credit: $0</p>}
        <div className='action-buttons'>
          <button className='frontPageButton' onClick={changeContactedStatus}>
            <i class='bx bx-envelope'></i>
          </button>
          <button
            className='frontPageButton'
            // onClick={() => payForOwedLessons(everyOverdueLesson, userId)}
            onClick={() => setIsModalOpen(true)}
          >
            <i class='bx bx-dollar'></i>
          </button>
          <button className='frontPageButton' onClick={toggleExpand}>
            <i class='bx bx-chevron-down'></i>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && <LessonsTable lessonsInfo={lessonsInfo} />}
      </AnimatePresence>
      <PaytrackerPurchaseModal
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userId}
        everyOverdueLesson={everyOverdueLesson}
        setEveryOverdueLesson={setEveryOverdueLesson}
        payForOwedLessons={payForOwedLessons}
        credit={credit}
        getUserInfo={getUserInfo}
        amountOwed={amountOwed}
        unpaidLessons={unpaidLessons}
      />
    </motion.article>
  );
};

export default PaymentsOwed;
