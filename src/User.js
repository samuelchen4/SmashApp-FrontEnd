import React, {
  useState,
  useEffect,
  TextareaHTMLAttributes,
  Fragment,
} from 'react';
import Navbar from './Navbar';
import Sidebar from './sidemenu/Sidebar';
import SelectStudents from './SelectStudents';
import PurchaseLessons from './PurchaseLessons';
import { Link, useParams } from 'react-router-dom';
import { set } from 'date-fns/esm';
import Axios from 'axios';
import { motion } from 'framer-motion';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
// import DatePicker from 'react-multi-date-picker';
// import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import Select from 'react-select'; //accepts value and label properties
import ReadOnlyUserData from './ReadOnlyUserData';
import EditableUserData from './EditableUserData';
import { useAuth0 } from '@auth0/auth0-react';

const User = () => {
  const domain = 'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com';
  const { id } = useParams();

  const { user, isAuthenticated } = useAuth0();

  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);

  const [purchaseInfo, setPurchaseInfo] = useState([]);
  const [saleInfo, setSaleInfo] = useState([]);
  const [lessonHistory, setLessonHistory] = useState([]);
  const [unpaidLessons, setUnpaidLessons] = useState([]);
  const [lessonInfo, setLessonInfo] = useState([]);
  const [lessonsAvailable, setLessonsAvailable] = useState([]);
  // const [displayLessons, setDisplayLessons] = useState('');

  const [purchaseTable, setPurchaseTable] = useState('');
  const [saleTable, setSaleTable] = useState('');

  const [students, setStudents] = useState([]);

  const [credit, setCredit] = useState(0);

  const [userInfo, setUserInfo] = useState('');

  const [editUserInfo, setEditUserInfo] = useState({
    fn: '',
    ln: '',
    email: '',
    dob: '',
    phone: '',
    cgStatus: '',
    medicalDesc: '',
    credit: '',
  });

  const handleClickEdit = () => {
    const currentUserValues = {
      fn: userInfo.fn,
      ln: userInfo.ln,
      email: userInfo.email,
      dob: userInfo.dob,
      phone: userInfo.phone,
      cgStatus: userInfo.isCg,
      medicalDesc: userInfo.medicalDesc,
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

  const calculateCreditChange = () => {
    //calculates how much credit to add or subtract
    //based on current credit value and the value inputted
    //call this function in handleEditFormSubmit

    const initialCredit = credit;
    const changedCredit = Number(editUserInfo.credit);

    const creditDifference = changedCredit - initialCredit;
    console.log(initialCredit, changedCredit, creditDifference);
    return creditDifference;
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedUserInfo = {
      fn: editUserInfo.fn,
      ln: editUserInfo.ln,
      email: editUserInfo.email,
      dob: editUserInfo.dob,
      phone: editUserInfo.phone,
      cgStatus: editUserInfo.cgStatus,
      medicalDesc: editUserInfo.medicalDesc,
      // credit: editUserInfo.credit,
    };

    const editedCredit = editUserInfo.credit;

    const putCredit = calculateCreditChange();
    Axios.put(`${domain}/user/${id}`, {
      fn: editUserInfo.fn,
      ln: editUserInfo.ln,
      email: editUserInfo.email,
      dob: editUserInfo.dob,
      phone: editUserInfo.phone,
      cgStatus: editUserInfo.cgStatus,
      medicalDesc: editUserInfo.medicalDesc,
      creditChange: putCredit,
      receptInitials: user.userInitials,
    })
      .then((res) => {
        console.log(res);
        setUserInfo(editedUserInfo);
        setCredit(editedCredit);
      })
      .catch((err) => console.log(err));

    setIsEditingUserInfo(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // useEffect(() => {
  //   renderPurchaseLog();
  // }, [purchaseInfo]);

  // useEffect(() => {
  //   renderSalesLog();
  // }, [purchaseInfo]);

  //get userinfo, purchase and sales data in three seperate arrays
  const getUserData = () => {
    const userId = id;
    Axios.get(`${domain}/user/${userId}`)
      .then((res) => {
        // console.log(res);
        setUserInfo(res.data.userInfo);
        setPurchaseInfo(res.data.purchaseLog);
        setSaleInfo(res.data.salesLog);
        setLessonHistory(res.data.lessonHistory);
        setUnpaidLessons(res.data.unpaidLessons);
        setLessonInfo(res.data.lessonTypes);
        setLessonsAvailable(res.data.avaliableLessons);
        setCredit(res.data.credits.credit ? res.data.credits.credit : 0);
        setStudents(res.data.users);
      })
      .catch((err) => console.log(err));
  };

  // const setPartnerDropdownData = () => {
  //   setStudentsDropdown(
  //     students.map((user) => {
  //       return {
  //         label: `${user.fn} ${user.ln}`,
  //         value: user.user_id,
  //       };
  //     })
  //   );
  // };

  const renderPurchaseLog = () => {
    setPurchaseTable(
      purchaseInfo.map((purchase) => {
        return (
          <tr key={purchase.purchase_id}>
            <td>{purchase.purchase_id}</td>
            <td>{purchase.type_name}</td>
            <td>
              {purchase.scheduleddate
                ? purchase.scheduleddate.slice(0, 10)
                : 'N/A'}
            </td>
            <td>{purchase.pay_method}</td>
            <td>{purchase.date ? purchase.date.slice(0, 10) : 'N/A'}</td>
            <td>{purchase.receptInitial_purchase}</td>
          </tr>
        );
      })
    );
  };

  const renderSalesLog = () => {
    setSaleTable(
      saleInfo.map((sale) => {
        return (
          <tr key={sale.purchase_id}>
            <td>{sale.purchase_id}</td>
            <td>{sale.type_name}</td>
            <td>
              {sale.scheduleddate ? sale.scheduleddate.slice(0, 10) : 'N/A'}
            </td>
            <td>{sale.pay_method}</td>
            <td>{sale.date.slice(0, 10)}</td>
            <td>{sale.receptInitial_sale}</td>
          </tr>
        );
      })
    );
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
                purchaseTable={purchaseTable}
                saleTable={saleTable}
                lessonHistory={lessonHistory}
                userInfo={userInfo}
                credit={credit}
                editUserInfo={editUserInfo}
                setEditUserInfo={setEditUserInfo}
                handleEditFormChange={handleEditFormChange}
                handleEditFormSubmit={handleEditFormSubmit}
                setIsEditingUserInfo={setIsEditingUserInfo}
              />
            ) : (
              <ReadOnlyUserData
                purchaseTable={purchaseTable}
                saleTable={saleTable}
                lessonHistory={lessonHistory}
                userInfo={userInfo}
                credit={credit}
                handleClickEdit={handleClickEdit}
              />
            )}

            <motion.div
              whileHover={{ backgroundColor: '#fbfbfc' }}
              className='purchaseLesson userSection'
            >
              <PurchaseLessons
                lessonInfo={lessonInfo}
                credit={credit}
                students={students}
                domain={domain}
                userId={id}
                setCredit={setCredit}
                receptInfo={user}
                lessonHistory={lessonHistory}
                unpaidLessons={unpaidLessons}
                setLessonHistory={setLessonHistory}
                getUserData={getUserData}
              />
            </motion.div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default User;
