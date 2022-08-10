import { Link } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Axios from 'axios';
import AddLessonsReadonly from './AddLessonsReadonly';
import AddLessonsEditable from './AddLessonsEditable';

const AddLesson = ({ lessons, setLessons }) => {
  const domain = 'http://localhost:5000';
  // const [lessons, setLessons] = useState([]);
  const [lessonsTable, setLessonsTable] = useState([]);

  const [lessonName, setLessonName] = useState('');
  const [lessonPrice, setLessonPrice] = useState();
  // const [lessonIdArr, setLessonIdArr] = useState([]);
  const [editLessonId, setEditLessonId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    lessonName: '',
    price: '',
  });

  useEffect(() => {
    getLessons();
  }, []);

  const getLessons = () => {
    Axios.get(`${domain}/lessons`)
      .then((res) => {
        console.log(res.data);
        setLessons(res.data);
      })
      .catch((err) => console.log(err));
  };

  // const storeLessonId = () => {
  //   setLessonIdArr(
  //     lessons.map((lesson, index) => {
  //       return { lessonId: lesson.type_id, index: index };
  //     })
  //   );
  // };

  const renderLessons = () => {
    // storeLessonId();
    setLessonsTable(
      lessons.map((lesson) => {
        return (
          <tr key={lesson.type_id}>
            <td>{lesson.type_id}</td>
            <td>{lesson.type_name}</td>
            <td>${lesson.price}</td>
            <td>
              <button className='deleteBtn'>
                <i class='bx bx-x'></i>
              </button>
            </td>
          </tr>
        );
      })
    );
  };
  // console.log(lessonIdArr);
  // const deleteLesson = (index) => {
  //   Axios.put(`${domain}/lessons/delete`, {
  //     lessonId:
  //   })

  // }

  useEffect(() => {
    renderLessons();
  }, [lessons]);

  const addLesson = () => {
    Axios.post(`${domain}/lessons/add`, {
      lessonName,
      lessonPrice,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleEditClick = (event, lesson) => {
    event.preventDefault();
    setEditLessonId(lesson.type_id);

    const formValues = {
      lessonName: lesson.type_name,
      price: lesson.price,
    };

    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    console.log(editFormData);
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    console.log(fieldValue);

    const newFormData = {
      ...editFormData,
    };

    console.log(newFormData);
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedLesson = {
      lessonId: editLessonId,
      lessonName: editFormData.lessonName,
      price: editFormData.price,
    };

    const newLessons = [...lessons];
    console.log(newLessons);

    const index = lessons.findIndex(
      (lesson) => lesson.type_id === editLessonId
    );

    newLessons[index].type_name = editedLesson.lessonName;
    newLessons[index].price = editedLesson.price;

    setLessons(newLessons);
    setEditLessonId(null);
  };

  const handleCancelClick = (event) => {
    setEditLessonId(null);
  };

  const handleDeleteClick = (lessonId) => {
    const newLessons = [...lessons];
    const index = lessons.findIndex((lesson) => lesson.type_id === lessonId);

    newLessons.splice(index, 1);
    setLessons(newLessons);
  };

  return (
    <div className='addLesson'>
      <h3>Add Lesson</h3>
      <section className='addLessonBody'>
        <form
          className='formControls'
          onSubmit={(e) => {
            e.preventDefault();
            addLesson();
          }}
        >
          <input
            placeholder='lesson name...'
            type='text'
            name='lessonName'
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
          />
          <input
            placeholder='price...'
            type='number'
            name='price'
            value={lessonPrice}
            onChange={(e) => setLessonPrice(e.target.value)}
          />

          <button type='submit'>Add</button>
        </form>
        <div>
          <form onSubmit={handleEditFormSubmit}>
            <table className='lessonsTable'>
              <thead>
                <tr>
                  <th className='lessonColumn'>Lesson Id</th>
                  <th className='priceColumn'>Lesson Name</th>
                  <th className='lessonColumn'>Price</th>
                  <th className='lessonColumn'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <Fragment>
                    {editLessonId === lesson.type_id ? (
                      <AddLessonsEditable
                        lesson={lesson}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <AddLessonsReadonly
                        lesson={lesson}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddLesson;
