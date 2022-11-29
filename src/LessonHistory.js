import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const LessonHistory = (props) => {
  const { lessonHistory } = props;
  const [lessonHistoryTableBody, setLessonHistoryTableBody] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(lessonHistory);
    renderLessonHistory();
  }, [lessonHistory, search]);

  //   useEffect(() => {
  //     renderLessonHistory();
  //   }, [lessonHistory]);

  const renderLessonHistory = () => {
    setLessonHistoryTableBody(
      lessonHistory
        .filter((lesson) => {
          if (search === '') return lesson;
          else if (lesson.invoice && lesson.invoice.includes(search))
            return lesson;
        })
        .map((lesson) => {
          return (
            <tr key={lesson.purchase_id ? lesson.purchase_id : 'N/A'}>
              <td>{lesson.lessonName}</td>
              <td>{lesson.date ? lesson.date.slice(0, 10) : 'N/A'}</td>
              <td>{`$${lesson.lessonPrice}`}</td>
              <td>{lesson.amount ? `${lesson.amount * 100}%` : `0%`}</td>
              <td>{lesson.description ? lesson.description : 'No Discount'}</td>
              <td>{lesson.pay_method ? lesson.pay_method : 'Not Paid'}</td>
              <td>
                {lesson.scheduleddate
                  ? lesson.scheduleddate.slice(0, 10)
                  : 'N/A'}
              </td>
              <td>{lesson.creditUsed ? `$${lesson.creditUsed}` : `$0`}</td>
              <td>
                {lesson.receptInitial_purchase
                  ? lesson.receptInitial_purchase
                  : 'N/A'}
              </td>
              <td>{lesson.attended ? 'Yes' : 'No'}</td>
              {/* <td>
              {lesson.receptInitial_sale ? lesson.receptInitial_sale : 'N/A'}
            </td> */}
              <td>{lesson.credit ? `$${lesson.credit}` : `$0`}</td>
              <td>{lesson.invoice ? `${lesson.invoice}` : `Not Paid`}</td>
            </tr>
          );
        })
    );
  };

  return (
    <>
      <section className='tables'>
        <div className='purchaseLog'>
          <h4>Lesson History</h4>
          <input
            type='search'
            id='search'
            name='search'
            placeholder='search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <table className='table'>
              <thead>
                <tr>
                  <td>Lesson</td>
                  <td>Purchased On</td>
                  <td>Price</td>
                  <td>Discount Amount</td>
                  <td>Discount Notes</td>
                  <td>Pay Method</td>
                  <td>Lesson Date</td>
                  <td>Credits Used</td>
                  <td>Purchase Authorized</td>
                  <td>Attended</td>
                  {/* <td>Sale Authorized</td> */}
                  <td>Credits Gained</td>
                  <td>Invoice Number</td>
                </tr>
              </thead>
              <tbody>{lessonHistoryTableBody}</tbody>
            </table>
          </div>
        </div>
        {/* <div className='purchaseLog'>
        <h4>Purchases Log</h4>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <td>Purchase Id</td>
                <td>Lesson</td>
                <td>Lesson Date</td>
                <td>Pay Method</td>
                <td>Date Bought</td>
                <td>Initial</td>
              </tr>
            </thead>
            <tbody>{purchaseTable}</tbody>
          </table>
        </div>
      </div>
      <div className='salesLog'>
        <h4>Sales Log</h4>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <td>Sales Id</td>
                <td>Lesson</td>
                <td>Date Attended</td>
                <td>Pay Method</td>
                <td>Date Bought</td>
                <td>Initial</td>
              </tr>
            </thead>
            <tbody>{saleTable}</tbody>
          </table>
        </div>
      </div> */}
      </section>
    </>
  );
};

export default LessonHistory;
