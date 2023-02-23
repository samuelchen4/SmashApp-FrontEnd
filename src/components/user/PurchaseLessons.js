import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePurchaseLessons } from '../../actions/studentInfoActions';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import Select from 'react-select';
import Modal from './Modal';

const PurchaseLessons = ({ userId }) => {
  // redux
  const dispatch = useDispatch();
  const studentInfo = useSelector((state) => state.studentInfo);
  const { unpaidLessons, credits } = studentInfo;

  const { credit } = credits;

  const lessons = useSelector((state) => state.lessons);
  const { lessonsList } = lessons;

  const students = useSelector((state) => state.students);
  const { list: studentsList } = students;

  // REDUX END

  // OPTIONS
  const [lessonDropdown, setLessonDropdown] = useState([]); // options for lesson select
  const [studentsDropdown, setStudentsDropdown] = useState([]); // options for student select
  const payMethods = [
    // options for payMethods
    { label: 'Visa', value: 'Visa' },
    { label: 'Etransfer', value: 'Etransfer' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Credit', value: 'Credit' },
  ];
  // INPUTS
  const [addedLesson, setAddedLesson] = useState({
    //addLesson input
    label: '',
    value: '',
    price: 0,
    Capacity: '',
    isSemi: '',
  });

  const [purchaseLessonDates, setPurchaseLessonDates] = useState([]); // purchaseLessonDates input
  const [addedStudents, setAddedStudents] = useState([]); //addStudents input
  const [discountAmount, setDiscountAmount] = useState(0); // discountAmount input range: 0-100
  const [discountNotes, setDiscountNotes] = useState(''); // discountAmount input
  const [payCredit, setPayCredit] = useState(0); // credit Input
  const [purchaseDate, setPurchaseDate] = useState(''); // purchaseDate input
  const [invoiceNumber, setInvoiceNumber] = useState(0); // invoiceNumber input
  const [payMethod, setPayMethod] = useState({ label: 'Visa', value: 'Visa' }); // payMethod inputs

  // component state
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0); // price after discount
  const [isUnpaidChecked, setIsUnpaidChecked] = useState(false); // boolean
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLessonDropdownData();
  }, [lessonsList]);

  useEffect(() => {
    setPartnerDropdownData();
  }, [students]);

  useEffect(() => {
    setPriceAfterDiscount(addedLesson.price * (1 - discountAmount / 100));
  }, [discountAmount, addedLesson]);

  const setLessonDropdownData = () => {
    setLessonDropdown(
      lessonsList.map((lesson) => {
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
      studentsList
        .filter((user) => user.user_id != userId)
        .map((user) => {
          return {
            label: `${user.fn} ${user.ln}`,
            value: user.user_id,
          };
        })
    );
  };

  // open model and dispatch action to save input values to state
  const toModelHandler = (e) => {
    e.preventDefault();
    const purchaseObj = {
      addedLesson,
      partnerArr: addedStudents,
      purchaseLessonDates: purchaseLessonDates.map((date) => date.format()), // format dates in action
      discountAmount,
      discountNotes,
      creditInput: payCredit,
      payMethod,
      purchaseDate: purchaseDate.format(),
      invoiceNumber,
      priceWithDiscount: priceAfterDiscount,
      paidStatus: 1,
      isUnpaidChecked,
    };

    dispatch(savePurchaseLessons(purchaseObj));
    setIsModalOpen(true);
  };

  const clearSelections = () => {
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
  };

  return (
    <>
      <form onSubmit={toModelHandler}>
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
                  // minDate={todaysDate}
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
              <div className='inputGroup'>
                <label htmlFor='discount'>Discount</label>
                <input
                  name='discount'
                  value={discountAmount}
                  onChange={(e) => {
                    setDiscountAmount(e.target.value);
                    // console.log(discountAmount);
                  }}
                  type='range'
                  min='0'
                  max='100'
                  step='10'
                  placeholder='amount...'
                  list='tickmarks'
                />
                <datalist id='tickmarks'>
                  <option value={0} label='0%'></option>
                  <option value={10}></option>
                  <option value={20}></option>
                  <option value={30}></option>
                  <option value={40}></option>
                  <option value={50} label='50%'>
                    50
                  </option>
                  <option value={60}></option>
                  <option value={70}></option>
                  <option value={80}></option>
                  <option value={90}></option>
                  <option value={100} label='100%'></option>
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
                  }}
                />
              </div>
            </section>
            <section className='purchaseLessonBlock__inputs__credit'>
              <div className='inputGroup'>
                <label htmlFor='payWithCredit'>Credit</label>
                <input
                  name='payWithCredit'
                  placeholder={`credit: ${credit}...`}
                  type='number'
                  min='0'
                  value={payCredit}
                  onChange={(e) => {
                    setPayCredit(e.target.value);
                  }}
                />
              </div>
            </section>
            <section className='purchaseLessonBlock__inputs__misc'>
              <div className='inputGroup'>
                <label htmlFor='payMethod'>Pay Method</label>
                <Select
                  name='payMethod'
                  options={payMethods}
                  onChange={setPayMethod}
                  placeholder='Visa'
                  className='react-select-container payTrackerModal-container'
                />
              </div>
              <div className='inputGroup'>
                <label htmlFor='purchaseDate'>Dates</label>
                <DatePicker
                  name='purchaseDate'
                  format='YYYY/MM/DD'
                  placeholder='Select Date'
                  value={purchaseDate}
                  onChange={setPurchaseDate}
                />
              </div>
              <div className='inputGroup'>
                <label htmlFor='Invoice'>Invoice Number</label>
                <input
                  name='Invoice'
                  placeholder='add invoice number...'
                  type='number'
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
              <div>
                <input
                  name='unpaidToggle'
                  type='checkbox'
                  disabled={unpaidLessons.length ? false : true}
                  className='toggleUnpaid'
                  checked={isUnpaidChecked}
                  onChange={() => setIsUnpaidChecked(!isUnpaidChecked)}
                />
                <label>Include Unpaid Lessons</label>
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
                  <p> {purchaseLessonDates.length}</p>
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
                <p>
                  $
                  {(priceAfterDiscount - payCredit) *
                    purchaseLessonDates.length}
                </p>
              </div>
            </div>
          </section>
        </div>
      </form>

      <Modal
        userId={userId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        clearSelections={clearSelections}
      ></Modal>
    </>
  );
};

export default PurchaseLessons;
