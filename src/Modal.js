import React, { useState, useEffect } from 'react';
import logo from './imgs/GaoLogoNoBorder.png';
import DatePicker from 'react-multi-date-picker';

const Modal = (props) => {
  const {
    open,
    setIsModalOpen,
    addedLesson,
    lessonAmountToDb,
    addedStudents,
    purchaseLessonDates,
    discountAmount,
    discountNotes,
    creditAmount,
    confirmPurchases,
    unpaidLessons,
    paymentTotal,
    setUnpaidPurchaseIds,
    payMethod,
  } = props;

  const [newPaymentTotal, setNewPaymentTotal] = useState(0);
  const [unpaidLessonsTable, setUnpaidLessonsTable] = useState([]);
  let unpaidLessonsTotal = 0;
  useEffect(() => {
    if (unpaidLessons.length) {
      //check if unpaidLessons is empty
      setUnpaidLessonsTable(
        unpaidLessons.map((unpaidLesson) => {
          let unpaidLessonDate;
          unpaidLessonsTotal += unpaidLesson.lessonPrice;
          if (unpaidLesson.date) {
            unpaidLessonDate = unpaidLesson.date.substring(0, 10);
          }
          return (
            <tr>
              <td>{unpaidLesson.lessonName}</td>
              <td>{unpaidLessonDate ? unpaidLessonDate : 'N/A'}</td>
              <td>${unpaidLesson.lessonPrice}</td>
            </tr>
          );
        })
      );
      setUnpaidPurchaseIds(unpaidLessons);
      setNewPaymentTotal(
        paymentTotal + unpaidLessonsTotal * (1 - discountAmount / 100)
      );
    } else setNewPaymentTotal(paymentTotal);
  }, [unpaidLessons, discountAmount]);

  if (!open) return null;

  //create upiandLessonsTable from unpaidLessons passed in from purchases

  let lessonDates = [];
  if (purchaseLessonDates.length) {
    lessonDates = purchaseLessonDates.map((date) => date.format());
    console.log(lessonDates);
  }

  let partners = [];
  if (addedStudents.length) {
    partners = addedStudents.map((partner) => partner.label);
  }

  return (
    <>
      <div className='overLay'>
        <div className=' userSection modal'>
          <div className='modalSection'>
            <img src={logo} alt='smashcity logo' width='90px' />
            <h3 className='modalTitle'>Confirm your purchase</h3>
          </div>
          <div className='modalSection infoSection'>
            <div className='modalData'>
              <p>Lesson:</p>
              <p>{addedLesson.label ? addedLesson.label : 'N/A'}</p>
            </div>
            <div className='modalData'>
              <p>Price:</p>
              <p>{lessonAmountToDb ? `$${lessonAmountToDb}` : 'N/A'}</p>
            </div>
            <div className='modalData'>
              <p>Partners:</p>
              <p>{partners.length ? partners.join(', ') : 'N/A'}</p>
            </div>
            <div className='modalData'>
              <p className='lessonDates'>Lesson Dates:</p>
              <p>{lessonDates.length ? lessonDates.join(', ') : 'N/A'}</p>
            </div>
            <div className='modalData'>
              <p>Discount:</p>
              <p>{discountAmount}%</p>
            </div>
            <div className='modalData'>
              <p className='discountNotes'>Discount Notes:</p>
              <p>{discountNotes ? discountNotes : 'N/A'}</p>
            </div>
            <div className='modalData'>
              <p>Subtotal:</p>
              <p>
                {lessonAmountToDb || lessonDates.length
                  ? `$${lessonAmountToDb * lessonDates.length}`
                  : 'N/A'}
              </p>
            </div>
            <div className='modalData'>
              <p>Credit:</p>
              <p>${creditAmount ? creditAmount : 0}</p>
            </div>
            <div className='modalData'>
              <p>Pay Method:</p>
              <p>{payMethod.label}</p>
            </div>
            {unpaidLessons.length ? (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ margin: 0 }}>Unpaid Lessons:</p>
                <div className='paytrackerTable unpaidTable'>
                  <table className='table'>
                    <thead>
                      <td>Type</td>
                      <td>Date</td>
                      <td>Price</td>
                    </thead>
                    <tbody>{unpaidLessonsTable}</tbody>
                  </table>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className='modalData'>
              <p>Total:</p>
              <p>${newPaymentTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className='modalSection'>
            <div className='modalData'>
              <button
                className='cancelButton'
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className='purchaseButton'
                type='button'
                // disabled={confirmDisabled}
                onClick={confirmPurchases}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
