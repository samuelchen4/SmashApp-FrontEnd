import React, { useState, useEffect } from 'react';
import logo from './imgs/GaoLogoNoBorder.png';
import DatePicker from 'react-multi-date-picker';
import ReactDom from 'react-dom';
import { set } from 'date-fns/esm';

import smashlogo from './imgs/smashLogo.jpg';

const PaytrackerPurchaseModal = (props) => {
  const {
    open,
    setIsModalOpen,
    userId,
    everyOverdueLesson,
    payForOwedLessons,
    credit,
    getUserInfo,
    amountOwed,
    receptInfo,
  } = props;

  const isCreditDisabled = credit ? false : true;

  const [lessonTable, setLessonTable] = useState([]);
  const [payCreditToDb, setPayCreditToDb] = useState(0);
  const [total, setTotal] = useState(0);

  //on open update the credits and lessonAmounts
  useEffect(() => {
    if (open) {
      getUserInfo();
    }
    console.log(credit);
    console.log(amountOwed);
  }, [open]);

  useEffect(() => {
    if (credit) {
      if (credit > amountOwed) {
        setPayCreditToDb(amountOwed);
      } else {
        setPayCreditToDb(credit);
      }
    }
  }, [credit]);

  useEffect(() => {
    if (payCreditToDb || amountOwed) {
      console.log(payCreditToDb);
      calculateTotal();
    }
  }, [payCreditToDb, amountOwed]);

  const calculateTotal = () => {
    setTotal(amountOwed - payCreditToDb);
  };

  useEffect(() => {
    setLessonTable(
      everyOverdueLesson.map((overdueLesson) => {
        const overdueLessonDate = overdueLesson.date.substring(0, 10);
        return (
          <tr>
            <td>{overdueLesson.lessonName}</td>
            <td>{overdueLessonDate}</td>
            <td>${overdueLesson.lessonPrice}</td>
          </tr>
        );
      })
    );
  }, [everyOverdueLesson]);

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='overLay'>
        <div className=' userSection modal'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              payForOwedLessons(everyOverdueLesson, userId, payCreditToDb);
            }}
          >
            <div className='modalSection'>
              <img src={logo} alt='smashcity logo' width='100px' />
              <h3 className='modalTitle'>Confirm your purchase</h3>
            </div>
            <div className='modalSection infoSection paytrackerTable'>
              <table className='table'>
                <thead>
                  <tr>
                    <td>Type</td>
                    <td>Date</td>
                    <td>Price</td>
                  </tr>
                </thead>
                <tbody>{lessonTable}</tbody>
              </table>

              {isCreditDisabled ? (
                ''
              ) : (
                <div className='paytrackerModalCredits'>
                  <p>
                    <label htmlFor='payWithCredit'>Credits:</label>
                  </p>
                  <p>
                    $
                    <input
                      className='paytrackerModalCredit__input'
                      name='payWithCredit'
                      placeholder='Enter Credit'
                      type='number'
                      min='0'
                      max={credit >= amountOwed ? amountOwed : credit}
                      value={payCreditToDb}
                      onChange={(e) => {
                        setPayCreditToDb(e.target.value);
                      }}
                    />
                  </p>
                </div>
              )}
              <div className='paytrackerModalCredits borderTop'>
                <p>
                  <label htmlFor='payWithCredit'>Total:</label>
                </p>
                <p>${total}</p>
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
                  type='submit'
                  // onClick={() =>
                  //   payForOwedLessons(everyOverdueLesson, userId, payCreditToDb)
                  // }
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default PaytrackerPurchaseModal;
