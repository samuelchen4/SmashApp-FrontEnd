import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Axios from 'axios';
import Credit from './Credit';
//Semiprivate border, hold Private components as children

const SemiPrivate = (semiPrivateLessonInfo) => {
  // const domain = 'http://localhost:5000';
  // const {
  //   type_name,
  //   fn,
  //   ln,
  //   scheduleddate,
  //   start_time,
  //   end_time,
  //   user_id,
  //   purchase_id,
  //   type_id,
  //   price,
  //   partner1_id,
  //   partner2_id,
  //   partner3_id,
  // } = studentInfo;

  // //   const lessonInfo = {
  // //     type_name,
  // //     scheduleddate,
  // //     start_time,
  // //     end_time,
  // //     type_id,
  // //     price,
  // //   };

  // const [studentIdArr, setStudentIdArr] = useState([]);
  // const [studentComponents, setStudentComponents] = useState([]);

  // useEffect(() => {
  //   setStudentIdArr([user_id, partner1_id, partner2_id, partner3_id]);
  // }, []);

  // useEffect(() => {
  //   // console.log(studentIdArr);
  //   renderStudents();
  // }, [studentIdArr]);

  // const renderStudents = () => {
  //   //render a private component for each user_id that isnt 0
  //   setStudentComponents(
  //     studentIdArr.map((studentId) => {
  //       if (studentId) {
  //         return (
  //           <Private
  //             user_id={studentId}
  //             type_name={type_name}
  //             scheduleddate={scheduleddate}
  //             start_time={start_time}
  //             end_time={end_time}
  //             type_id={type_id}
  //             price={price}
  //           />
  //         );
  //       }
  //     })
  //   );
  // };

  // return <section className='semiPrivate'>{studentComponents}</section>;
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
  } = semiPrivateLessonInfo;

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
      body: {
        attended: 1,
        lessonPrice: priceWithDiscountIncluded,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const undoSale = () => {
    Axios.put(`${domain}/agenda/private/${purchaseId}/undoSale/`)
      .then((res) => console.log(res))
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
      <h5 disabled={isDisabled}>
        {fn} {ln}
      </h5>
      <div className='lesson-info' disabled={isDisabled}>
        <p>{typeName}</p>
        <p className='lesson-time'>duration: {duration}</p>
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
    </motion.section>
  );
};

export default SemiPrivate;
