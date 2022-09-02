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
    setIsDisabled,
  } = classlistInfo;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const [classlistTable, setClasslistTable] = useState([]);
  const [isChecked, setIsChecked] = useState(
    classlist.map((user) => {
      return {
        userId: user.user_id,
        purchaseId: user.purchase_id,
        paid: user.paid,
        attended: user.attended,
        purchaseHandled: user.purchaseHandled,
        priceWithDiscountIncluded: user.priceWithDiscountIncluded,
      };
    })
  );
  let usersId = [];

  const componentRef = useRef();

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    console.log(isChecked);
    createClasslistTable();
  }, [isChecked]);

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

  // method that gets the attended status based on purchaseId
  // used to determine checked status in classlistTable
  // const determineCheckedStatus = (purchaseId) => {
  //   const attendedStatus = isChecked
  //     .find((student) => {
  //       return student.purchaseId === purchaseId;
  //     })
  //     .map((student) => {
  //       return student.attended;
  //     });
  //   console.log(attendedStatus);
  //   return attendedStatus[0] ? true : false;
  // };

  const createClasslistTable = () => {
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
    // <input
    //   type='checkbox'
    //   name='user'
    //   value={user_id}
    //   checked={isChecked[index].attended}
    //   onChange={() => handleCheckbox(index)}
    // />
    //           </td>
    //           <td>{phone}</td>
    //           <td>{email}</td>
    //         </tr>
    //       );
    //     })
    //   );
    //   setUserIdArr(usersId);
    // };
    setClasslistTable(
      classlist.map((student, index) => {
        const { fn, ln, email, phone, purchase_id, paid } = student;
        const purchaseId = purchase_id;
        return (
          <tr key={purchaseId}>
            <td>
              {fn} {ln}
            </td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{paid ? `Yes` : `No`}</td>
            <td>
              <input
                type='checkbox'
                name='user'
                value={purchaseId}
                checked={isChecked[index].attended ? true : false}
                // checked={false}
                onChange={() => handleCheckbox(index)}
              />
            </td>
          </tr>
        );
      })
    );
  };

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
  //           priceWithDiscountIncluded: user.priceWithDiscountIncluded,
  //         }
  //       : {
  //           userId: user.userId,
  //           purchaseId: user.purchaseId,
  //           paid: user.paid,
  //           attended: user.attended,
  //           purchaseHandled: user.purchaseHandled,
  //           priceWithDiscountIncluded: user.priceWithDiscountIncluded,
  //         }
  //   );
  //   setIsChecked(updatedCheckedState);
  // };

  //change checked status based on purchaseId
  const handleCheckbox = (position) => {
    const updatedCheckedState = isChecked.map((user, index) =>
      index === position
        ? {
            userId: user.userId,
            purchaseId: user.purchaseId,
            paid: user.paid,
            attended: user.attended ? 0 : 1, //if the checked value is currently 0 change it to 1 and vise versa
            purchaseHandled: user.purchaseHandled,
            priceWithDiscountIncluded: user.priceWithDiscountIncluded,
          }
        : {
            userId: user.userId,
            purchaseId: user.purchaseId,
            paid: user.paid,
            attended: user.attended,
            purchaseHandled: user.purchaseHandled,
            priceWithDiscountIncluded: user.priceWithDiscountIncluded,
          }
    );
    setIsChecked(updatedCheckedState);
  };

  const submitAttendance = () => {
    //for new db change purchase to attended and handled
    // e.preventDefault();
    isChecked.map((student) => {
      const purchaseId = student.purchaseId;

      const attended = student.attended;
      const purchaseHandled = student.purchaseHandled;
      const paid = student.paid;
      const lessonPrice = student.priceWithDiscountIncluded;
      Axios.put(`${domain}/agenda/group/classlist/${purchaseId}/submit`, {
        attended,
        purchaseHandled,
        paid,
        lessonPrice,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
    setIsDisabled(true);
  };

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
              <td>
                <button onClick={copyPhoneNumbers}>Phone</button>
              </td>
              <td>
                <button onClick={copyEmails}>Email</button>
              </td>
              <td>Paid</td>
              <td>Attended</td>
            </tr>
          </thead>
          <tbody>{classlistTable}</tbody>
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
        {/* <button className='undoBtn'>
          <i class='bx bx-undo'></i>
        </button> */}
      </div>
    </motion.div>
  );
};

export default Classlist;
