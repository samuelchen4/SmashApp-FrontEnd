import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { motion } from 'framer-motion';

const LessonsTable = (propsFromLessons) => {
  const { setLessons, lessons, domain } = propsFromLessons;
  //use student info to get lessons owed
  const { lessonsInfo } = props;
  // const { user_id, fn, ln, phone, email, dob } = studentInfo;
  //slice dob .slice[0,10]
  // const entries = Object.entries(lessons);
  //   const [lessons, setLessons] = useState([]);

  //   useEffect(() => {
  //     Axios.get(`${domain}/tracker/user/lessons`, {
  //       params: {
  //         user_id,
  //       },
  //     })
  //       .then((res) => {
  //         // console.log(res.data);
  //         setLessons(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  //   console.log(lessons);
  return (
    <motion.div
      animate={{ maxHeight: 400, opacity: 1 }}
      initial={{ maxHeight: 0, opacity: 0 }}
      exit={{ maxHeight: 0, opacity: 0 }}
      transition={{ ease: 'linear', duration: 0.5 }}
    >
      <motion.table className='lessons-table'>
        <thead>
          <tr>
            <td>Lessons</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          {lessonsInfo.map((lesson) => {
            return (
              <tr key={lesson.type_id}>
                <td>{lesson.type_name}</td>
                <td>{lesson.lessonAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

// LessonsTable.defaultProps = {
//   lessons: {},
// };

export default LessonsTable;
