import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PaymentsOwed from './PaymentsOwed';
import smashingIcon from './imgs/icon-badmintonplayer.png';
import { motion, AnimatePresence } from 'framer-motion';
// import { data } from './dummydata';

const PaymentTracker = (propsFromMain) => {
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const { paytrackerData, setPaytrackerData, receptInfo } = propsFromMain;
  //set paytracker data to this
  // const [data, setData] = useState([]);
  const [isOutstanding, setIsOutstanding] = useState(true);

  const [sortByValue, setSortByValue] = useState('all');

  //search payment
  const [search, setSearch] = useState('');
  const searchPayment = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  //scrollbar
  const [isScrolling, setIsScrolling] = useState(false);
  let hasScrolled = isScrolling ? 'is-scrolling' : '';
  const onScroll = () => {
    setIsScrolling(true);
  };

  //sort by
  const sortBy = (e) => {
    e.preventDefault();
    setSortByValue(e.target.value);
  };

  const payForOwedLessons = (allLessons, userId, creditsUsed, payMethod) => {
    Axios.put(`${domain}/paytracker/user/${userId}/payOwedLessons`, {
      allLessons,
      creditsUsed: creditsUsed,
      receptInitials: receptInfo.userInitials,
      payMethod,
    })
      .then((res) => {
        console.log(res);
        const newData = paytrackerData.filter((user) => user.user_id != userId);
        setPaytrackerData(newData);
      })
      .catch((err) => console.log(err));
  };

  //get data based on payments owed

  //use effect to sort data based on sortByValue

  return (
    <article className='payment-tracker'>
      <h2>Payment Tracker</h2>
      <section className='payment-tracker-controls'>
        <form>
          <input
            type='search'
            id='search'
            name='search'
            placeholder='search...'
            value={search}
            onChange={searchPayment}
          />
          <i class='bx bx-search-alt'></i>
        </form>
        <div className='sort-by'>
          <p>sort by: </p>
          <motion.select
            name='sortby'
            id='sortby'
            value={sortByValue}
            onChange={sortBy}
            whileHover={{ cursor: 'pointer' }}
          >
            <option value='all'>all</option>
            <option value='date'>date</option>
            <option value='amount'>amount</option>
          </motion.select>
        </div>
      </section>
      <main>
        <ul className='payment-main' onScroll={onScroll}>
          {paytrackerData
            .filter((student) => {
              if (search === '') {
                return student;
              } else if (
                `${student.fn} ${student.ln}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                return student;
              }
            })
            .map((student) => (
              <motion.li
                layout
                whileHover={{ scale: 1.05 }}
                className='payment-block-li'
                key={student.user_id}
              >
                <AnimatePresence>
                  <PaymentsOwed
                    {...student}
                    receptInfo={receptInfo}
                    payForOwedLessons={payForOwedLessons}
                    paytrackerData={paytrackerData}
                  />
                </AnimatePresence>
              </motion.li>
            ))}
        </ul>
        {isOutstanding || (
          <div className='payments-due-icon'>
            <img src={smashingIcon} alt='#' />
            <h4>No Outstanding Payments!</h4>
          </div>
        )}
      </main>
    </article>
  );
};

export default PaymentTracker;
