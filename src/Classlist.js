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
    isChecked,
    setIsChecked,
    getPaytrackerUsers,
    setIsOpenClasslist,
    receptInfo,
  } = classlistInfo;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const [classlistTable, setClasslistTable] = useState([]);

  let usersId = [];

  const componentRef = useRef();

  useEffect(() => {
    console.log(isChecked);
    createClasslistTable();
  }, [isChecked]);

  const createClasslistTable = () => {
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

  const submitAttendance = async () => {
    //for new db change purchase to attended and handled
    // e.preventDefault();
    await Promise.all(
      isChecked.map(async (student) => {
        const purchaseId = student.purchaseId;

        const attended = student.attended;
        const purchaseHandled = student.purchaseHandled;
        const paid = student.paid;
        const lessonPrice = student.priceWithDiscountIncluded;
        await Axios.put(
          `${domain}/agenda/group/classlist/${purchaseId}/submit`,
          {
            attended,
            purchaseHandled,
            paid,
            lessonPrice,
            receptInitials: receptInfo.userInitials,
          }
        )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
    ).then((res) => {
      getPaytrackerUsers();
      setIsOpenClasslist(0);
      setIsDisabled(true);
    });
  };

  return (
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
  );
};

export default Classlist;
