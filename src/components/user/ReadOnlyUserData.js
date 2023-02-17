import React from 'react';
import { motion } from 'framer-motion';
import LessonHistory from '../../LessonHistory';

const ReadOnlyUserData = (propsFromUser) => {
  const {
    purchaseTable,
    saleTable,
    lessonHistory,
    userInfo,
    credit,
    handleClickEdit,
  } = propsFromUser;

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
          <p>
            <span className='bold600'>CG Status:</span> <br />
            {userInfo.isCg ? 'Yes' : `No`}
          </p>
          <p>
            <span className='bold600'>Medical Description:</span> <br />
            {userInfo.medicalDesc ? userInfo.medicalDesc : `Not Available`}
          </p>
          <p>
            <span className='bold600'>Birth Date:</span>
            <br />
            {userInfo.dob ? userInfo.dob.slice(0, 10) : `Not Available`}
          </p>
          <p>
            <span className='bold600'>Credit: </span>
            <br />
            {credit ? `$${credit}` : `$0`}
          </p>
        </section>
        <section className='tables'>
          <LessonHistory lessonHistory={lessonHistory} />
        </section>
      </motion.div>
    </>
  );
};

export default ReadOnlyUserData;
