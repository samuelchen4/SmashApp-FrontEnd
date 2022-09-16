import React, { useState, useEffect } from 'react';
import Lessons from './Lessons.js';
import Private from './Private.js';
import SemiPrivate from './SemiPrivate.js';
import Group from './Group.js';
import { motion, AnimatePresence } from 'framer-motion';
import AgendaDatePicker from './AgendaDatePicker.js';
import Axios from 'axios';
import { format } from 'date-fns';
import { DatasetController } from 'chart.js';

//this component will display all lessons happening on the date chosen.
//Date will default to the current date

//lessons will be a component bc stuff needs to happen when clicking on lessons

//STEPS
//import calendar
// change listed values depending on the calendar date
// show outstanding

const Agenda = (propsFromMain) => {
  const { setPaytrackerData, getPaytrackerUsers } = propsFromMain;
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const [isOutstanding, setIsOutstanding] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const idArr = [];
  const [editPaytrackerUser, setEditPaytrackerUser] = useState({
    user_id: '',
    fn: '',
    ln: '',
    email: '',
    phone: '',
    dob: '',
    contacted: '',
  });

  // console.log(format(new Date()), 'yyyy-MM-dd');
  const [search, setSearch] = useState('');
  const searchLesson = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  // console.log(search);

  //sort by
  const [sortBy, setSortBy] = useState('all');
  const sort = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  };

  // console.log(selectedDate);
  //request data
  const [data, setData] = useState([]);
  const [semiPrivateData, setSemiPrivateData] = useState([]);
  const [semiPrivateInfoArr, setSemiPrivateInfoArr] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const lessonDate = selectedDate;
    Axios.get(`${domain}/agenda/${lessonDate}`).then((res) => {
      setData(res.data);
    });
    getSemiPrivateData();
  }, [selectedDate]);
  // console.log(data);

  const getSemiPrivateData = () => {
    Axios.get(`${domain}/agenda/getSemiPrivates`, {
      params: { selectedDate: selectedDate },
    }).then((res) => {
      console.log(res.data);
      setSemiPrivateData(res.data);
    });
  };

  const sortSemiPrivates = () => {
    //filter data to only get semi privates
    // const semiPrivates = semiPrivateData.filter((lesson) => lesson.partner1_id);
    const semiPrivates = semiPrivateData;
    // const dataWithoutSP = data.filter((lesson) => !lesson.partner1_id);
    // console.log(dataWithoutSP);
    // setData(dataWithoutSP);
    // console.log(semiPrivates);

    //array of sorted id's arrays
    const sortedSemiPrivates = semiPrivates.map((lesson) => {
      const typeId = lesson.type_id;
      const purchaseId = lesson.purchase_id;
      const duration = lesson.duration;
      let idArr = [
        //make unsorted arr of user and partner id's
        lesson.user_id,
        lesson.partner1_id,
        lesson.partner2_id,
        lesson.partner3_id,
      ];

      const sortedIdArr = createSortedArr(idArr).concat(typeId); // sort array using insertion sort and add typeId as the last element in array
      console.log(sortedIdArr);
      return sortedIdArr;
    });
    // console.log(sortedSemiPrivates);

    //filter out duplicates by checking if each each element in the array is the same if true, do not add
    const noDuplicatesSemiPrivateArr = removeDuplicates(sortedSemiPrivates);
    // console.log(noDuplicatesSemiPrivateArr);

    const swag = noDuplicatesSemiPrivateArr.map(
      (dupArr) => moveZeroElements(dupArr) //array with zeros at the back in sorted order, last element is the typeId
    );
    // console.log(swag);

    //get purchaes from previous arr
    const purchases = swag.map((arr) => findPurchase(arr, semiPrivateData));
    // console.log(purchases);

    const inside = purchases.flat();
    // console.log(inside);
    setSemiPrivateInfoArr(inside);
    // return inside;
  };

  //pushes NextValue onto array and sorts it from smallest to largest value
  const createSortedArr = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      //iterates through arr starting at the 2nd element

      const currentValue = arr[i];

      let j = i - 1; //indexing for the previous value to check if its greater than the currentValue

      while (j >= 0 && arr[j] > currentValue) {
        //j>=0 stops the condition at position 0 of array

        arr[j + 1] = arr[j]; //if previous value is larger than currentValue, shift right 1 position
        j--;
      }

      arr[j + 1] = currentValue;
    }
    return arr;
  };

  //remove duplicate elements in an array or arrays
  const removeDuplicates = (arr) => {
    return Array.from(new Set(arr.map(JSON.stringify)), JSON.parse);
  };

  // const addSortedSemiPrivates = () => {
  //   setData(data.concat(sortSemiPrivates));
  // };

  //move zeros to the back
  //take duplicate arr and returns same arr with 0's in the back
  const moveZeroElements = (dupArr) => {
    let arr2 = [0, 0, 0, 0, dupArr[dupArr.length - 1]];
    let j = 0;
    for (let i = 0; i < dupArr.length - 1; i++) {
      if (dupArr[i]) {
        arr2[j] = dupArr[i]; //fill in arr2 without zeros
        j++;
      }
    }
    // console.log(arr2);
    return arr2;
  };

  //iterate through array
  //splice userId and make partner Arr
  const findPurchase = (arr, spArr) => {
    for (let i = 0; i < arr.length; i++) {
      const cloneArr = arr.slice();
      let partnerArr = cloneArr;
      // console.log(arr);
      const userId = arr[i];
      partnerArr.splice(i, 1);
      // console.log(userId, partnerArr);
      const semiPrivates = spArr.filter((lesson) => {
        return (
          lesson.user_id === userId &&
          lesson.partner1_id === partnerArr[0] &&
          lesson.partner2_id === partnerArr[1] &&
          lesson.partner3_id === partnerArr[2]
        );
      });
      partnerArr = cloneArr;
      if (semiPrivates[0]) {
        // console.log(semiPrivates);
        return semiPrivates;
      }
    }
  };

  //concat nested arrays
  const concatNestArr = (arr) => {
    let joinArr = [];
    arr.map((nestedArr) => {
      joinArr.concat(nestedArr);
    });
    return joinArr;
  };

  useEffect(() => {
    setCombinedData(data.concat(semiPrivateInfoArr));
  }, [data, semiPrivateInfoArr]);

  useEffect(() => {
    sortSemiPrivates();
  }, [semiPrivateData]);

  return (
    <div className='agenda'>
      <h2>Agenda</h2>
      <header className='agenda-controls'>
        <section className='agenda-controls-left'>
          <form className='agenda-search-student'>
            <input
              type='text'
              name='search-lesson'
              id='search-lesson'
              placeholder='search...'
              value={search}
              onChange={searchLesson}
            />
            <i class='bx bx-search-alt'></i>
          </form>
          <div className='sort-by'>
            <p>sort by: </p>
            <select name='sortby' id='sortby' onChange={sort}>
              <option value='all'>all</option>
              <option value='group'>group</option>
              <option value='private'>private</option>
            </select>
          </div>
        </section>
        <section className='agenda-calendar'>
          <p>date: </p>
          <AgendaDatePicker
            wrapperClassName='datePicker'
            setSelectedDate={setSelectedDate}
          />
        </section>
      </header>
      <main className='agenda-main'>
        <h3>{selectedDate}</h3>
        <motion.ul
          // layout
          className='lesson-list'
        >
          {data
            .filter((lesson) => {
              if (sortBy === 'all') {
                return lesson;
              } else if (sortBy === 'group') {
                return !lesson.type_name.toLowerCase().includes('private');
              } else if (lesson.type_name.toLowerCase().includes(sortBy)) {
                return lesson;
              }
            })
            .filter(
              (lesson) =>
                lesson.scheduleddate.slice(0, 10) === String(selectedDate)
            )
            .filter((lesson) => {
              if (search === '') {
                return lesson;
              } else if (
                `${lesson.fn} ${lesson.ln}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                return lesson;
              }
            })
            .map((lesson) => {
              if (lesson.type_name.toString().toLowerCase().includes('semi')) {
                return (
                  <motion.li
                    // layout
                    key={lesson.purchase_id}
                    whileHover={{ scale: 1.03 }}
                    className='agenda-lessons'
                  >
                    <AnimatePresence>
                      <SemiPrivate
                        {...lesson}
                        getPaytrackerUsers={getPaytrackerUsers}
                      />
                    </AnimatePresence>
                  </motion.li>
                );
              } else if (lesson.type_name.toLowerCase().includes('private')) {
                return (
                  <motion.li
                    layout
                    // key={lesson.purchase_id}
                    whileHover={{ scale: 1.03 }}
                    className='agenda-lessons'
                  >
                    <AnimatePresence>
                      <Private
                        {...lesson}
                        // setPaytrackerData={setPaytrackerData}
                        // setEditPaytrackerUser={setEditPaytrackerUser}
                        // editPaytrackerUser={editPaytrackerUser}
                        getPaytrackerUsers={getPaytrackerUsers}
                      />
                    </AnimatePresence>
                  </motion.li>
                );
              } else {
                return (
                  <motion.li
                    // layout
                    whileHover={{ scale: 1.03 }}
                    key={lesson.type_id}
                    className='agenda-lessons'
                  >
                    <AnimatePresence>
                      <Group
                        {...lesson}
                        getPaytrackerUsers={getPaytrackerUsers}
                      />
                    </AnimatePresence>
                  </motion.li>
                );
              }
            })}
        </motion.ul>
      </main>
    </div>
  );
};

export default Agenda;
