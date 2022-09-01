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
    scheduleddate,
    purchaseHandled,
    attended,
    paid,
    user_id,
    purchase_id,
    type_id,
    priceWithDiscountIncluded,
    duration,
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

  // const changePurchaseHandled = () => {
  //   let newPurchaseHandled = purchaseHandled;
  //   if (newPurchaseHandled === 0) {
  //     newPurchaseHandled = 1;
  //   } else if (newPurchaseHandled === 1) {
  //     newPurchaseHandled = 0;
  //   }
  //   Axios.put(`${domain}/agenda/private/purchaseHandled`, {
  //     purchaseId: purchase_id,
  //     purchaseHandled: newPurchaseHandled,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       if (isDisabled) {
  //         setIsDisabled(0);
  //       } else if (!isDisabled) {
  //         setIsDisabled(1);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const getUserName = () => {
  //   Axios.get(`${domain}/agenda/private/userName`, {
  //     params: {
  //       user_id,
  //     },
  //   })
  //     .then((res) => {
  //       // console.log(res.data);
  //       setUserFn(res.data.fn);
  //       setUserLn(res.data.ln);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const inputSale = () => {
    Axios.put(`${domain}/agenda/private/${purchaseId}/attended`, {
      attended: 1,
      lessonPrice: priceWithDiscountIncluded,
    })
      .then((res) => {
        console.log(res);
        setIsDisabled(true);
      })
      .catch((err) => console.log(err));
  };

  const undoSale = () => {
    Axios.put(`${domain}/agenda/private/${purchaseId}/undoSale/`)
      .then((res) => {
        console.log(res);
        setIsDisabled(false);
      })
      .catch((err) => console.log(err));
  };

  // const came = () => {
  //   inputSale();
  //   changePurchaseHandled();
  // };

  // const undo = () => {
  //   undoSale();
  //   changePurchaseHandled();
  // };

  // useEffect(() => {
  //   getUserName();
  // }, []);

  return (
    <motion.section
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      // className={`agenda-lessons`}
    >
      {/* test to see if this section tag does anything weird. used to add className */}
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
            <div className='creditForm'>
              <Credit
                userId={userId}
                purchaseId={purchaseId}
                lessonPrice={priceWithDiscountIncluded}
                paid={paid}
                setIsNoShowOpen={setIsNoShowOpen}
                setIsDisabled={setIsDisabled}
              />
            </div>
          )}
        </AnimatePresence>
      </section>
    </motion.section>
  );
};

export default Private;
