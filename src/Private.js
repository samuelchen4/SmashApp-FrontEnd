// AGENDA SUB COMPONENT FOR PRIVATE CLASSES
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import Axios from 'axios';
import Credit from './Credit';

const Private = (studentInfo) => {
  const domain = 'http://localhost:5000';
  const {
    type_name,
    fn,
    ln,
    scheduleddate,
    start_time,
    end_time,
    user_id,
    purchase_id,
    type_id,
    price,
    partner1_id,
    partner2_id,
    partner3_id,
    lessonInfo,
    purchaseHandled,
    duration,
  } = studentInfo;

  // console.log(scheduleddate.slice(0, 10));

  // const [creditOpen, setCreditOpen] = useState(false)
  const [isNoShowOpen, setIsNoShowOpen] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);
  const [userFn, setUserFn] = useState(fn);
  const [userLn, setUserLn] = useState(ln);

  //use to disable actions and grey out component once something has been submitted
  const [isDisabled, setIsDisabled] = useState(purchaseHandled);

  const changePurchaseHandled = () => {
    let newPurchaseHandled = purchaseHandled;
    if (newPurchaseHandled === 0) {
      newPurchaseHandled = 1;
    } else if (newPurchaseHandled === 1) {
      newPurchaseHandled = 0;
    }
    Axios.put(`${domain}/agenda/private/purchaseHandled`, {
      purchaseId: purchase_id,
      purchaseHandled: newPurchaseHandled,
    })
      .then((res) => {
        console.log(res);
        if (isDisabled) {
          setIsDisabled(0);
        } else if (!isDisabled) {
          setIsDisabled(1);
        }
      })
      .catch((err) => console.log(err));
  };

  const getUserName = () => {
    Axios.get(`${domain}/agenda/private/userName`, {
      params: {
        user_id,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setUserFn(res.data.fn);
        setUserLn(res.data.ln);
      })
      .catch((err) => console.log(err));
  };

  const inputSale = () => {
    console.log(`${start_time} ${end_time}`);
    Axios.post(`${domain}/agenda/private/came`, {
      type_name,
      userFn,
      userLn,
      scheduleddate: scheduleddate.slice(0, 10),
      user_id,
      purchase_id,
      type_id,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const undoSale = () => {
    Axios.post(`${domain}/agenda/private/undoSale/`, {
      purchaseId: purchase_id,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const came = () => {
    inputSale();
    changePurchaseHandled();
  };

  const undo = () => {
    undoSale();
    changePurchaseHandled();
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <motion.section
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      // className={`agenda-lessons`}
    >
      <h5 disabled={isDisabled}>
        {userFn} {userLn}
      </h5>
      <div className='lesson-info' disabled={isDisabled}>
        <p>{type_name}</p>
        <p className='lesson-time'>
          {/* {start_time}-{end_time} */}
          duration: {duration}
        </p>
      </div>
      <div className='agenda-main-action'>
        <button className='btn' onClick={came} disabled={isDisabled}>
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
        <button
          className='undoBtn'
          disabled={!isDisabled}
          onClick={() => undo()}
        >
          <i class='bx bx-undo'></i>
        </button>
      </div>
      <AnimatePresence>
        {isNoShowOpen && (
          <div className='creditForm'>
            <Credit
              {...studentInfo}
              changePurchaseHandled={changePurchaseHandled}
              setIsNoShowOpen={setIsNoShowOpen}
              setIsDisabled={setIsDisabled}
            />
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Private;
