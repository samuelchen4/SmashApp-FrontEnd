import Axios from 'axios';
import { apiDomain, apiDomainTest } from '../utils/domains';
import {
  GET_LESSONS_REQUEST,
  GET_LESSONS_SUCCESS,
  GET_LESSONS_FAIL,
  ADD_LESSON_REQUEST,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_FAIL,
  UPDATE_LESSON_REQUEST,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
} from '../constants/lessons';

export const getLessons = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LESSONS_REQUEST });
    const { data } = await Axios.get(`${apiDomain}/lessons`);
    dispatch({ type: GET_LESSONS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_LESSONS_FAIL, payload: err });
  }
};

export const addLessons = (lessonFormData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_LESSON_REQUEST });
    const { data } = await Axios.post(
      `${apiDomain}/lessons/add`,
      lessonFormData
    ); // add data being sent
    const {
      lessonId: type_id,
      lessonName: type_name,
      lessonPrice: price,
    } = data;
    // change form of data
    const pushObj = {
      type_id,
      type_name,
      price,
    };
    dispatch({ type: ADD_LESSON_SUCCESS, payload: pushObj });
  } catch (err) {
    dispatch({ type: ADD_LESSON_FAIL, payload: err });
  }
};

export const updateLesson =
  (lessonId, updateLessonData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_LESSON_REQUEST });
      console.log(lessonId);

      // get lessonList
      const state = getState();
      const { lessonsList } = state.lessons;

      // send put all fields in put request
      const { data } = await Axios.put(
        `${apiDomain}/lessons/update/${lessonId}`,
        updateLessonData
      );
      const {
        lessonId: type_id,
        lessonName: type_name,
        lessonPrice: price,
      } = data;

      const putObj = {
        type_id,
        type_name,
        price,
      };
      // make the filter in the reducer because state can be mutated now
      const index = lessonsList.findIndex(
        (lessonObj) => lessonObj.type_id === lessonId
      );
      // send index of lessonObj in lessonList arr
      dispatch({ type: UPDATE_LESSON_SUCCESS, payload: putObj, index });
    } catch (err) {
      dispatch({ type: UPDATE_LESSON_FAIL, payload: err });
    }
  };
