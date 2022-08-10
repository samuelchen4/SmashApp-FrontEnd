import React, { useState, useEffect } from 'react';

const AddLessonsReadonly = ({ lesson, handleEditClick, handleDeleteClick }) => {
  return (
    <tr key={lesson.type_id}>
      <td>{lesson.type_id}</td>
      <td>{lesson.type_name}</td>
      <td>${lesson.price}</td>
      <td>
        <div className='actionBtns'>
          {/* <button
            type='button'
            onClick={(event) => handleEditClick(event, lesson)}
          >
            edit
          </button> */}
          <button
            type='button'
            className='table-Btn'
            onClick={(event) => handleEditClick(event, lesson)}
          >
            <i class='bx bxs-edit'></i>
          </button>
          {/* <button
            type='button'
            className='table-Btn'
            onClick={() => handleDeleteClick(lesson.type_id)}
          >
            <i class='bx bx-x'></i>
          </button> */}
        </div>
      </td>
    </tr>
  );
};

export default AddLessonsReadonly;
