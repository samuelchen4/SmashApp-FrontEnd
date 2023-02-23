import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import LessonHistory from './LessonHistory';

const ReadOnlyUserData = (propsFromUser) => {
  const { handleClickEdit } = propsFromUser;

  const studentInfo = useSelector((state) => state.studentInfo);
  const { userInfo, credits } = studentInfo;

  const { fn, ln, email, dob, phone, isCg, medicalDesc } = userInfo;
  const { credit } = credits;

  return (
    <>
      <div className='title-block'>
        <h2>
          <span className='title'>
            {fn} {ln}
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
            <br /> {email ? email : `Not Available`}
          </p>

          <p>
            <span className='bold600'>Phone:</span> <br />
            {phone ? phone : `Not Available`}
          </p>
          <p>
            <span className='bold600'>CG Status:</span> <br />
            {isCg ? 'Yes' : `No`}
          </p>
          <p>
            <span className='bold600'>Medical Description:</span> <br />
            {medicalDesc ? medicalDesc : `Not Available`}
          </p>
          <p>
            <span className='bold600'>Birth Date:</span>
            <br />
            {dob ? dob.slice(0, 10) : `Not Available`}
          </p>
          <p>
            <span className='bold600'>Credit: </span>
            <br />
            {credit ? `$${credit}` : `$0`}
          </p>
        </section>
        <section className='tables'>
          <LessonHistory />
        </section>
      </motion.div>
    </>
  );
};

export default ReadOnlyUserData;
