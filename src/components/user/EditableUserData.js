import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import LessonHistory from '../../LessonHistory';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import Select from 'react-select';

const EditableUserData = (propsFromUser) => {
  const {
    editUserInfo,
    setEditUserInfo,
    handleEditFormChange,
    submitUserInfoChangesHandler,
    setIsEditingUserInfo,
  } = propsFromUser;

  const recept = useSelector((state) => state.recept);
  const { userInitials } = recept.receptInfo;

  const studentInfo = useSelector((state) => state.studentInfo);
  const { userInfo } = studentInfo;
  const { user_id: id } = userInfo;

  const { fn, ln, email, dob, phone, cgStatus, medicalDesc, credit } =
    editUserInfo;

  const cgStatusDropdown = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ];

  const onChangeHandler = (selectedOption) => {
    editUserInfo.isCg = selectedOption.value;
    let newUserFormData = { ...editUserInfo };
    setEditUserInfo(newUserFormData);
  };

  const changeDateHandler = (value) => {
    const changeDate = { ...editUserInfo, dob: value };
    setEditUserInfo(changeDate);
  };

  return (
    <>
      <div className='title-block'>
        <h2>
          <span className='title'>
            <input
              type='text'
              name='fn'
              required='required'
              placeholder='enter a first name...'
              value={fn}
              onChange={handleEditFormChange}
            />
            <input
              type='text'
              name='ln'
              required='required'
              placeholder='enter a last name...'
              value={ln}
              onChange={handleEditFormChange}
            />
          </span>
        </h2>
        <p className='edit'>
          <button onClick={() => setIsEditingUserInfo(false)}>cancel</button>
          <button
            onClick={(e) =>
              submitUserInfoChangesHandler(e, id, editUserInfo, userInitials)
            }
          >
            save
          </button>
        </p>
      </div>
      <motion.div
        whileHover={{ backgroundColor: '#fbfbfc' }}
        className='top userSection'
      >
        <section className='userInfo'>
          <p>
            <span className='bold600'>Email:</span>
            <br />
            <input
              type='text'
              name='email'
              placeholder='enter an email...'
              value={email}
              onChange={handleEditFormChange}
            />
          </p>

          <p>
            <span className='bold600'>Phone:</span> <br />
            <input
              type='text'
              name='phone'
              placeholder='enter a phone number...'
              value={phone}
              onChange={handleEditFormChange}
            />
          </p>
          <p>
            <span className='bold600'>CG Status:</span> <br />
            <Select
              name='cgStatus'
              options={cgStatusDropdown}
              onChange={onChangeHandler}
            />
          </p>
          <p>
            <span className='bold600'>Medical Description:</span> <br />
            <textarea
              name='medicalDesc'
              value={medicalDesc}
              onChange={handleEditFormChange}
            />
          </p>
          <p>
            <span className='bold600'>Birth Date:</span>
            <br />
            <DatePicker
              name='dob'
              format='YYYY/MM/DD'
              placeholder='Select Date'
              value={dob}
              // onChange={(e) => {
              //   editUserInfo.dob = e.format();
              //   let newUserFormData = { ...editUserInfo };

              //   setEditUserInfo(newUserFormData);
              // }}
              onChange={changeDateHandler}
            />
          </p>
          <p>
            <span className='bold600'>Credit: </span>
            <input
              type='number'
              name='credit'
              placeholder='enter credit...'
              value={credit}
              onChange={handleEditFormChange}
            />
          </p>
        </section>
        <section className='tables'>
          {/* <div className='purchaseLog'>
            <h4>Purchases Log</h4>
            <div>
              <table className='table'>
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
              <table className='table'>
                <thead>
                  <tr>
                    <td>Sales Id</td>
                    <td>Lesson</td>
                    <td>Date Attended</td>
                    <td>Pay Method</td>
                    <td>Date Bought</td>
                    <td>Initial</td>
                  </tr>
                </thead>
                <tbody>{saleTable}</tbody>
              </table>
            </div>
          </div> */}
          <LessonHistory />
        </section>
      </motion.div>
    </>
  );
};

export default EditableUserData;
