import Axios from 'axios';
import { apiDomain } from '../utils/domains';
import {
  GET_AGENDA_LESSONS_REQUEST,
  GET_AGENDA_LESSONS_SUCCESS,
  GET_AGENDA_LESSONS_FAIL,
} from '../constants/agenda';

// method: GET
// desc: get lessons on the given date
export const getAgendaLessons = (date) => async (dispatch) => {
  try {
    dispatch({ type: GET_AGENDA_LESSONS_REQUEST });
    console.log(date);
    const { data } = await Axios.get(`${apiDomain}/agenda/${date}`);
    console.log(data);
    dispatch({ type: GET_AGENDA_LESSONS_SUCCESS, payload: data, date });
  } catch (err) {
    dispatch({ type: GET_AGENDA_LESSONS_FAIL, payload: err });
  }
};
