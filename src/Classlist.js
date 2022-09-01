import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { motion } from 'framer-motion';
import ReactToPrint from 'react-to-print';
const Classlist = (classlistInfo) => {
  const {
    lessonName,
    lessonType,
    lessonDate,
    users,
    setUsers,
    classlist,
    setClasslist,
  } = classlistInfo;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  // const [classlistArr, setClasslistArr] = useState([]);
  // const [classlist, setClasslist] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [isDisabled, setIsDisabled] = useState(0);
  let usersId = [];

  const componentRef = useRef();

  // useEffect(() => {
  //   getClasslist();
  //   return () => {
  //     setAddStudentClicked(false);
  //   };
  // }, [addStudentClicked]);
  // console.log(classList);

  // const getClasslist = () => {
  //   Axios.get(`${domain}/agenda/classlist`, {
  //     params: {
  //       typeName: typeName,
  //       date: selectedDate,
  //     },
  //   }).then((res) => {
  //     // console.log(res.data);
  //     setClasslistArr(res.data);
  //     setAmountStudents(res.data.length);
  //   });
  // };

  // const renderClasslist = () => {
  //   setClasslist(
  //     classlistArr.map((student, index) => {
  //       const { fn, ln, email, phone, user_id } = student;
  //       usersId.push(user_id);
  //       return (
  //         <tr key={user_id}>
  //           <td>
  //             {fn} {ln}
  //           </td>
  //           <td>
  //             <input
  //               type='checkbox'
  //               name='user'
  //               value={user_id}
  //               checked={isChecked[index].attended}
  //               onChange={() => handleCheckbox(index)}
  //             />
  //           </td>
  //           <td>{phone}</td>
  //           <td>{email}</td>
  //         </tr>
  //       );
  //     })
  //   );
  //   setUserIdArr(usersId);
  // };

  const copyEmails = () => {
    //copies all the emails and commas seperates them
    //
    //create giant string
    let copiedEmails = '';
    const emailArr = classlist
      .filter((student) => {
        if (student.email !== '') {
          return student.email;
        }
      })
      .map((student) => student.email);

    copiedEmails = emailArr.join();
    navigator.clipboard.writeText(copiedEmails);
  };

  const copyPhoneNumbers = () => {
    let copiedPhoneNumbers = '';
    const emailArr = classlist
      .filter((student) => {
        if (student.phone !== '') {
          return student.phone;
        }
      })
      .map((student) => student.phone);

    copiedPhoneNumbers = emailArr.join();
    navigator.clipboard.writeText(copiedPhoneNumbers);
  };

  // const handleCheckbox = (position) => {
  //   const updatedCheckedState = isChecked.map((user, index) =>
  //     index === position
  //       ? {
  //           userId: user.userId,
  //           purchaseId: user.purchaseId,
  //           paid: user.paid,
  //           attended: !user.attended,
  //           purchaseHandled: user.purchaseHandled,
  //         }
  //       : {
  //           userId: user.userId,
  //           purchaseId: user.purchaseId,
  //           paid: user.paid,
  //           attended: user.attended,
  //           purchaseHandled: user.purchaseHandled,
  //         }
  //   );
  //   setIsChecked(updatedCheckedState);
  // };

  // useEffect(() => {
  //   setIsChecked(
  //     classlist.map((user) => {
  //       return {
  //         userId: user.user_id,
  //         purchaseId: user.purchase_id,
  //         paid: user.paid,
  //         attended: user.attended,
  //         purchaseHandled: user.purchaseHandled,
  //         priceWithDiscountIncluded: user.priceWithDiscountIncluded,
  //       };
  //     })
  //   );
  // }, [classlist]);

  // useEffect(() => {
  //   renderClasslist();
  // }, [isChecked]);

  // const changePurchaseHandled = (student) => {
  //   let newPurchaseHandled = student.purchaseHandled;
  //   if (newPurchaseHandled === 0) {
  //     newPurchaseHandled = 1;
  //   } else if (newPurchaseHandled === 1) {
  //     newPurchaseHandled = 0;
  //   }
  //   Axios.put(`${domain}/agenda/private/purchaseHandled`, {
  //     purchaseId: student.purchaseId,
  //     purchaseHandled: newPurchaseHandled,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       // if (isDisabled) {
  //       //   setIsDisabled(0);
  //       // } else if (!isDisabled) {
  //       //   setIsDisabled(1);
  //       // }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const submitAttendance = () => {
  //   //for new db change purchase to attended and handled
  //   // e.preventDefault();
  //   isChecked.map((student) => {
  //     changePurchaseHandled(student);
  //     Axios.put(`${domain}/agenda/classlist/submit`, {
  //       purchase,
  //     })
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   });
  // };

  return (
    <motion.div
      animate={{ maxHeight: 800, opacity: 1 }}
      initial={{ maxHeight: 0, opacity: 0 }}
      exit={{ maxHeight: 0, opacity: 0 }}
      transition={{ ease: 'linear', duration: 0.5 }}
    >
      <div>
        <table className='classlist' ref={componentRef}>
          <thead className='classlist-titles'>
            <tr>
              <td>Name</td>
              <td>Attended</td>
              <td>
                <button onClick={copyPhoneNumbers}>Phone</button>
              </td>
              <td>
                <button onClick={copyEmails}>Email</button>
              </td>
            </tr>
          </thead>
          <tbody>{classlist}</tbody>
        </table>
        <ReactToPrint
          trigger={() => <button className='classlist-btn'>print</button>}
          content={() => componentRef.current}
          documentTitle={`${lessonName} on ${lessonDate}`}
          pageStyle='print'
        />
        <button
          className='classlist-btn'
          type='submit'
          onClick={() => submitAttendance()}
        >
          submit
        </button>
        <button className='undoBtn'>
          <i class='bx bx-undo'></i>
        </button>
      </div>
    </motion.div>
  );
};

export default Classlist;
