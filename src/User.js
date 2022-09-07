import React, { useState, useEffect, TextareaHTMLAttributes } from 'react';
import Navbar from './Navbar';
import Sidebar from './sidemenu/Sidebar';
import SelectStudents from './SelectStudents';
import { Link, useParams } from 'react-router-dom';
import { set } from 'date-fns/esm';
import Axios from 'axios';
import { motion } from 'framer-motion';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import Select from 'react-select'; //accepts value and label properties

const User = () => {
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState('');
  const [purchaseInfo, setPurchaseInfo] = useState([]);
  const [saleInfo, setSaleInfo] = useState([]);
  const [lessonInfo, setLessonInfo] = useState([]);
  const [lessonsAvailable, setLessonsAvailable] = useState([]);
  const [displayLessons, setDisplayLessons] = useState('');

  const [purchaseTable, setPurchaseTable] = useState('');
  const [saleTable, setSaleTable] = useState('');
  const [lessonDropdown, setLessonDropdown] = useState('');

  const [lessonType, setLessonType] = useState(1);
  const [lessonPrice, setLessonPrice] = useState(0);
  const [purchaseLessonDates, setPurchaseLessonDates] = useState([]);

  //purchase lesson states and hooks
  const [quantity, setQuantity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [discountNotes, setDiscountNotes] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [students, setStudents] = useState([]);
  const [studentsDropdown, setStudentsDropdown] = useState([]);
  const [addedStudent, setAddedStudent] = useState([]);
  // const [partnerId1, setPartnerId1] = useState(0);
  // const [partnerId2, setPartnerId2] = useState(0);
  // const [partnerId3, setPartnerId3] = useState(0);
  const [credit, setCredit] = useState(0);
  const [payCredit, setPayCredit] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [isSemiPrivate, setIsSemiPrivate] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    renderPurchaseLog();
  }, [purchaseInfo]);

  useEffect(() => {
    renderSalesLog();
  }, [purchaseInfo]);

  useEffect(() => {
    renderLessons();
  }, [lessonInfo]);

  useEffect(() => {
    renderLessonAmount();
  }, [lessonsAvailable]);

  //get lesson price each time lesson type changes in Purchase Lessons
  useEffect(() => {
    getLessonPrice();
  }, [lessonType]);

  useEffect(() => {
    setPartnerDropdownData();
  }, [students]);

  useEffect(() => {
    calculateSubtotal();
  }, [lessonPrice, discountAmount, payCredit, purchaseLessonDates]);

  //get userinfo, purchase and sales data in three seperate arrays
  const getUserData = () => {
    const userId = id;
    Axios.get(`${domain}/user/${userId}`)
      .then((res) => {
        // console.log(res);
        setUserInfo(res.data.userInfo);
        setPurchaseInfo(res.data.purchaseLog);
        setSaleInfo(res.data.salesLog);
        setLessonInfo(res.data.lessonTypes);
        setLessonsAvailable(res.data.avaliableLessons);
        setCredit(res.data.credits.credit);
        setStudents(res.data.users);
      })
      .catch((err) => console.log(err));
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

  const renderPurchaseLog = () => {
    setPurchaseTable(
      purchaseInfo.map((purchase) => {
        return (
          <tr key={purchase.purchase_id}>
            <td>{purchase.purchase_id}</td>
            <td>{purchase.type_name}</td>
            <td>{purchase.scheduleddate.slice(0, 10)}</td>
            <td>{purchase.pay_method}</td>
            <td>{purchase.date ? purchase.date.slice(0, 10) : 'N/A'}</td>
            <td>{purchase.receptInitial_purchase}</td>
          </tr>
        );
      })
    );
  };

  const renderSalesLog = () => {
    setSaleTable(
      saleInfo.map((sale) => {
        return (
          <tr key={sale.purchase_id}>
            <td>{sale.purchase_id}</td>
            <td>{sale.type_name}</td>
            <td>{sale.scheduleddate.slice(0, 10)}</td>
            <td>{sale.pay_method}</td>
            <td>{sale.date.slice(0, 10)}</td>
            <td>{sale.receptInitial_sale}</td>
          </tr>
        );
      })
    );
  };

  const renderLessonAmount = () => {
    setDisplayLessons(
      lessonsAvailable.map((lessons) => {
        return (
          <p key={lessons.type_id} className='renderLessonAmount'>
            <span className='bold600'>{lessons.type_name}: </span>
            {lessons.lessonAmount}
          </p>
        );
      })
    );
  };

  const calculateSubtotal = () => {
    const quantity = purchaseLessonDates.length;
    const subTotal = quantity * lessonPrice * discountAmount - payCredit;

    setPaymentTotal(subTotal);
  };

  // const submitPurchases = () => {
  //   const userId = id;
  //   //add a purchase for each value of the quantity
  //   //post request, send lesson type, discount level
  //   // console.log(id, lessonType, discountAmount, discountNotes, quantity);
  //   let lessonCost = lessonPrice * (1 - discountAmount / 100);
  //   let loopCredit = payCredit;

  //   for (let i = 0; i < quantity; i++) {
  //     if (loopCredit > lessonCost) {
  //       Axios.post(`${domain}/user/:${userId}/purchase`, {
  //         lessonId: lessonType,
  //         discountAmount,
  //         discountNotes,
  //         purchaseLessonDates: purchaseLessonDates[i],
  //         // partnerId1,
  //         // partnerId2,
  //         // partnerId3,
  //         credit: lessonCost,
  //       })
  //         .then((res) => {
  //           console.log(res);
  //         })
  //         .catch((err) => console.log(err));
  //       loopCredit -= lessonCost;
  //     } else if (loopCredit <= lessonCost) {
  //       Axios.post(`${domain}/user/:${userId}/purchase`, {
  //         userId: id,
  //         lessonId: lessonType,
  //         discountAmount,
  //         discountNotes,
  //         purchaseLessonDates: purchaseLessonDates[i],
  //         // partnerId1,
  //         // partnerId2,
  //         // partnerId3,
  //         credit: loopCredit,
  //       })
  //         .then((res) => {
  //           console.log(res);
  //           // getLessonAmounts();
  //           // getCredits();
  //           getUserData();
  //           setPayCredit(0);
  //           setQuantity(0);
  //           setLessonType(1);
  //         })
  //         .catch((err) => console.log(err));
  //       loopCredit = 0;
  //     }
  //   }
  // };

  const submitPurchases = () => {
    const userId = id;
    let lessonCost = paymentTotal;
    let loopCredit = payCredit;

    for (let i = 0; i < quantity; i++) {
      if (loopCredit > lessonCost) {
        Axios.post(`${domain}/user/:${userId}/purchase`, {
          lessonId: lessonType,
          discountAmount,
          discountNotes,
          purchaseLessonDates: purchaseLessonDates[i],
          // partnerId1,
          // partnerId2,
          // partnerId3,
          credit: lessonCost,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        loopCredit -= lessonCost;
      } else if (loopCredit <= lessonCost) {
        Axios.post(`${domain}/user/:${userId}/purchase`, {
          userId: id,
          lessonId: lessonType,
          discountAmount,
          discountNotes,
          purchaseLessonDates: purchaseLessonDates[i],
          // partnerId1,
          // partnerId2,
          // partnerId3,
          credit: loopCredit,
        })
          .then((res) => {
            console.log(res);
            // getLessonAmounts();
            // getCredits();
            getUserData();
            setPayCredit(0);
            setQuantity(0);
            setLessonType(1);
          })
          .catch((err) => console.log(err));
        loopCredit = 0;
      }
    }
  };

  const renderLessons = () => {
    setLessonDropdown(
      lessonInfo.map((lesson) => {
        return <option value={lesson.type_id}>{lesson.type_name}</option>;
      })
    );
  };

  //setlessonprice based on lessontype state
  const getLessonPrice = () => {
    const lessonPriceArr = lessonInfo
      .filter((lesson) => {
        if (lesson.type_id === lessonType) {
          return lesson;
        }
      })
      .map((lesson) => lesson.price);

    setLessonPrice(lessonPriceArr[0]);
  };

  //change state of isSemiPrivate
  const checkIfSemi = () => {
    const lessonNameArr = lessonInfo
      .filter((lesson) => {
        if (lesson.type_id === lessonType) {
          return lesson;
        }
      })
      .map((lesson) => lesson.type_name);

    if (lessonNameArr[0].toLowerCase().includes('semi')) {
      setIsSemiPrivate(true);
    } else {
      setIsSemiPrivate(false);
    }
  };

  return (
    <div className='meat'>
      <Sidebar />
      <div className='right-side'>
        <Navbar />
        <div className='main'>
          <motion.main
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            className='containerSolo'
          >
            <h2>
              <span className='title'>
                {userInfo.fn} {userInfo.ln}
              </span>
            </h2>
            <motion.div
              whileHover={{ backgroundColor: '#fbfbfc' }}
              className='top'
            >
              <section className='userInfo'>
                <p>
                  <span className='bold600'>Email:</span>
                  <br /> {userInfo.email ? userInfo.email : `Not Available`}
                </p>
                <p>
                  <span className='bold600'>Phone:</span> <br />
                  {userInfo.phone ? userInfo.phone : `Not Available`}
                </p>
                {/* <p>
                  <span className='bold600'>Birth Date:</span>
                  <br />
                  {userInfo.dob ? userInfo.dob.slice(0, 10) : `Not Available`}
                </p> */}
                <p>
                  <span className='bold600'>Credit: </span>

                  {credit ? `$${credit}` : `$0`}
                </p>
                {displayLessons}
              </section>
              <section className='tables'>
                <div className='purchaseLog'>
                  <h4>Purchases Log</h4>
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <td>Purchase Id</td>
                          <td>Lesson</td>
                          <td>Lesson Date</td>
                          <td>Pay Method</td>
                          <td>Date Bought</td>
                          <td>Initial</td>
                        </tr>
                      </thead>
                      <tbody>{purchaseTable}</tbody>
                    </table>
                  </div>
                </div>
                <div className='salesLog'>
                  <h4>Sales Log</h4>
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <td>Sales Id</td>
                          <td>Lesson</td>
                          <td>Date Attended</td>
                          <td>Initial</td>
                        </tr>
                      </thead>
                      <tbody>{saleTable}</tbody>
                    </table>
                  </div>
                </div>
              </section>
            </motion.div>
            <motion.div
              whileHover={{ backgroundColor: '#fbfbfc' }}
              className='purchaseLesson'
            >
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
                    {/* <input
                      type='number'
                      min='0'
                      placeholder='quantity...'
                      name='quantity'
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      className='quantity'
                    /> */}
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
                      onChange={setAddedStudent}
                      placeholder='Select Partners'
                      isSearchable
                      isMult
                      isDisabled={!isSemiPrivate}
                      noOptionsMessage={() => `Student not found`}
                    />
                    <div className='datePicker'>
                      <DatePicker
                        format='YYYY/MM/DD'
                        multiple
                        plugins={[<DatePanel />]}
                        // fixMainPosition={true}
                        // calendarPosition='top-right'
                        // relativeCalendarPosition='end'
                        // fixRelativePosition={true}
                        value={purchaseLessonDates}
                        onChange={setPurchaseLessonDates}
                        minDate='2022/05/11'
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
                            e.preventDefault();
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
                            lessonPrice *
                              quantity *
                              (1 - discountAmount / 100) >=
                            credit
                              ? credit
                              : lessonPrice *
                                quantity *
                                (1 - discountAmount / 100)
                          }
                          value={payCredit}
                          onChange={(e) => {
                            e.preventDefault();
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
                {/* <textarea className='notes' placeholder='notes...' /> */}
              </form>
            </motion.div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default User;
