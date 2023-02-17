import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../imgs/GaoLogoNoBorder.png';
import ReactDom from 'react-dom';
import Select from 'react-select';
import { payPaytrackerLessons } from '../../actions/paytrackerActions';

const PaytrackerPurchaseModal = ({ id, open, setOpen }) => {
  // REDUX
  const dispatch = useDispatch();

  const recept = useSelector((state) => state.recept);
  const { userInitials } = recept.receptInfo;

  const paytracker = useSelector((state) => state.paytracker);
  const { paytrackerList } = paytracker;

  const index = paytrackerList.findIndex((student) => student.user_id === id);
  //primitive properties
  const { fn, ln, email, phone, dob, contacted, contactedBy, isCg } =
    paytrackerList[index];

  //array properties
  const {
    lessonInfo,
    amountOwed: amountOwedArr,
    everyOverdueLesson,
    unpaidLessons,
    credits,
  } = paytrackerList[index];

  const { amountOwed } = amountOwedArr;

  const { credit } = credits;
  // END REDUX

  const isCreditDisabled = credit ? false : true;
  const [lessonTable, setLessonTable] = useState([]);
  const [payCreditToDb, setPayCreditToDb] = useState(0); //the credit allowed to be used
  const [total, setTotal] = useState(0);
  const [isUnpaidChecked, setIsUnpaidChecked] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [allLessons, setAllLessons] = useState([]); //everyoverdue lesson + unpaid lEssons
  // const [discountAmount, setDiscountAmount] = useState(0);
  const [newTotal, setNewTotal] = useState(0);
  const [payMethod, setPayMethod] = useState({ label: 'Visa', value: 'Visa' });

  const payMethods = [
    { label: 'Visa', value: 'Visa' },
    { label: 'Etransfer', value: 'Etransfer' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Credit', value: 'Credit' },
  ];

  // handle submit payments
  const submitHandler = (e) => {
    e.preventDefault();
    // check if credit input is more than credit amount
    if (payCreditToDb > credit)
      return alert(`Not enough credits. ${fn} ${ln} has $${credit} credit`);
    // check if total is negative
    else if (total < 0)
      return alert(`Credits input is more than purchase amount`);
    // call dispatch
    else {
      // make sure invoiceNumber is a number and not a string
      dispatch(
        payPaytrackerLessons(
          allLessons,
          id,
          payCreditToDb ? payCreditToDb : 0,
          payMethod.value,
          invoiceNumber ? invoiceNumber : 0,
          userInitials,
          index
        )
      );
      setOpen(false);
    }
  };

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
      calculateTotal();
    }
  }, [payCreditToDb, amountOwed]);

  const calculateTotal = () => {
    setTotal(amountOwed - payCreditToDb);
  };

  useEffect(() => {
    setLessonTable(
      allLessons.map((overdueLesson) => {
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
  }, [allLessons]);

  useEffect(() => {
    //change everyOverdueLesson
    if (isUnpaidChecked) {
      //change total
      let unpaidLessonsTotal = 0;
      unpaidLessons.map((lesson) => (unpaidLessonsTotal += lesson.lessonPrice));
      setAllLessons(unpaidLessons);
      setNewTotal(unpaidLessonsTotal);
    } else {
      setAllLessons(everyOverdueLesson);
      setNewTotal(total);
    }
  }, [isUnpaidChecked, total]);

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='overLay'>
        <div className=' userSection modal'>
          <form>
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
              {unpaidLessons.length ? (
                <div className='paytrackerModalCredits'>
                  <p>
                    <label>Include Unattended Lessons</label>
                  </p>
                  <p>
                    <input
                      name='unpaidToggle'
                      type='checkbox'
                      className='toggleUnpaid'
                      checked={isUnpaidChecked}
                      onChange={() => setIsUnpaidChecked(!isUnpaidChecked)}
                    />
                  </p>
                </div>
              ) : (
                ''
              )}
              <div className='paytrackerModalCredits'>
                <p>
                  <label htmlFor='Invoice'>Invoice Number</label>
                </p>
                <p>
                  <input
                    name='Invoice'
                    placeholder='add invoice number...'
                    type='text'
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className='payTrackerModal-container'
                  />
                </p>
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
                      max={credit >= newTotal ? newTotal : credit}
                      value={payCreditToDb}
                      onChange={(e) => setPayCreditToDb(e.target.value)}
                    />
                  </p>
                </div>
              )}
              <div className='paytrackerModalCredits borderTop'>
                <p>
                  <label htmlFor='payWithCredit'>Total:</label>
                </p>
                <p>${newTotal.toFixed(2)}</p>
              </div>
            </div>
            <div className='modalSection'>
              <div className='modalData'>
                <button className='cancelButton' onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button
                  className='purchaseButton'
                  type='submit'
                  onClick={submitHandler}
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
