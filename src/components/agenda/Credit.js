import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lessonToCredit } from '../../actions/agendaActions';

const Credit = ({ id, setIsNoShowOpen }) => {
  // REDUX
  const dispatch = useDispatch();
  const recept = useSelector((state) => state.recept);
  const { userInitials } = recept.receptInfo;

  const agenda = useSelector((state) => state.agenda);
  const { agendaLessons, isLoading } = agenda;
  const index = agendaLessons.findIndex(
    (purchase) => purchase.purchase_id === id
  );

  const {
    user_id: userId,
    fn,
    ln,
    purchaseHandled,
    paid,
    lessonName: typeName,
    priceWithDiscountIncluded,
  } = agendaLessons[index];
  // END REDUX

  const [rangeValue, setRangeValue] = useState('100'); // discount value
  const [creditValue, setCreditValue] = useState(priceWithDiscountIncluded); // credit value
  //   console.log(rangeValue);
  //   console.log(price);

  // const truncatePrice = () => {
  //   //only allow two decimal points
  //   return Number(price.toFixed(2));
  // };

  // const submitDidNotAttend = (event) => {
  //   event.preventDefault();
  //   //send post request
  //   Axios.put(`${domain}/agenda/private/${purchaseId}/toCredit`, {
  //     attended: 0,
  //     lessonPrice: creditValue,
  //     receptInitials: receptInfo.userInitials,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       getPaytrackerUsers();
  //       setIsDisabled(true);
  //       setIsNoShowOpen(false);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const changeHandledStatus = () => {
  //   Axios.put(`${domain}/agenda/private/purchaseHandled`, {
  //     purchaseId: purchase_id,
  //   });
  // };

  const discountHandler = (e) => {
    e.preventDefault();
    setRangeValue(e.target.value);
    setCreditValue(
      Number(
        (Number(e.target.value) / 100) * priceWithDiscountIncluded
      ).toFixed(2)
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(lessonToCredit(id, creditValue, userInitials));
    setIsNoShowOpen(false);
  };

  return (
    <form onSubmit={submitHandler} className='credit'>
      <div>
        <label htmlFor='amount'>Amount:</label>
        <input
          name='amount'
          type='range'
          min='0'
          max='100'
          step='10'
          placeholder='amount...'
          list='tickmarks'
          value={rangeValue}
          onChange={discountHandler}
        />
        <datalist id='tickmarks'>
          <option value='0' label='0%'></option>
          <option value='10'></option>
          <option value='20'></option>
          <option value='30'></option>
          <option value='40'></option>
          <option value='50' label='50%'></option>
          <option value='60'></option>
          <option value='70'></option>
          <option value='80'></option>
          <option value='90'></option>
          <option value='100' label='100%'></option>
        </datalist>
        <p>${creditValue}</p>
      </div>
      <button type='submit' className='frontPageButton'>
        Credit
      </button>
    </form>
  );
};

export default Credit;
