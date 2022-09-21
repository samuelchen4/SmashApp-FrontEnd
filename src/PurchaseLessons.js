import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import Select from 'react-select';
import AddLesson from './AddLesson';
import Modal from './Modal';

const PurchaseLessons = (propsFromUser) => {
  const { lessonInfo, credit, students, userId, domain } = propsFromUser;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const todaysDate = new Date();
  const [discountNotes, setDiscountNotes] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [studentsDropdown, setStudentsDropdown] = useState([]);
  const [payCredit, setPayCredit] = useState('');
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [lessonType, setLessonType] = useState(1);
  const [purchaseLessonDates, setPurchaseLessonDates] = useState([]);
  const [lessonDropdown, setLessonDropdown] = useState('');
  const [displayLessons, setDisplayLessons] = useState('');
  const [addedStudents, setAddedStudents] = useState([]);
  const [addedLesson, setAddedLesson] = useState({
    label: '',
    value: '',
    price: 0,
    Capacity: '',
    isSemi: '',
  });

  //properties for modal, if falsey dont open modal
  const [lessonAmountToDb, setLessonAmountToDb] = useState(0);
  let creditAmount = 0;

  useEffect(() => {
    setLessonDropdownData();
    console.log(lessonInfo);
    // const result = lessonInfo.filter((lesson) => lesson.type_id == 1);
  }, [lessonInfo]);

  useEffect(() => {
    setPartnerDropdownData();
  }, [students]);

  useEffect(() => {
    console.log(purchaseLessonDates);
    setQuantity(purchaseLessonDates.length);
  }, [purchaseLessonDates]);

  useEffect(() => {
    calculateSubtotal();
  }, [addedLesson.price, discountAmount, payCredit, quantity]);

  const setLessonDropdownData = () => {
    setLessonDropdown(
      lessonInfo.map((lesson) => {
        const isSemiPrivate = lesson.type_name.toLowerCase().includes('semi');
        return {
          label: lesson.type_name,
          value: lesson.type_id,
          price: lesson.price,
          Capacity: lesson.Capacity,
          isSemi: isSemiPrivate,
        };
      })
    );
  };

  const setPartnerDropdownData = () => {
    setStudentsDropdown(
      students
        .filter((user) => user.user_id != userId)
        .map((user) => {
          return {
            label: `${user.fn} ${user.ln}`,
            value: user.user_id,
          };
        })
    );
  };

  const calculateSubtotal = () => {
    const subTotal = Math.round(
      quantity * addedLesson.price * (1 - discountAmount / 100) - payCredit
    );
    console.log(subTotal);

    setPaymentTotal(subTotal);
  };

  const submitPurchases = () => {
    setLessonAmountToDb(
      Math.round(addedLesson.price * (1 - discountAmount / 100))
    );
    setIsModalOpen(true);
  };

  const confirmPurchases = (e) => {
    e.preventDefault();
    //post a puchase for this user, make puchase paid and deduct from the paymentTotal
    //post purchases for partners if nessacary, make unpaid
    //do http request first
    let creditAmount = payCredit;

    console.log(addedStudents);
    console.log(creditAmount);
    console.log(lessonAmountToDb);

    //handles amount of lessons
    Promise.all(
      purchaseLessonDates.map(async (purchaseLessonDate) => {
        const lessonDate = purchaseLessonDate.format();
        if (creditAmount > lessonAmountToDb) {
          Axios.post(`${domain}/user/${userId}/purchase`, {
            lessonId: addedLesson.value,
            discountAmount: discountAmount,
            discountNotes,
            purchaseLessonDate: lessonDate,
            partnerArr: addedStudents,
            credit: lessonAmountToDb,
            paidStatus: 1,
            lessonName: addedLesson.label,
            priceWithDiscountIncluded: lessonAmountToDb,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
          creditAmount -= lessonAmountToDb;
        } else {
          Axios.post(`${domain}/user/${userId}/purchase`, {
            lessonId: addedLesson.value,
            discountAmount: discountAmount,
            discountNotes,
            purchaseLessonDate: lessonDate,
            partnerArr: addedStudents,
            credit: creditAmount,
            paidStatus: 1,
            lessonName: addedLesson.label,
            priceWithDiscountIncluded: lessonAmountToDb,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        }
        creditAmount = 0;
      })
    )
      .then((res) => {
        console.log(res);
        setAddedLesson({
          label: '',
          value: '',
          price: 0,
          Capacity: '',
          isSemi: '',
        });
        setAddedStudents([]);
        setPurchaseLessonDates([]);
        setDiscountAmount(0);
        setDiscountNotes('');
        setPayCredit(0);
        setPaymentTotal(0);
      })
      .then((res) => setIsModalOpen(false));
  };

  const clearSelections = (e) => {
    e.preventDefault();
    setAddedLesson({
      label: '',
      value: '',
      price: 0,
      Capacity: '',
      isSemi: '',
    });
    setAddedStudents([]);
    setPurchaseLessonDates([]);
    setDiscountAmount(0);
    setDiscountNotes('');
    setPayCredit(0);
    setPaymentTotal(0);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // setIsModalOpen(true);
          submitPurchases();
        }}
      >
        <h3>Purchase Lessons</h3>
        <div className='purchaseLessonBlock'>
          <section className='purchaseLessonBlock__inputs purchaseLessonBlock__section'>
            <section className='purchaseLessonBlock__inputs__lessonInfo'>
              {/* <h3>Lesson Info</h3> */}
              <div className='inputGroup'>
                <label htmlFor='lessons'>Lesson</label>
                <Select
                  name='lessons'
                  options={lessonDropdown}
                  onChange={setAddedLesson}
                  placeholder='Select Lesson'
                  isSearchable
                  noOptionsMessage={() => `Lesson not found`}
                  className='react-select-container lessonType'
                />
              </div>

              <div className='inputGroup'>
                <label htmlFor='partners'>Partners</label>
                <Select
                  name='partners'
                  options={studentsDropdown}
                  onChange={setAddedStudents}
                  placeholder='Select Partners'
                  isSearchable
                  isMulti
                  isDisabled={!addedLesson.isSemi}
                  noOptionsMessage={() => `Student not found`}
                  className='react-select-container selectPartner'
                />
              </div>

              <div className='datePicker inputGroup'>
                <label htmlFor='dates'>Dates</label>
                <DatePicker
                  name='dates'
                  format='YYYY/MM/DD'
                  placeholder='Select Date'
                  multiple
                  plugins={[<DatePanel />]}
                  value={purchaseLessonDates}
                  onChange={setPurchaseLessonDates}
                  minDate={todaysDate}
                  style={{
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    // height: '26px',
                  }}
                  containerStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            </section>
            <section className='purchaseLessonBlock__inputs__discounts'>
              {/* <h3>Discount Info</h3> */}
              <div className='inputGroup'>
                <label htmlFor='discount'>Discount</label>
                <input
                  name='discount'
                  value={discountAmount}
                  onChange={(e) => {
                    setDiscountAmount(e.target.value);
                  }}
                  type='range'
                  min='0'
                  max='100'
                  step='10'
                  placeholder='amount...'
                  list='tickmarks'
                />
                <datalist id='tickmarks'>
                  <option value='0' label='0%'></option>
                  <option value='10'></option>
                  <option value='20'></option>
                  <option value='30'></option>
                  <option value='40'></option>
                  <option value='50' label='50%'>
                    50
                  </option>
                  <option value='60'></option>
                  <option value='70'></option>
                  <option value='80'></option>
                  <option value='90'></option>
                  <option value='100' label='100%'></option>
                </datalist>
              </div>
              <div className='inputGroup'>
                <label htmlFor='discountNotes'>Discount Notes</label>
                <textarea
                  name='discountNotes'
                  placeholder='Add Discount Notes'
                  value={discountNotes}
                  onChange={(e) => {
                    setDiscountNotes(e.target.value);
                    console.log(discountNotes);
                  }}
                />
              </div>
            </section>
            <section className='purchaseLessonBlock__inputs__credit'>
              {/* <h3>Credit Info</h3> */}
              <div className='inputGroup'>
                <label htmlFor='payWithCredit'>Credit</label>
                <input
                  name='payWithCredit'
                  placeholder={`credit: ${credit}...`}
                  type='number'
                  min='0'
                  max={
                    addedLesson.price * quantity * (1 - discountAmount / 100) >=
                    credit
                      ? credit
                      : addedLesson.price *
                        quantity *
                        (1 - discountAmount / 100)
                  }
                  value={payCredit}
                  onChange={(e) => {
                    setPayCredit(e.target.value);
                  }}
                />
              </div>
            </section>
            <section className='purchaseLessonBlock__inputs__clearOrSubmit'>
              <button className='cancelButton' onClick={clearSelections}>
                clear
              </button>

              <button type='submit' className='purchaseButton'>
                BUY
              </button>
            </section>
          </section>

          <section className='purchaseLessonBlock__subtotal purchaseLessonBlock__section'>
            <div className='checkoutAmount'>
              <div className='subtotal'>
                <div className='subtotal-line'>
                  <p>Lesson Price:</p>
                  <p>${addedLesson.price}</p>
                </div>
                <div className='subtotal-line'>
                  <p>Quantity:</p>
                  <p> {quantity}</p>
                </div>
                <div className='subtotal-line'>
                  <p>Discount:</p>
                  <p> -{discountAmount}%</p>
                </div>
                <div className='subtotal-line'>
                  <p>Credit:</p>
                  <p> -${payCredit ? payCredit : 0}</p>
                </div>
              </div>
              <div className='total-line'>
                <p>Total:</p>
                <p>${paymentTotal}</p>
              </div>
            </div>
          </section>
        </div>
      </form>

      <Modal
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addedLesson={addedLesson}
        lessonAmountToDb={lessonAmountToDb}
        addedStudents={addedStudents}
        purchaseLessonDates={purchaseLessonDates}
        discountAmount={discountAmount}
        discountNotes={discountNotes}
        creditAmount={payCredit}
        confirmPurchases={confirmPurchases}
      ></Modal>
    </>
  );
};

export default PurchaseLessons;
