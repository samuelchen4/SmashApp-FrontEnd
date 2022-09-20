import React, { useState, useEffect } from 'react';

const Modal = (props) => {
  const { open, setIsModalOpen, children } = props;
  if (!open) return null;

  return (
    <>
      <div className='overLay'>
        <div className='modal userSection'>
          <div className='purchaseLessonBlock'>
            <h1>This is a modal</h1>
            {children}
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
