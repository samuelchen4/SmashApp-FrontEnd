import React, { useState, useEffect } from 'react';
import logo from './imgs/smashcity logo.webp';
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
  } = props;

  // const [confirmDisabled, setConfirmDisabled] = useState(0);

  if (!open) return null;

  let lessonDates = [];
  if (purchaseLessonDates.length) {
    lessonDates = purchaseLessonDates.map((date) => date.format());
    console.log(lessonDates);
  }

  let partners = [];
  if (addedStudents.length) {
    partners = addedStudents.map((partner) => partner.label);
  }

  // if (purchaseLessonDates.length && addedLesson.value) {
  //   if (
  //     !addedLesson.label.toLowerCase().includes('semi') &&
  //     !addedStudents.length
  //   ) {
  //     setConfirmDisabled(false);
  //   }
  // }

  return (
    <>
      <div className='overLay'>
        <div className=' userSection modal'>
          <div className='modalSection'>
            <img src={logo} alt='smashcity logo' width='50px' />
            <h3>Confirm your purchase</h3>
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
              <p>Credit:</p>
              <p>{creditAmount ? creditAmount : 0}</p>
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
