//reducer takes an action and a state and creates a new state based on the action
import {
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL,
} from '../constants/student';

export const studentListReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case GET_STUDENTS_REQUEST:
      return { list: [], isLoading: true };
    case GET_STUDENTS_SUCCESS:
      return { list: action.payload, isLoading: false, isSuccess: true };
    case GET_STUDENTS_FAIL:
      return {
        errorMessage: action.payload,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}; //defining default values
