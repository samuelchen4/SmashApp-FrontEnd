import React, { useState, useEffect } from 'react';
import logo from './imgs/GaoLogoNoBorder.png';
import DatePicker from 'react-multi-date-picker';
import ReactDom from 'react-dom';
import Select from 'react-select';

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
  const [payMethod, setPayMethod] = useState({ label: 'Visa', value: 'Visa' });

  const payMethods = [
    { label: 'Visa', value: 'Visa' },
    { label: 'Etransfer', value: 'Etransfer' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Credit', value: 'Credit' },
  ];

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
              payForOwedLessons(
                everyOverdueLesson,
                userId,
                payCreditToDb,
                payMethod.value
              );
            }}
          >
            <div className='modalSection'>
              <img src={logo} alt='smashcity logo' width='100px' />
              <h3 className='modalTitle'>Confirm your purchase</h3>
            </div>
            <div className='modalSection infoSection'>
              <div className='paytrackerTable'>
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
              </div>

              <div className='paytrackerModalCredits'>
                <p>
                  <label htmlFor='payMethod'>Pay Method:</label>
                </p>
                <p>
                  <Select
                    name='payMethod'
                    options={payMethods}
                    onChange={setPayMethod}
                    placeholder='Visa'
                    className='payTrackerModal-container'
                  />
                </p>
              </div>
              {isCreditDisabled ? (
                <></>
              ) : (
                <div className='paytrackerModalCredits'>
                  <p>
                    <label htmlFor='payWithCredit'>Credits:</label>
                  </p>
                  <p style={{ fontSize: '1.1rem' }}>
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
