import React, { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LessonHistory from './LessonHistory';
import DatePicker from 'react-multi-date-picker';
import Select from 'react-select';

const EditableUserData = (propsFromUser) => {
  const {
    purchaseTable,
    saleTable,
    lessonHistory,
    userInfo,
    credit,
    editUserInfo,
    setEditUserInfo,
    handleEditFormChange,
    handleEditFormSubmit,
    setIsEditingUserInfo,
  } = propsFromUser;

  const [isCg, setIsCg] = useState({ label: '', value: '' });
  const cgStatusDropdown = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ];

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
              value={editUserInfo.fn}
              onChange={handleEditFormChange}
            />
            <input
              type='text'
              name='ln'
              required='required'
              placeholder='enter a last name...'
              value={editUserInfo.ln}
              onChange={handleEditFormChange}
            />
          </span>
        </h2>
        <p className='edit'>
          <button onClick={() => setIsEditingUserInfo(false)}>cancel</button>
          <button onClick={handleEditFormSubmit}>save</button>
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
              value={editUserInfo.email}
              onChange={handleEditFormChange}
            />
          </p>

          <p>
            <span className='bold600'>Phone:</span> <br />
            <input
              type='text'
              name='phone'
              placeholder='enter a phone number...'
              value={editUserInfo.phone}
              onChange={handleEditFormChange}
            />
          </p>
          <p>
            <span className='bold600'>CG Status:</span> <br />
            <Select
              name='cgStatus'
              options={cgStatusDropdown}
              // value={isCg.value}
              onChange={(e) => {
                editUserInfo.cgStatus = e.value;
                let newUserFormData = { ...editUserInfo };
                setEditUserInfo(newUserFormData);
              }}
            />
          </p>
          <p>
            <span className='bold600'>Medical Description:</span> <br />
            <textarea
              name='medicalDesc'
              value={editUserInfo.medicalDesc}
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
              value={editUserInfo.dob}
              onChange={(e) => {
                editUserInfo.dob = e.format();
                let newUserFormData = { ...editUserInfo };

                setEditUserInfo(newUserFormData);
              }}
            />
          </p>
          <p>
            <span className='bold600'>Credit: </span>
            <input
              type='number'
              name='credit'
              placeholder='enter credit...'
              value={editUserInfo.credit}
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
          <LessonHistory lessonHistory={lessonHistory} />
        </section>
      </motion.div>
    </>
  );
};

export default EditableUserData;
