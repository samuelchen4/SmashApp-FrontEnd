import React from 'react';
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';

const LessonsTable = ({ id }) => {
  // redux
  const paytracker = useSelector((state) => state.paytracker);
  const { paytrackerList } = paytracker;
  const index = paytrackerList.findIndex((student) => student.user_id === id);
  const { lessonInfo } = paytrackerList[index];

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
          {lessonInfo.map((lesson) => {
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

export default LessonsTable;
