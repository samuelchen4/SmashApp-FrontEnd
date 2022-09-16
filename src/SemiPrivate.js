import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Axios from 'axios';
import Credit from './Credit';
import { set } from 'date-fns/esm';
//Semiprivate border, hold Private components as children

const SemiPrivate = (semiPrivateLessonInfo) => {
  // return <section className='semiPrivate'>{studentComponents}</section>;
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
    partner1_id,
    partner2_id,
    partner3_id,
    priceWithDiscountIncluded,
    duration,
    getPaytrackerUsers,
    // duration,
  } = semiPrivateLessonInfo;

  const userId = user_id;
  const purchaseId = purchase_id;
  const typeName = type_name;
  const partner1Id = partner1_id;
  const partner2Id = partner2_id;
  const partner3Id = partner3_id;
  // const partnerArr = [
  //   { partnerId: partner1_id, fn: '', ln: '' },
  //   { partnerId: partner2_id, fn: '', ln: '' },
  //   { partnerId: partner3_id, fn: '', ln: '' },
  // ];

  // const [creditOpen, setCreditOpen] = useState(false)
  const [isNoShowOpen, setIsNoShowOpen] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);
  const [partnerNames, setPartnerNames] = useState('');
  const [creditValue, setCreditValue] = useState(priceWithDiscountIncluded);

  //use to disable actions and grey out component once something has been submitted
  const [isDisabled, setIsDisabled] = useState(purchaseHandled);

  // const [partnerName1, setPartnerName1] = useState('');
  // const [partnerName2, setPartnerName2] = useState('');
  // const [partnerName3, setPartnerName3] = useState('');
  const [partnerNameArr, setPartnerNameArr] = useState([]);

  //get first and last name based on id
  const getPartnerNames = () => {
    Axios.get(
      `${domain}/agenda/private/partnerInfo/${partner1Id}/${partner2Id}/${partner3Id}`
    ).then((res) => {
      console.log(res.data);
      setPartnerNameArr(res.data);
    });
  };

  const getPartnerNamesString = () => {
    const partnerNameString = partnerNameArr
      .map((partnerInfo) => {
        return ` ${partnerInfo.fn} ${partnerInfo.ln}`;
      })
      .join();
    setPartnerNames(partnerNameString);
  };

  const inputSale = () => {
    Axios.put(`${domain}/agenda/private/${purchaseId}/attended`, {
      attended: 1,
      lessonPrice: priceWithDiscountIncluded,
    })
      .then((res) => {
        console.log(res);
        getPaytrackerUsers();
        setIsDisabled(true);
      })
      .catch((err) => console.log(err));
  };

  const undoSale = () => {
    Axios.put(`${domain}/agenda/private/${purchaseId}/undoSale/`)
      .then((res) => {
        console.log(res);
        getPaytrackerUsers();
        setIsDisabled(false);
      })
      .catch((err) => console.log(err));
  };

  // const submitDidNotAttend = async (event) => {
  //   event.preventDefault();
  //   //send post request
  //   await Axios.put(`${domain}/agenda/private/${purchaseId}/toCredit`, {
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

  useEffect(() => {
    getPartnerNames();
  }, []);

  useEffect(() => {
    console.log(partnerNameArr);
    getPartnerNamesString();
  }, [partnerNameArr]);

  return (
    // <AnimatePresence>
    <motion.section
    // animate={{ opacity: 1 }}
    // initial={{ opacity: 0 }}
    // exit={{ opacity: 0 }}
    // transition={{ ease: 'linear', duration: 0.4 }}
    // initial={{ y: 0, opacity: 0, scale: 1 }}
    // animate={{ y: 0, opacity: 1, scale: 1 }}
    // exit={{
    //   y: 0,
    //   opacity: 0,
    //   scale: 1,
    //   transition: { ease: 'linear', duration: 0.3 },
    // }}
    // transition={{ ease: 'linear', duration: 0.3 }}
    >
      <section className='semiPrivate'>
        <h5 disabled={isDisabled}>
          {fn} {ln}
        </h5>
        <div className='lesson-info' disabled={isDisabled}>
          <p>
            <span className='bold600'>Lesson Type:</span> {typeName}
          </p>
          <p>
            <span className='bold600'>Partners:</span> {partnerNames}
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
    </motion.section>
    // </AnimatePresence>
  );
};

export default SemiPrivate;
