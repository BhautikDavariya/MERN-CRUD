import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStudent } from '../../store/action-types/Action'
import AddStudentModel from './AddStudentModel'

function EditStudents(props) {
    const {studentId, setIsEdit} = props
    const dispatch = useDispatch()
    const {getStudentData} = useSelector(state => state)
    const [show, setShow] = useState(false);
    const handleClose = () => setIsEdit(false);

    useEffect(() => {
        dispatch(getStudent(studentId))
        setShow(true)
      }, [studentId])


      const singleStudent = getStudentData?.length === 1 && getStudentData?.map(item => ({
        firstName: item.firstName,
        lastName: item.lastName,
        age: item.age,
        email: item.email,
        city: item.city,
        phoneno: item.phoneno,
        id: item._id,
        password: item.password,
        confirmpassword: item.confirmpassword
      }));

  return (
    <>
    {show && <AddStudentModel setIsEdit={setIsEdit} show={show} setShow={setShow} handleClose={handleClose} singleStudent={singleStudent} />}
    </>
  )
}

export default EditStudents