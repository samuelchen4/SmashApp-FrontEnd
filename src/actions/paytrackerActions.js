import Axios from 'axios';
import {
  GET_PAYTRACKER_REQUEST,
  GET_PAYTRACKER_SUCCESS,
  GET_PAYTRACKER_FAIL,
  UPDATE_PAYTRACKER_CONTACTED_REQUEST,
  UPDATE_PAYTRACKER_CONTACTED_SUCCESS,
  UPDATE_PAYTRACKER_CONTACTED_FAIL,
  PAYLESSONS_PAYTRACKER_FAIL,
  PAYLESSONS_PAYTRACKER_SUCCESS,
  PAYLESSONS_PAYTRACKER_REQUEST,
} from '../constants/paytracker';
import { apiDomain } from '../utils/domains';

// method GET
// desc gets paytracker info
export const getPaytrackerInfo = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PAYTRACKER_REQUEST });

    const { data } = await Axios.get(`${apiDomain}/paytracker`);

    // get all paytracker info
    // append data with getOverdueLessons info, method requires a user ID
    // make a new array and pass that as the payload
    const newData = await Promise.all(
      data.map(async (student) => {
        const { user_id: userId } = student;
        // call getOverdueLessons for each student
        const { data: studentLessonInfo } = await Axios.get(
          `${apiDomain}/paytracker/user/${userId}`
        );
        return Object.assign({}, student, studentLessonInfo);
      })
    );

    dispatch({ type: GET_PAYTRACKER_SUCCESS, payload: newData });
  } catch (err) {
    dispatch({ type: GET_PAYTRACKER_FAIL, payload: err });
  }
};

// method PUT
// desc: updates contacted and by who
export const updatePaytrackerContactedInfo =
  (userId, contactedStatus, contactedBy) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PAYTRACKER_CONTACTED_REQUEST });
      const state = getState();
      const { paytrackerList } = state.paytracker;

      //change contacted status to opposite before sending to db
      let newContactedStatus;
      if (contactedStatus === 1) {
        newContactedStatus = 0;
      } else newContactedStatus = 1;

      await Axios.put(
        `${apiDomain}/paytracker/user/${userId}/changeContacted`,
        { contactedStatus: newContactedStatus, contactedBy }
      );

      const index = paytrackerList.findIndex(
        (student) => student.user_id === userId
      );

      dispatch({
        type: UPDATE_PAYTRACKER_CONTACTED_SUCCESS,
        payload: newContactedStatus,
        contactedBy,
        index,
      });
    } catch (err) {
      dispatch({ type: UPDATE_PAYTRACKER_CONTACTED_FAIL, payload: err });
    }
  };

export const payPaytrackerLessons =
  (
    allLessons,
    userId,
    creditsUsed,
    payMethod,
    invoiceNumber,
    receptInitials,
    index
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PAYLESSONS_PAYTRACKER_REQUEST });

      const { data } = await Axios.put(
        `${apiDomain}/paytracker/user/${userId}/payOwedLessons`,
        {
          allLessons,
          creditsUsed,
          receptInitials,
          payMethod,
          invoiceNumber,
        }
      );

      console.log(data);

      dispatch({ type: PAYLESSONS_PAYTRACKER_SUCCESS, payload: index });
    } catch (err) {
      dispatch({ type: PAYLESSONS_PAYTRACKER_FAIL, payload: err.message });
    }
  };
