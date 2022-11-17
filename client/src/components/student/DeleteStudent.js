import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import DeletePopUp from '../../popup/DeletePopUp';
import { deleteStudent } from '../../store/action-types/Action';

function DeleteStudent(props) {
    const {studentId, setIsDelete} = props
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setIsDelete(false);

    useEffect(() => {
        setShow(true)
      }, [studentId])

      const deleteStudentData = () => {
        dispatch(deleteStudent(studentId))
        setIsDelete(false)
      }

  return (
    <>
    {show && <DeletePopUp show={show} handleClose={handleClose} deleteStudentData={deleteStudentData} studentId={studentId}/>}
    </>
  )
}

export default DeleteStudent