import React, { useState, useEffect } from 'react';

const SelectStudents = ({ users, partnerId, setPartnerId, isSemiPrivate }) => {
  const [renderUserArr, setRenderUserArr] = useState([]);
  //   const [partnerId, setPartnerId] = useState(0);

  const renderUsers = () => {
    setRenderUserArr(
      users.map((user) => {
        return (
          <option value={user.user_id}>
            {user.fn} {user.ln}
          </option>
        );
      })
    );
  };

  useEffect(() => {
    renderUsers();
  }, [users]);

  return (
    // <div>
    <select
      name='partner'
      value={partnerId}
      onChange={(e) => {
        e.preventDefault();
        setPartnerId(e.target.value);
      }}
      className='partnerSelector'
      disabled={!isSemiPrivate}
    >
      {renderUserArr}
    </select>
    // </div>
  );
};

export default SelectStudents;
