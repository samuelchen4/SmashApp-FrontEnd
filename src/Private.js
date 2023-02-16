// AGENDA SUB COMPONENT FOR PRIVATE CLASSES
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPaytrackerInfo } from './actions/paytrackerActions';
import { motion, AnimatePresence } from 'framer-motion';
import Credit from './Credit';

const Private = ({ id, attendLessonHandler, unattendLessonHandler }) => {
  // REDUX

  const recept = useSelector((state) => state.recept);
  const { userInitials } = recept.receptInfo;

  const agenda = useSelector((state) => state.agenda);
  const { agendaLessons, isLoading } = agenda;
  const index = agendaLessons.findIndex(
    (purchase) => purchase.purchase_id === id
  );

  const {
    user_id: userId,
    fn,
    ln,
    purchaseHandled,
    paid,
    lessonName: typeName,
    priceWithDiscountIncluded,
  } = agendaLessons[index];
  // END REDUX

  const [isNoShowOpen, setIsNoShowOpen] = useState(false);

  return (
    <section className='private'>
      <h5 disabled={purchaseHandled}>
        {fn} {ln}
      </h5>
      <div className='lesson-info' disabled={purchaseHandled}>
        <p>
          <span className='bold600'>Lesson Type:</span> {typeName}
        </p>
        <p>
          <span className='bold600'>Partners:</span> N/A
        </p>
        <p className='lesson-time'>
          <span className='bold600'>Duration:</span> add duration
        </p>
        <p className='lesson-time'>
          <span className='bold600'>Paid:</span> {paid ? 'Yes' : 'No'}
        </p>
      </div>
      <div className='agenda-main-action'>
        <button
          className='btn'
          onClick={(e) => {
            attendLessonHandler(
              e,
              id,
              priceWithDiscountIncluded,
              userInitials,
              paid
            );
            setIsNoShowOpen(false);
          }}
          disabled={purchaseHandled}
        >
          Came
        </button>
        <button
          className='btn'
          disabled={purchaseHandled}
          onClick={() => {
            setIsNoShowOpen(!isNoShowOpen);
          }}
        >
          No Show
        </button>
        <button
          className='undoBtn'
          disabled={!purchaseHandled}
          onClick={(e) => unattendLessonHandler(e, id)}
        >
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
            <Credit id={id} setIsNoShowOpen={setIsNoShowOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Private;
