import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import Select from 'react-select';

const PurchaseLessons = (propsFromUser) => {
  const { lessonInfo, credit, students, userId, domain } = propsFromUser;

  const todaysDate = new Date();
  const [discountNotes, setDiscountNotes] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [studentsDropdown, setStudentsDropdown] = useState([]);
  const [payCredit, setPayCredit] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [isSemiPrivate, setIsSemiPrivate] = useState(true);
  const [lessonType, setLessonType] = useState(1);
  const [lessonPrice, setLessonPrice] = useState(0);
  const [purchaseLessonDates, setPurchaseLessonDates] = useState([]);
  const [lessonDropdown, setLessonDropdown] = useState('');
  const [displayLessons, setDisplayLessons] = useState('');
  const [addedStudents, setAddedStudents] = useState([]);

  useEffect(() => {
    renderLessons();
  }, [lessonInfo]);

  useEffect(() => {
    setPartnerDropdownData();
  }, [students]);

  useEffect(() => {
    getLessonPrice();
  }, [lessonType]);

  useEffect(() => {
    console.log(purchaseLessonDates);
    setQuantity(purchaseLessonDates.length);
  }, [purchaseLessonDates]);

  useEffect(() => {
    calculateSubtotal();
  }, [lessonPrice, discountAmount, payCredit, quantity]);

  const renderLessons = () => {
    setLessonDropdown(
      lessonInfo.map((lesson) => {
        // if (lesson.type_id == 1) {
        //   setLessonPrice(lesson.price);
        // }
        return <option value={lesson.type_id}>{lesson.type_name}</option>;
      })
    );
  };

  const setPartnerDropdownData = () => {
    setStudentsDropdown(
      students.map((user) => {
        return {
          label: `${user.fn} ${user.ln}`,
          value: user.user_id,
        };
      })
    );
  };

  const getLessonPrice = () => {
    console.log(lessonType);
    console.log(lessonInfo);
    //callbackfn in filter has to return boolean value
    const lessonPriceArr = lessonInfo
      .filter((lesson) => {
        if (lesson.type_id == lessonType) {
          return true;
        } else {
          return false;
        }
      })
      .map((lesson) => lesson.price);

    // console.log(lessonPriceArr);
    setLessonPrice(lessonPriceArr[0]);
  };

  const calculateSubtotal = () => {
    const subTotal = Math.round(
      quantity * lessonPrice * (1 - discountAmount / 100) - payCredit
    );
    console.log(subTotal);

    setPaymentTotal(subTotal);
  };

  const submitPurchases = () => {
    //post a puchase for this user, make puchase paid and deduct from the paymentTotal
    //post purchases for partners if nessacary, make unpaid
    //do http request first

    //handles partners
    let id = userId;
    let partners = [{ partnerId: 0 }, { partnerId: 0 }, { partnerId: 0 }];

    if (addedStudents.length) {
      addedStudents.forEach((partner, index) => {
        partners[index].partnerId = partner.value;
      });

      //   partners.forEach((partner, index)=>{
      //     if(index>=1) {
      //         id = partner[index].id
      //     }

      //   })
    }

    let creditAmount = payCredit;
    const lessonAmount = Math.round((lessonPrice * discountAmount) / 100);

    //handles amount of lessons
    purchaseLessonDates.forEach((purchaseLessonDate, index) => {
      const lessonDate = purchaseLessonDate.toDate();
      if (creditAmount > lessonAmount) {
        Axios.post(`${domain}/user/${id}/purchase`, {
          lessonId: lessonType,
          discountAmount: discountAmount,
          discountNotes,
          purchaseLessonDate: lessonDate,
          partnerId1: partners[0].partnerId,
          partnerId2: partners[1].partnerId,
          partnerId3: partners[2].partnerId,
          credit: lessonAmount,
          paidStatus: 1,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        creditAmount -= lessonAmount;
      } else {
        Axios.post(`${domain}/user/${id}/purchase`, {
          lessonId: lessonType,
          discountAmount: discountAmount,
          discountNotes,
          purchaseLessonDate: lessonDate,
          partnerId1: partners[0].partnerId,
          partnerId2: partners[1].partnerId,
          partnerId3: partners[2].partnerId,
          credit: creditAmount,
          paidStatus: 1,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    });

    // Axios.post(`${domain}/user/${id}/purchase`, {
    //   lessonId: lessonType,
    //   discountAmount: discountAmount,
    //   discountNotes,
    //   purchaseLessonDate: lessonDate,
    //   partnerId1: partners[0].partnerId,
    //   partnerId2: partners[1].partnerId,
    //   partnerId3: partners[2].partnerId,
    //   credit: creditAmount,
    //   paidStatus: 1,
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      <h3>Purchase Lessons</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitPurchases();
        }}
      >
        <div className='buyLesson'>
          <div className='lessonDetails'>
            {/* <div> */}
            <select
              name='lessonType'
              value={lessonType}
              onChange={(e) => {
                setLessonType(e.target.value);
              }}
              className='lessonType'
            >
              {lessonDropdown}
            </select>
            <input
              type='number'
              min='0'
              placeholder='duration...'
              name='duration'
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              className='duration'
            />
            <Select
              options={studentsDropdown}
              onChange={setAddedStudents}
              placeholder='Select Partners'
              isSearchable
              isMult
              isDisabled={!isSemiPrivate}
              noOptionsMessage={() => `Student not found`}
            />
            <div className='datePicker'>
              <DatePicker
                // format='YYYY/MM/DD'
                // format='YYYY-MM-DD'
                multiple
                plugins={[<DatePanel />]}
                // fixMainPosition={true}
                // calendarPosition='top-right'
                // relativeCalendarPosition='end'
                // fixRelativePosition={true}
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
            <button className='clearBtn'>clear</button>
          </div>

          <div className='lessonCheckout'>
            <div className='checkoutPayment'>
              <div className='discount'>
                {/* <label htmlFor='discount'>Discount</label> */}

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
              <div className='credit'>
                {/* <label htmlFor='payWithCredit'>Credit Used</label> */}
                <input
                  name='payWithCredit'
                  placeholder={`credit: ${credit}...`}
                  type='number'
                  min='0'
                  max={
                    lessonPrice * quantity * (1 - discountAmount / 100) >=
                    credit
                      ? credit
                      : lessonPrice * quantity * (1 - discountAmount / 100)
                  }
                  value={payCredit}
                  onChange={(e) => {
                    setPayCredit(e.target.value);
                  }}
                />
              </div>
              <div className='checkoutAmount'>
                <div className='subtotal'>
                  <div className='subtotal-line'>
                    <p>Lesson Price:</p>
                    <p> ${lessonPrice}</p>
                  </div>
                  <div className='subtotal-line'>
                    <p>Quantity:</p>
                    <p> {quantity}</p>
                  </div>
                  <div className='subtotal-line'>
                    <p>Discount:</p>
                    <p> -%{discountAmount}</p>
                  </div>
                  <div className='subtotal-line'>
                    <p>Credit:</p>
                    <p> -${payCredit}</p>
                  </div>
                </div>
                <div className='total-line'>
                  <p>Total:</p>
                  <p>${paymentTotal}</p>
                </div>
              </div>
            </div>
            <div className='checkoutNotes'>
              <textarea
                placeholder='discount notes...'
                value={discountNotes}
                onChange={(e) => {
                  setDiscountNotes(e.target.value);
                  console.log(discountNotes);
                }}
              />
              <button type='submit' className='submitBtn'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PurchaseLessons;
