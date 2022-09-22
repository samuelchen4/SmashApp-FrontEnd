import React, { Fragment } from 'react';
import { motion } from 'framer-motion';

const EditableUserData = (propsFromUser) => {
  const {
    purchaseTable,
    saleTable,
    userInfo,
    credit,
    editUserInfo,
    handleEditFormChange,
    handleEditFormSubmit,
    setIsEditingUserInfo,
  } = propsFromUser;

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
          {/* <p>
                  <span className='bold600'>Birth Date:</span>
                  <br />
                  {userInfo.dob ? userInfo.dob.slice(0, 10) : `Not Available`}
                </p> */}
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
          <div className='purchaseLog'>
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
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default EditableUserData;
