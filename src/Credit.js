import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Credit = ({
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
  changeAttended,
  setIsNoShowOpen,
  setIsDisabled,
}) => {
  const domain = 'http://localhost:5000';
  const [rangeValue, setRangeValue] = useState('100');
  const [creditValue, setCreditValue] = useState(price);
  //   console.log(rangeValue);
  //   console.log(price);

  const truncatePrice = () => {
    //only allow two decimal points
    return Number(price.toFixed(2));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(creditValue);
    //send post request
    Axios.post(`${domain}/agenda/private/noshow`, {
      user_id,
      purchase_id,
      type_id,
      fn,
      ln,
      type_name,
      scheduleddate: scheduleddate.slice(0, 10),
      start_time,
      end_time,
      purchase_id,
      credit: creditValue,
    })
      .then((res) => {
        console.log(res);
        // changeAttended();
        changeHandledStatus();
        setIsDisabled(true);
        setIsNoShowOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const changeHandledStatus = () => {
    Axios.put(`${domain}/agenda/private/purchaseHandled`, {
      purchaseId: purchase_id,
    });
  };

  return (
    <motion.form
      animate={{ maxHeight: 200, opacity: 1 }}
      initial={{ maxHeight: 0, opacity: 0 }}
      exit={{ maxHeight: 0, opacity: 0 }}
      transition={{ ease: 'linear', duration: 0.3 }}
      onSubmit={onSubmit}
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
              Number((Number(e.target.value) / 100) * price).toFixed(2)
            );
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
    </motion.form>
  );
};

export default Credit;
