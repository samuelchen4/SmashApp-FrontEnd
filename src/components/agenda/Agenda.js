import React, { useState, useEffect } from 'react';
import Private from './Private.js';
import SemiPrivate from './SemiPrivate.js';
import { motion, AnimatePresence } from 'framer-motion';
import AgendaDatePicker from './AgendaDatePicker.js';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAgendaLessons,
  attendLesson,
  unattendLesson,
} from '../../actions/agendaActions';
import { getPaytrackerInfo } from '../../actions/paytrackerActions';
import Loader from '../MyLoader';

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const dispatch = useDispatch();
  const agendaObj = useSelector((state) => state.agenda);
  const {
    agendaLessons,
    isLoading,
    isAttendLoading,
    isUnattendLoading,
    isToCreditLoading,
  } = agendaObj;

  const [search, setSearch] = useState('');
  const searchLesson = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  //sort by
  const [sortBy, setSortBy] = useState('all');
  const sort = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  };

  useEffect(() => {
    dispatch(getAgendaLessons(selectedDate));
    // getSemiPrivateData();
  }, [selectedDate, dispatch]);
  // console.log(data);

  // run when unattended is hit to refresh paytracker
  useEffect(() => {
    if (!isAttendLoading || !isUnattendLoading || !isToCreditLoading) {
      dispatch(getPaytrackerInfo());
    }
  }, [isAttendLoading, isUnattendLoading, isToCreditLoading, dispatch]);

  const attendLessonHandler = (e, id, lessonPrice, userInitials, paid) => {
    e.preventDefault();
    // dispatch attendLesson action
    dispatch(attendLesson(id, lessonPrice, userInitials));
  };

  const unattendLessonHandler = (e, id) => {
    e.preventDefault();
    dispatch(unattendLesson(id));
    // dispatch(getPaytrackerInfo());
  };

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
        {isLoading && <Loader />}
        <h3>{selectedDate}</h3>
        <motion.ul
          // layout
          className='lesson-list'
        >
          {agendaLessons
            .filter((lesson) => {
              if (sortBy === 'all') {
                return lesson;
              } else if (sortBy === 'group') {
                return !lesson.lessonName.toLowerCase().includes('private');
              } else if (lesson.lessonName.toLowerCase().includes(sortBy)) {
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
              const { purchase_id: id } = lesson;
              if (lesson.lessonName.toString().toLowerCase().includes('semi')) {
                return (
                  <motion.li
                    // layout
                    key={lesson.purchase_id}
                    whileHover={{ scale: 1.03 }}
                    className='agenda-lessons'
                  >
                    <AnimatePresence>
                      <SemiPrivate
                        id={id}
                        attendLessonHandler={attendLessonHandler}
                        unattendLessonHandler={unattendLessonHandler}
                      />
                    </AnimatePresence>
                  </motion.li>
                );
              } else if (lesson.lessonName.toLowerCase().includes('private')) {
                return (
                  <motion.li
                    layout
                    key={lesson.purchase_id}
                    whileHover={{ scale: 1.03 }}
                    className='agenda-lessons'
                  >
                    <AnimatePresence>
                      <Private
                        id={id}
                        attendLessonHandler={attendLessonHandler}
                        unattendLessonHandler={unattendLessonHandler}
                      />
                    </AnimatePresence>
                  </motion.li>
                );
              } else {
                // return (
                //   <motion.li
                //     // layout
                //     whileHover={{ scale: 1.03 }}
                //     key={lesson.type_id}
                //     className='agenda-lessons'
                //   >
                //     <AnimatePresence>
                //       <Group {...lesson} />
                //     </AnimatePresence>
                //   </motion.li>
                // );
              }
            })}
        </motion.ul>
      </main>
    </div>
  );
};

export default Agenda;
