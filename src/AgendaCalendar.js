import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AgendaCalendar = () => {
  const currentDate = new Date();
  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState('');
  const locale = 'fr-CA';

  const onChange = () => {
    setDate(date);
  };

  const selectNewDay = (value) => {
    const day = value.getDate();
    const month = value.getMonth() + 1;
    const year = value.getFullYear();
    setDateSelected(`${year}-${month}-${day}`);
  };
  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        minDetail='year'
        onClickDay={selectNewDay}
      />
    </div>
  );
};

export default AgendaCalendar;
