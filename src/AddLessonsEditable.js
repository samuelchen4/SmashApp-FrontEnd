import React, { useState, useEffect } from 'react';

const AddLessonsEditable = ({
  lesson,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr key={lesson.type_id}>
      <td>{lesson.type_id}</td>
      <td>
        <input
          type='text'
          required='required'
          placeholder='Enter a name...'
          name='lessonName'
          onChange={handleEditFormChange}
          value={editFormData.lessonName}
        />
      </td>
      <td>
        <input
          type='number'
          required='required'
          placeholder='Enter an amount...'
          name='price'
          onChange={handleEditFormChange}
          value={editFormData.price}
        />
      </td>
      <td>
        <button type='button' className='table-Btn' onClick={handleCancelClick}>
          <i class='bx bx-undo'></i>
        </button>
        <button type='submit' className='table-Btn'>
          <i class='bx bx-check'></i>
        </button>
      </td>
    </tr>
  );
};

export default AddLessonsEditable;
