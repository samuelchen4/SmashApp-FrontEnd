import React from 'react';
import { motion } from 'framer-motion';

const ReadOnlyUserData = (propsFromUser) => {
  const { purchaseTable, saleTable, userInfo, credit, handleClickEdit } =
    propsFromUser;

  return (
    <>
      <div className='title-block'>
        <h2>
          <span className='title'>
            {userInfo.fn} {userInfo.ln}
          </span>
        </h2>
        <p className='edit'>
          <button onClick={handleClickEdit}>edit</button>
        </p>
      </div>
      <motion.div
        whileHover={{ backgroundColor: '#fbfbfc' }}
        className='top userSection'
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
          {/* {displayLessons} */}
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

export default ReadOnlyUserData;
