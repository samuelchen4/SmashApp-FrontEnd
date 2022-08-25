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

const User = () => {
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState('');
  const [purchaseInfo, setPurchaseInfo] = useState([]);
  const [saleInfo, setSaleInfo] = useState([]);
  const [lessonInfo, setLessonInfo] = useState([]);
  const [lessonAmountArr, setLessonAmountArr] = useState([]);
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
  const [usersArr, setUsersArr] = useState([]);
  const [partnerId1, setPartnerId1] = useState(0);
  const [partnerId2, setPartnerId2] = useState(0);
  const [partnerId3, setPartnerId3] = useState(0);
  const [credit, setCredit] = useState(0);
  const [payCredit, setPayCredit] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [isSemiPrivate, setIsSemiPrivate] = useState(false);

  // const getAllUsers = () => {
  //   Axios.get(`${domain}/users`, {
  //     params: {
  //       sortBy: 'ASC',
  //     },
  //   })
  //     .then((res) => {
  //       setUsersArr(res.data);
  //       // console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const getLessonAmounts = () => {
  //   Axios.get(`${domain}/user/lessons/amount`, {
  //     params: {
  //       userId: id,
  //     },
  //   })
  //     .then((res) => {
  //       // console.log(res.data);
  //       setLessonAmountArr(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const renderLessonAmount = () => {
    setDisplayLessons(
      lessonAmountArr.map((lesson) => {
        if (lesson.numberOfLessons !== 0) {
          return (
            <p key={lesson.type_id} className='renderLessonAmount'>
              <span className='bold600'>{lesson.type_name}: </span>
              {lesson.numberOfLessons}
            </p>
          );
        }
      })
    );
  };

  const submitPurchases = () => {
    //add a purchase for each value of the quantity
    //post request, send lesson type, discount level
    // console.log(id, lessonType, discountAmount, discountNotes, quantity);
    let lessonCost = lessonPrice * (1 - discountAmount / 100);
    let loopCredit = payCredit;

    for (let i = 0; i < quantity; i++) {
      if (loopCredit > lessonCost) {
        Axios.post(`${domain}/user/info/purchase`, {
          userId: id,
          lessonId: lessonType,
          discountAmount,
          discountNotes,
          purchaseLessonDates,
          partnerId1,
          partnerId2,
          partnerId3,
          credit: lessonCost,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        loopCredit -= lessonCost;
      } else if (loopCredit <= lessonCost) {
        Axios.post(`${domain}/user/info/purchase`, {
          userId: id,
          lessonId: lessonType,
          discountAmount,
          discountNotes,
          purchaseLessonDates,
          partnerId1,
          partnerId2,
          partnerId3,
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
        setLessonAmountArr(res.data.avaliableLessons);
        setCredit(res.data.credits);
        setUsersArr(res.data.users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData();
    // getAllUsers();
    // getLessonAmounts();
    // getCredits();
  }, []);

  const renderPurchases = () => {
    setPurchaseTable(
      purchaseInfo.map((purchase) => {
        return (
          <tr key={purchase.purchase_id}>
            <td>{purchase.purchase_id}</td>
            <td>{purchase.type_id}</td>
            <td>scheduled Date</td>
            <td>{purchase.pay_method}</td>

            <td>{purchase.date ? purchase.date.slice(0, 10) : 'N/A'}</td>
            <td>{purchase.recept_initial}</td>
          </tr>
        );
      })
    );
  };

  const renderSales = () => {
    setSaleTable(
      saleInfo.map((sale) => {
        return (
          <motion.tr key={sale.sale_id}>
            <td>{sale.sale_id}</td>
            <td>{sale.type_id}</td>
            <td>{sale.date ? sale.date.slice(0, 10) : 'N/A'}</td>
            <td>{sale.recept_initial}</td>
          </motion.tr>
        );
      })
    );
  };

  // const getCredits = () => {
  //   Axios.get(`${domain}/user/credits`, {
  //     params: {
  //       userId: id,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       setCredit(res.data.credits);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const renderLessons = () => {
    setLessonDropdown(
      lessonInfo.map((lesson) => {
        return <option value={lesson.type_id}>{lesson.type_name}</option>;
      })
    );
  };

  // const getLessonPrice = () => {
  //   Axios.get(`${domain}/user/lesson/getPrice`, {
  //     params: {
  //       typeId: lessonType,
  //     },
  //   }).then((res) => {
  //     // console.log(res);
  //     setLessonPrice(res.data.price);
  //   });
  // };

  //setlessonprice based on lessontype state
  const getLessonPrice = () => {
    const lessonP = lessonInfo
      .filter((lesson) => {
        if (lesson.type_id === lessonType) {
          return lesson;
        }
      })
      .map((lesson) => lesson.price);

    console.log(lessonType);
    console.log(lessonP);
    setLessonPrice(lessonP[0]);
  };

  useEffect(() => {
    renderPurchases();
    renderSales();
    renderLessons();
  }, [userInfo, purchaseInfo, saleInfo, lessonInfo]);

  useEffect(() => {
    renderLessonAmount();
  }, [lessonAmountArr]);

  //get lesson price each time lesson type changes in Purchase Lessons
  useEffect(() => {
    getLessonPrice();
    checkIfSemi();
    // console.log(lessonType);
  }, [lessonType]);

  useEffect(() => {
    setPaymentTotal(
      Number(
        (
          lessonPrice * quantity * (1 - discountAmount / 100) -
          payCredit
        ).toFixed(2)
      )
    );
  }, [quantity, lessonPrice, discountAmount, payCredit]);

  // console.log(lessonPrice);

  //change state of isSemiPrivate
  const checkIfSemi = () => {
    if (lessonType >= 6 && lessonType <= 8) {
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
                          <td>Type</td>
                          <td>Scheduled Date</td>
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
                          <td>Type</td>
                          <td>Date</td>
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
                    {/* </div> */}

                    {/* <label htmlFor='quantity'>Quantity</label> */}
                    <input
                      type='number'
                      min='0'
                      placeholder='quantity...'
                      name='quantity'
                      value={quantity}
                      onChange={(e) => {
                        e.preventDefault();
                        setQuantity(e.target.value);
                      }}
                      className='quantity'
                    />
                    <input
                      type='number'
                      min='0'
                      placeholder='duration...'
                      name='duration'
                      value={duration}
                      onChange={(e) => {
                        e.preventDefault();
                        setDuration(e.target.value);
                      }}
                      className='duration'
                    />

                    <div className='partner1'>
                      <SelectStudents
                        users={usersArr}
                        partnerId={partnerId1}
                        setPartnerId={setPartnerId1}
                        isSemiPrivate={isSemiPrivate}
                      />
                    </div>
                    <div className='partner2'>
                      <SelectStudents
                        users={usersArr}
                        partnerId={partnerId2}
                        setPartnerId={setPartnerId2}
                        isSemiPrivate={isSemiPrivate}
                      />
                    </div>
                    <div className='partner3'>
                      <SelectStudents
                        users={usersArr}
                        partnerId={partnerId3}
                        setPartnerId={setPartnerId3}
                        isSemiPrivate={isSemiPrivate}
                      />
                    </div>

                    <div className='datePicker'>
                      <DatePicker
                        format='YYYY/MM/DD'
                        multiple
                        plugins={[<DatePanel />]}
                        fixMainPosition={true}
                        calendarPosition='top-right'
                        relativeCalendarPosition='end'
                        fixRelativePosition={true}
                        // onClose={() => false}
                        value={purchaseLessonDates}
                        onChange={setPurchaseLessonDates}
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
