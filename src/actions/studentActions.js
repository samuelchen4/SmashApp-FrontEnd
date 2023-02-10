// constraints
import Axios from 'axios';
import { apiDomain, apiDomainTest } from '../utils/domains';
import {
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL,
  ADD_STUDENTS_REQUEST,
  ADD_STUDENTS_SUCCESS,
  ADD_STUDENTS_FAIL,
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
    dispatch({ type: GET_STUDENTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_STUDENTS_FAIL, payload: err });
  }
};

// adds student to student arr

export const addStudent = (userInfo) => async (dispatch, state) => {
  try {
    dispatch({ type: ADD_STUDENTS_REQUEST });

    const { data } = await Axios.post(
      `${apiDomain}/navbar/addNewUser`,
      userInfo
    );
    const { fn, ln, email, phone, dob, userId } = data;
    const userObj = {
      user_id: userId,
      fn,
      ln,
      email,
      dob,
      phone,
      contacted: 0,
      contactedBy: null,
      isCg: 0,
      medicaldesc: null,
    };
    console.log(userObj);

    dispatch({ type: ADD_STUDENTS_SUCCESS, payload: userObj });
  } catch (err) {
    dispatch({ type: ADD_STUDENTS_FAIL, payload: err });
  }
};
