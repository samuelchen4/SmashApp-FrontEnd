import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { format } from 'date-fns';

const NavAddUser = (propsFromNavbar) => {
  const { addUserDB, handleEditAddUserInfo, addUserInfo, setAddUserInfo } =
    propsFromNavbar;
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <section className='drop-down'>
      <h3>Add User</h3>
      <form className='add-user' onSubmit={addUserDB}>
        <div className='name'>
          <input
            placeholder='First Name'
            name='fn'
            type='text'
            value={addUserInfo.fn}
            onChange={handleEditAddUserInfo}
          />
          <input
            placeholder='Last Name'
            name='ln'
            type='text'
            value={addUserInfo.ln}
            onChange={handleEditAddUserInfo}
          />
        </div>
        <input
          placeholder='date of birth'
          name='dob'
          type='date'
          value={addUserInfo.dob}
          onChange={handleEditAddUserInfo}
        />
        <input
          placeholder='Phone Number'
          name='phone'
          type='tel'
          pattern='[0-9]{10}'
          value={addUserInfo.phone}
          onChange={handleEditAddUserInfo}
        />
        <input
          placeholder='Email...'
          name='email'
          type='email'
          value={addUserInfo.email}
          onChange={handleEditAddUserInfo}
        />
        <button className='dropDownSubmit' type='submit'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default NavAddUser;
