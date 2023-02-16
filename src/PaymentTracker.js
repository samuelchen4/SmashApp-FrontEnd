import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PaymentsOwed from './PaymentsOwed';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getPaytrackerInfo } from './actions/paytrackerActions';
import { apiDomain } from './utils/domains';

const PaymentTracker = () => {
  const [sortByValue, setSortByValue] = useState('all');
  const [search, setSearch] = useState('');

  //scrollbar
  const [isScrolling, setIsScrolling] = useState(false);
  let hasScrolled = isScrolling ? 'is-scrolling' : '';
  const onScroll = () => {
    setIsScrolling(true);
  };

  // redux
  const dispatch = useDispatch();
  const paytrackerInfo = useSelector((state) => state.paytracker);
  const { paytrackerList, isLoading } = paytrackerInfo;

  const recept = useSelector((state) => state.recept);
  const { receptInfo } = recept;

  useEffect(() => {
    dispatch(getPaytrackerInfo());
  }, [dispatch]);

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
            onChange={(e) => setSearch(e.target.value)}
          />
          <i class='bx bx-search-alt'></i>
        </form>
        <div className='sort-by'>
          <p>sort by: </p>
          <motion.select
            name='sortby'
            id='sortby'
            value={sortByValue}
            onChange={(e) => setSortByValue(e.target.value)}
            whileHover={{ cursor: 'pointer' }}
          >
            <option value='all'>all</option>
            <option value={1}>cg</option>
            <option value={0}>non-cg</option>
          </motion.select>
        </div>
      </section>
      <main>
        <ul className='payment-main' onScroll={onScroll}>
          {paytrackerList
            .filter((student) => {
              const { isCg } = student;
              if (sortByValue === 'all') {
                return student;
              } else if (isCg === Number(sortByValue)) {
                return student;
              }
            })
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
                  <PaymentsOwed id={student.user_id} />
                </AnimatePresence>
              </motion.li>
            ))}
        </ul>
      </main>
    </article>
  );
};

export default PaymentTracker;
