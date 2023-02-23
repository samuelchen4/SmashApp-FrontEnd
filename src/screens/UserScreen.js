import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudentInfo,
  updateStudentInfo,
} from '../actions/studentInfoActions';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../sidemenu/Sidebar';
import PurchaseLessons from '../components/user/PurchaseLessons';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReadOnlyUserData from '../components/user/ReadOnlyUserData';
import EditableUserData from '../components/user/EditableUserData';
import { useAuth0 } from '@auth0/auth0-react';
import { getLessons } from '../actions/lessonsActions';
import { getStudents } from '../actions/studentActions';
import { getPaytrackerInfo } from '../actions/paytrackerActions';
import { GET_LOGIN_SUCCESS } from '../constants/recept';

const UserScreen = () => {
  const { id } = useParams();

  // REDUX
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();

  const lessons = useSelector((state) => state.lessons);
  const { isLoading: lessonLoading, lessonsList } = lessons;

  const students = useSelector((state) => state.students);
  const { list: studentsList, isLoading: studentLoading } = students;

  const paytracker = useSelector((state) => state.paytracker);
  const { paytrackerList, isLoading: paytrackerLoading } = paytracker;

  useEffect(() => {
    // receptInfo
    if (isAuthenticated && !auth0Loading)
      dispatch({ type: GET_LOGIN_SUCCESS, payload: user });
    // lessons
    if (!lessonLoading && !lessonsList.length) dispatch(getLessons());
    // students
    if (!studentLoading && !studentsList.length) dispatch(getStudents());
    // paytracker
    if (!paytrackerLoading && !paytrackerList.length)
      dispatch(getPaytrackerInfo());
  }, [
    dispatch,
    isAuthenticated,
    auth0Loading,
    lessonLoading,
    lessonsList,
    studentLoading,
    studentsList,
    paytrackerLoading,
    paytrackerList,
  ]);

  const studentInfo = useSelector((state) => state.studentInfo);
  const { userInfo, credits, isPurchaseLoading } = studentInfo;
  const { user_id, fn, ln, email, dob, phone, isCg, medicalDesc } = userInfo;
  const { credit } = credits;

  // END REDUX

  useEffect(() => {
    dispatch(getStudentInfo(id));
  }, [dispatch]);

  useEffect(() => {
    if (!isPurchaseLoading) dispatch(getStudentInfo(id));
  }, [dispatch, isPurchaseLoading]);

  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({
    user_id,
    fn: '',
    ln: '',
    email: '',
    dob: '',
    phone: '',
    isCg: '',
    medicalDesc: '',
    credit: '',
  });

  const handleClickEdit = () => {
    const currentUserValues = {
      user_id,
      fn: fn,
      ln: ln,
      email: email,
      dob: dob,
      phone: phone,
      isCg,
      medicalDesc: medicalDesc,
      credit: credit,
    };

    setEditUserInfo(currentUserValues);
    setIsEditingUserInfo(true);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newUserFormData = { ...editUserInfo };
    newUserFormData[fieldName] = fieldValue;

    setEditUserInfo(newUserFormData);
  };

  // purchase lesson call

  const submitUserInfoChangesHandler = (
    e,
    userId,
    newUserInfo,
    receptInitials
  ) => {
    e.preventDefault();
    dispatch(updateStudentInfo(userId, newUserInfo, receptInitials));
    setIsEditingUserInfo(false);
  };

  return (
    <div className='meat'>
      <Sidebar />
      <div className='right-side'>
        <Navbar />
        <div className='main'>
          <motion.main
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            className='containerSolo'
          >
            {isEditingUserInfo ? (
              <EditableUserData
                editUserInfo={editUserInfo}
                setEditUserInfo={setEditUserInfo}
                handleEditFormChange={handleEditFormChange}
                submitUserInfoChangesHandler={submitUserInfoChangesHandler}
                setIsEditingUserInfo={setIsEditingUserInfo}
              />
            ) : (
              <ReadOnlyUserData handleClickEdit={handleClickEdit} />
            )}
            <motion.div
              whileHover={{ backgroundColor: '#fbfbfc' }}
              className='purchaseLesson userSection'
            >
              <PurchaseLessons userId={id} />
            </motion.div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default UserScreen;
