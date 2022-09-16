// AGENDA SUB COMPONENT FOR PRIVATE CLASSES
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Axios from 'axios';
import Credit from './Credit';

const Private = (privateLessonInfo) => {
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const {
    type_name,
    fn,
    ln,
    email,
    phone,
    dob,
    contacted,
    scheduleddate,
    purchaseHandled,
    attended,
    paid,
    user_id,
    purchase_id,
    type_id,
    priceWithDiscountIncluded,
    duration,
    getPaytrackerUsers,
    // setPaytrackerData,
    // editPaytrackerUser,
    // getPaytrackerUsers,
    // duration,
  } = privateLessonInfo;

  const userId = user_id;
  const purchaseId = purchase_id;
  const typeName = type_name;

  // const [creditOpen, setCreditOpen] = useState(false)
  const [isNoShowOpen, setIsNoShowOpen] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);

  //use to disable actions and grey out component once something has been submitted
  const [isDisabled, setIsDisabled] = useState(purchaseHandled);

  const inputSale = () => {
    Axios.put(`${domain}/agenda/private/${purchaseId}/attended`, {
      attended: 1,
      lessonPrice: priceWithDiscountIncluded,
    })
      .then((res) => {
        console.log(res);
        setIsDisabled(true);
        getPaytrackerUsers();
      })
      .catch((err) => console.log(err));
  };

  const undoSale = () => {
    Axios.put(`${domain}/agenda/private/${purchaseId}/undoSale/`)
      .then((res) => {
        console.log(res);
        setIsDisabled(false);
        getPaytrackerUsers();
      })
      .catch((err) => console.log(err));
  };

  return (
    // <motion.section
    //   animate={{ opacity: 1 }}
    //   initial={{ opacity: 0 }}
    //   exit={{ opacity: 0 }}
    //   className={`agenda-lessons`}
    // >
    <section className='private'>
      <h5 disabled={isDisabled}>
        {fn} {ln}
      </h5>
      <div className='lesson-info' disabled={isDisabled}>
        <p>
          <span className='bold600'>Lesson Type:</span> {typeName}
        </p>
        <p className='lesson-time'>
          <span className='bold600'>Duration:</span> {duration}
        </p>
        <p className='lesson-time'>
          <span className='bold600'>Paid:</span> {paid ? 'Yes' : 'No'}
        </p>
      </div>
      <div className='agenda-main-action'>
        <button className='btn' onClick={inputSale} disabled={isDisabled}>
          Came
        </button>
        <button
          className='btn'
          disabled={isDisabled}
          onClick={() => {
            setIsNoShowOpen(!isNoShowOpen);
          }}
        >
          No Show
        </button>
        <button className='undoBtn' disabled={!isDisabled} onClick={undoSale}>
          <i class='bx bx-undo'></i>
        </button>
      </div>
      <AnimatePresence>
        {isNoShowOpen && (
          <motion.div
            key='credit'
            animate={{ maxHeight: 200, opacity: 1 }}
            initial={{ maxHeight: 0, opacity: 0 }}
            exit={{
              maxHeight: 0,
              opacity: 0,
              transition: { ease: 'linear', duration: 0.2 },
            }}
            transition={{ ease: 'linear', duration: 0.2 }}
          >
            <Credit
              userId={userId}
              purchaseId={purchaseId}
              lessonPrice={priceWithDiscountIncluded}
              paid={paid}
              setIsNoShowOpen={setIsNoShowOpen}
              setIsDisabled={setIsDisabled}
              getPaytrackerUsers={getPaytrackerUsers}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    // </motion.section>
  );
};

export default Private;
