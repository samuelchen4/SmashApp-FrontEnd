// constraints
import Axios from 'axios';
import { apiDomain } from '../utils/domains';
import {
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL,
} from '../constants/student';

// create action creators using thunk

// get request: get all students in the db
//does this need to have parameters? no
export const getStudents = () => async (dispatch) => {
  // thunk is now built into reduxtoolkit
  try {
    dispatch({ type: GET_STUDENTS_REQUEST });

    // route for getting all students
    const { data } = await Axios.get(`${apiDomain}/users`);
    console.log(data);
    dispatch({ type: GET_STUDENTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_STUDENTS_FAIL, payload: err.response });
  }
};
