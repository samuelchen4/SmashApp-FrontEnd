import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Credit = (privateLessonInfo) => {
  const {
    userId,
    purchaseId,
    lessonPrice,
    paid,
    setIsNoShowOpen,
    setIsDisabled,
    // setEditPaytrackerUser,
    getPaytrackerUsers,
  } = privateLessonInfo;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const [rangeValue, setRangeValue] = useState('100');
  const [creditValue, setCreditValue] = useState(lessonPrice);
  //   console.log(rangeValue);
  //   console.log(price);

  // const truncatePrice = () => {
  //   //only allow two decimal points
  //   return Number(price.toFixed(2));
  // };

  // const submitDidNotAttend = (event) => {
  //   event.preventDefault();
  //   //send post request
  //   Axios.put(`${domain}/agenda/private/${purchaseId}/toCredit`, {
  //     attended: 0,
  //     lessonPrice: creditValue,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       getPaytrackerUsers();
  //       setIsDisabled(true);
  //       setIsNoShowOpen(false);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const changeHandledStatus = () => {
  //   Axios.put(`${domain}/agenda/private/purchaseHandled`, {
  //     purchaseId: purchase_id,
  //   });
  // };

  return (
    // <form onSubmit={(event) => submitDidNotAttend(event)}>
    <AnimatePresence>
      <motion.div
        key='credit'
        // animate={{ maxHeight: 200, opacity: 1 }}
        // initial={{ maxHeight: 0, opacity: 0 }}
        // initial={{ y: 0, opacity: 0, scale: 1 }}
        // animate={{ y: 0, opacity: 1, scale: 1 }}
        // exit={{ maxHeight: 0, opacity: 0 }}
        // transition={{ ease: 'linear', duration: 0.1 }}
        // onSubmit={(event) => submitDidNotAttend(event)}
      >
        <div>
          <label htmlFor='amount'>Amount:</label>
          <input
            name='amount'
            type='range'
            min='0'
            max='100'
            step='10'
            placeholder='amount...'
            list='tickmarks'
            value={rangeValue}
            onChange={(e) => {
              e.preventDefault();
              setRangeValue(e.target.value);
              setCreditValue(
                Number((Number(e.target.value) / 100) * lessonPrice).toFixed(2)
              );
              console.log(creditValue);
            }}
          />
          <datalist id='tickmarks'>
            <option value='0' label='0%'></option>
            <option value='10'></option>
            <option value='20'></option>
            <option value='30'></option>
            <option value='40'></option>
            <option value='50' label='50%'></option>
            <option value='60'></option>
            <option value='70'></option>
            <option value='80'></option>
            <option value='90'></option>
            <option value='100' label='100%'></option>
          </datalist>
          <p>${creditValue}</p>
        </div>
        <button type='submit'>Credit</button>
      </motion.div>
    </AnimatePresence>
    // </form>
  );
};

export default Credit;
