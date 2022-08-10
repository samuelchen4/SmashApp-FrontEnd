import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { format } from 'date-fns';

const NavAddUser = () => {
  const domain = 'http://localhost:5000';
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = () => {
    Axios.post(`${domain}/navbar/addUser`, {
      fn,
      ln,
      phone,
      email,
    }).then((res) => {
      console.log(res);
      setFn('');
      setLn('');
      setEmail('');
      setPhone('');
    });
  };

  const handleChange = () => {};

  return (
    <section className='drop-down'>
      <h3>Add User</h3>
      <form
        className='add-user'
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className='name'>
          <input
            placeholder='First Name'
            name='fn'
            type='text'
            value={fn}
            onChange={(e) => {
              const result = e.target.value.replace(/[^a-z]/gi, '');
              setFn(result);
            }}
          />
          <input
            placeholder='Last Name'
            name='ln'
            type='text'
            value={ln}
            onChange={(e) => {
              const result = e.target.value.replace(/[^a-z]/gi, '');
              setLn(result);
            }}
          />
        </div>
        {/* <input placeholder='date of birth' name='dob' type='text' /> */}
        <input
          placeholder='Phone Number'
          name='phone'
          type='tel'
          pattern='[0-9]{10}'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          placeholder='Email...'
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='dropDownSubmit' type='submit'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default NavAddUser;
