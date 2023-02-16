import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

const AgendaDatePicker = ({ setSelectedDate }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date('2022-05-12'));
  //change format of date

  return (
    <DatePicker
      selected={startDate}
      // selected={'2022-05-11'}
      onChange={(date) => {
        setSelectedDate(
          format(
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            'yyyy-MM-dd'
          )
        );
        return setStartDate(date);
      }}
    />
  );
};

export default AgendaDatePicker;
