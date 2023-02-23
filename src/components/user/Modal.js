import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseLessons } from '../../actions/studentInfoActions';
import MyLoader from '../MyLoader';
import logo from '../../imgs/GaoLogoNoBorder.png';

const Modal = ({ userId, isModalOpen, setIsModalOpen, clearSelections }) => {
  // redux
  const dispatch = useDispatch();
  const studentInfo = useSelector((state) => state.studentInfo);
  const {
    userInfo,
    purchase,
    unpaidLessons,
    credits,
    isLoading,
    isSavePurchaseLoading,
  } = studentInfo;

  const {
    addedLesson,
    partnerArr,
    purchaseLessonDates,
    discountAmount,
    discountNotes,
    creditInput,
    payMethod,
    purchaseDate,
    invoiceNumber,
    priceWithDiscount,
    paidStatus,
    isUnpaidChecked,
  } = purchase;

  const { credit } = credits;

  // REDUX END

  const submitHandler = () => {
    dispatch(purchaseLessons(userId));
    clearSelections();
    setIsModalOpen(false);
  };

  const [newPaymentTotal, setNewPaymentTotal] = useState(0);
  const [unpaidLessonsTable, setUnpaidLessonsTable] = useState([]);
  let unpaidLessonsTotal = 0;
  useEffect(() => {
    if (isUnpaidChecked) {
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
    }
    // setUnpaidPurchaseIds(unpaidLessons);
    // setNewPaymentTotal(
    //   paymentTotal + unpaidLessonsTotal * (1 - discountAmount / 100)
    // );
  }, [unpaidLessons]);

  if (!isModalOpen) return null;

  //create upiandLessonsTable from unpaidLessons passed in from purchases

  let partners = [];
  if (partnerArr.length) {
    partners = partnerArr.map((partner) => partner.label);
  }

  return (
    <>
      {isSavePurchaseLoading ? (
        <MyLoader />
      ) : (
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
                  <p>{priceWithDiscount ? `$${priceWithDiscount}` : 'N/A'}</p>
                </div>
                <div className='modalData'>
                  <p>Partners:</p>
                  <p>{partners.length ? partners.join(', ') : 'N/A'}</p>
                </div>
                <div className='modalData'>
                  <p className='lessonDates'>Lesson Dates:</p>
                  <p>
                    {purchaseLessonDates.length
                      ? purchaseLessonDates.join(', ')
                      : 'N/A'}
                  </p>
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
                    {priceWithDiscount || purchaseLessonDates.length
                      ? `$${priceWithDiscount * purchaseLessonDates.length}`
                      : 'N/A'}
                  </p>
                </div>
                <div className='modalData'>
                  <p>Credit:</p>
                  <p>${creditInput ? creditInput : 0}</p>
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
                    // disabled={purchaseLessonDates.length <= 1 ? true : false}
                    onClick={submitHandler}
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
