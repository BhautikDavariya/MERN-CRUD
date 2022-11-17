import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteLogo from '../assets/Images/icons8-remove-100.png';



function DeletePopUp(props) {
    const {show, handleClose, deleteStudentData, studentId} = props
  return (
    <Modal show={show} onHide={handleClose}>
    {/* <Modal.Header> */}
      {/* <Modal.Title>Modal heading</Modal.Title> */}
    {/* </Modal.Header> */}
    <Modal.Body className='text-center'>
        <img src={DeleteLogo} alt="Girl in a jacket"/>
        <h4>Are You Sure?</h4>
        <h5>You whent To Delete This</h5>
        <h6>Id : {studentId}</h6>
    </Modal.Body>
    <Modal.Footer className='align-items-center justify-content-center'>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={deleteStudentData}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default DeletePopUp