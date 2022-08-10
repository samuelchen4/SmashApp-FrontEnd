import React, { useState, useEffect } from 'react';
import Private from './Private.js';
import Axios from 'axios';
//Semiprivate border, hold Private components as children

const SemiPrivate = (studentInfo) => {
  const domain = 'http://localhost:5000';
  const {
    type_name,
    fn,
    ln,
    scheduleddate,
    start_time,
    end_time,
    user_id,
    purchase_id,
    type_id,
    price,
    partner1_id,
    partner2_id,
    partner3_id,
  } = studentInfo;

  //   const lessonInfo = {
  //     type_name,
  //     scheduleddate,
  //     start_time,
  //     end_time,
  //     type_id,
  //     price,
  //   };

  const [studentIdArr, setStudentIdArr] = useState([]);
  const [studentComponents, setStudentComponents] = useState([]);

  useEffect(() => {
    setStudentIdArr([user_id, partner1_id, partner2_id, partner3_id]);
  }, []);

  useEffect(() => {
    // console.log(studentIdArr);
    renderStudents();
  }, [studentIdArr]);

  const renderStudents = () => {
    //render a private component for each user_id that isnt 0
    setStudentComponents(
      studentIdArr.map((studentId) => {
        if (studentId) {
          return (
            <Private
              user_id={studentId}
              type_name={type_name}
              scheduleddate={scheduleddate}
              start_time={start_time}
              end_time={end_time}
              type_id={type_id}
              price={price}
            />
          );
        }
      })
    );
  };

  return <section className='semiPrivate'>{studentComponents}</section>;
};

export default SemiPrivate;
