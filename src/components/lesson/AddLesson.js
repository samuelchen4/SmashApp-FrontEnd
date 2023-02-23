import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import AddLessonsReadonly from './AddLessonsReadonly';
import AddLessonsEditable from './AddLessonsEditable';

import { addLessons, updateLesson } from '../../actions/lessonsActions';

const AddLesson = ({ lessons }) => {
  const [addedLessonName, setAddedLessonName] = useState('');
  const [addedLessonPrice, setAddedLessonPrice] = useState(0);

  const [editLessonId, setEditLessonId] = useState(null);

  //default value for form data
  const [editFormData, setEditFormData] = useState({
    lessonName: '',
    price: '',
  });

  //testing post with redux
  const dispatch = useDispatch();

  const handleSubmitAddLesson = (e) => {
    e.preventDefault();

    const addLessonData = {
      lessonName: addedLessonName,
      lessonPrice: addedLessonPrice,
    };
    // dispatch addLessons
    dispatch(addLessons(addLessonData));
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
    //global method to handle form changes
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
      lessonPrice: editFormData.price,
      lessonCapacity: 0,
    };

    dispatch(updateLesson(editedLesson.lessonId, editedLesson));

    setEditLessonId(null);
  };

  const handleCancelClick = () => {
    setEditLessonId(null);
  };

  return (
    <div className='addLesson'>
      <h3>Add Lesson</h3>
      <section className='addLessonBody'>
        <form className='formControls' onSubmit={handleSubmitAddLesson}>
          <input
            placeholder='lesson name...'
            type='text'
            name='lessonName'
            value={addedLessonName}
            onChange={(e) => setAddedLessonName(e.target.value)}
          />
          <input
            placeholder='price...'
            type='number'
            name='price'
            value={addedLessonPrice}
            onChange={(e) => setAddedLessonPrice(e.target.value)}
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
                  <Fragment key={lesson.type_id}>
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
