import Axios from 'axios';
import { apiDomain } from '../utils/domains';
import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  ADD_USER_LESSON_REQUEST,
  ADD_USER_LESSON_SUCCESS,
  ADD_USER_LESSON_FAIL,
  UPDATE_USER_LESSON_REQUEST,
  UPDATE_USER_LESSON_SUCCESS,
  UPDATE_USER_LESSON_FAIL,
} from '../constants/navbar';
import { getAgendaLessons } from '../actions/agendaActions';
import { DateObject } from 'react-multi-date-picker';

export const addUserLesson =
  (userId, lessonDates, lesson, partners = []) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_USER_LESSON_REQUEST });
      const state = getState();
      const { userInitials: receptInitials } = state.recept.receptInfo;
      const { date: agendaDate } = state.agenda;

      let responseArr = [];

      await Promise.all(
        lessonDates.map(async (lessonDate) => {
          const dobFormatted =
            lessonDate instanceof DateObject ? lessonDate.format() : lessonDate;
          const body = {
            lessonId: lesson.value,
            lessonName: lesson.label,
            lessonPrice: lesson.price,
            partnerArr: partners,
            purchaseLessonDate: dobFormatted,
            receptInitials: receptInitials,
          };
          const { data } = await Axios.post(
            `${apiDomain}/navbar/addLesson/purchase/user/${userId}`,
            body
          );
          responseArr.push(data);
        })
      );
      dispatch({ type: ADD_USER_LESSON_SUCCESS, payload: responseArr });
      dispatch(getAgendaLessons(agendaDate));
    } catch (err) {
      dispatch({ type: ADD_USER_LESSON_FAIL, payload: err.message });
    }
  };

// get user info when an userId is selected
export const getUserInfo = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_INFO_REQUEST });

    const { data } = await Axios.get(
      `${apiDomain}/navbar/changeLesson/getUserLessons/${userId}`
    );

    dispatch({ type: GET_USER_INFO_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_USER_INFO_FAIL, payload: err.message });
  }
};

export const updateUserLesson =
  (userLessonObj, newLessonDate) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_USER_LESSON_REQUEST });
      const state = getState();
      const { date: agendaDate } = state.agenda;
      const { value: purchaseId, userId } = userLessonObj;
      const lessonDateFormatted =
        newLessonDate instanceof DateObject
          ? newLessonDate.format()
          : newLessonDate;

      await Axios.put(
        `${apiDomain}/navbar/changeLesson/purchase/${purchaseId}`,
        {
          newLessonDate: lessonDateFormatted,
        }
      );
      dispatch({ type: UPDATE_USER_LESSON_SUCCESS });
      dispatch(getAgendaLessons(agendaDate));
    } catch (err) {
      dispatch({ type: UPDATE_USER_LESSON_FAIL, payload: err.message });
    }
  };
