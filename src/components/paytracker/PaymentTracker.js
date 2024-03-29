import React, { useEffect, useState } from 'react';
import PaymentsOwed from './PaymentsOwed';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getPaytrackerInfo } from '../../actions/paytrackerActions';
import { getAgendaLessons } from '../../actions/agendaActions';

const PaymentTracker = () => {
  const [sortByValue, setSortByValue] = useState('all');
  const [search, setSearch] = useState('');

  //scrollbar
  const [isScrolling, setIsScrolling] = useState(false);
  const onScroll = () => {
    setIsScrolling(true);
  };

  // redux
  const dispatch = useDispatch();
  const paytrackerInfo = useSelector((state) => state.paytracker);
  const {
    paytrackerList,
    isPaidLoading,
    isLoading: isListLoading,
  } = paytrackerInfo;

  const agendaInfo = useSelector((state) => state.agenda);
  const { date } = agendaInfo;

  useEffect(() => {
    if (!paytrackerList.length && !isListLoading) dispatch(getPaytrackerInfo());
  }, [paytrackerList, isListLoading, dispatch]);

  // trigger agenda rerender when changes to paytracker happen
  useEffect(() => {
    if (!isPaidLoading) dispatch(getAgendaLessons(date));
  }, [isPaidLoading]);
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
