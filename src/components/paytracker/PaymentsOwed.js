import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaytrackerContactedInfo } from '../../actions/paytrackerActions';
import LessonsTable from '../../LessonsTable';
import PaytrackerPurchaseModal from './PaytrackerPurchaseModal';

const PaymentsOwed = (student) => {
  // get rid of these props and use global state
  const { id } = student;

  // ************* REDUX *************************
  const dispatch = useDispatch();
  const paytracker = useSelector((state) => state.paytracker);
  const { paytrackerList } = paytracker;

  const index = paytrackerList.findIndex((student) => student.user_id === id);
  //primitive properties
  const { fn, ln, email, phone, contacted, contactedBy, isCg } =
    paytrackerList[index];

  //array properties
  const { amountOwed, everyOverdueLesson, credits } = paytrackerList[index];

  const recept = useSelector((state) => state.recept);
  const { receptInfo } = recept;

  // ****** END REDUX *****************************
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let actionExecuted = contacted ? 'good' : '';

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const changeContactHandler = () => {
    dispatch(
      updatePaytrackerContactedInfo(id, contacted, receptInfo.userInitials)
    );
  };

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
        <h5>{contactedBy ? contactedBy : ''}</h5>
      </div>

      <div className='contact-info'>
        {phone && <p>Phone: {phone}</p>}
        {email && <p>Email: {email}</p>}
      </div>
      <div className='amount-owed'>
        <p>Amount Owed: ${amountOwed.amountOwed}</p>
        {credits.credit ? <p>Credit: ${credits.credit}</p> : <p>Credit: $0</p>}
        <div className='action-buttons'>
          <button className='frontPageButton' onClick={changeContactHandler}>
            <i class='bx bx-envelope'></i>
          </button>
          <button
            className='frontPageButton'
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
        {isExpanded && <LessonsTable id={id} />}
      </AnimatePresence>
      <PaytrackerPurchaseModal
        id={id}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
    </motion.article>
  );
};

export default PaymentsOwed;
