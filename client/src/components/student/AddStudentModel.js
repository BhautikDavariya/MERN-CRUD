import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../../store/action-types/Action';

function AddStudentModel(props) {
  const { show, handleClose, setShow, setIsEdit, singleStudent } = props
  const dispatch = useDispatch()

  const [formValue, setFormValue] = useState({
    firstName: '',
    _id:'',
    lastName: '',
    age: '',
    email: '',
    city: '',
    phoneno: '',
    password: '',
    confirmpassword: ''
});

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    city: '',
    phoneno: '',
    password: '',
    confirmpassword: ''
});

useEffect(() => {
  if(singleStudent){
    setFormValue({
      firstName: singleStudent ? singleStudent[0].firstName : '',
      lastName: singleStudent ? singleStudent[0].lastName : '',
      age: singleStudent ? singleStudent[0].age : '',
      email: singleStudent ? singleStudent[0].email : '',
      city: singleStudent ? singleStudent[0].city : '',
      phoneno: singleStudent ? singleStudent[0].phoneno : '',
      password: singleStudent ? singleStudent[0].password : '',
      confirmpassword: singleStudent ? singleStudent[0].confirmpassword : '',
      _id: singleStudent ? singleStudent[0].id : ''
    })
  }
}, [singleStudent])

const onChangeInput = (e) => {
  e.preventDefault();
  setFormValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
  setErrors('');
};



const handleValidation = () => {
  let errorss = {};
  let isValid = false;
  if (!formValue['firstName']) {
      errorss['firstName'] = 'Please enter frist name';
  } else if (!formValue['lastName']) {
      errorss['lastName'] = 'Please enter last name';
  } else if (!formValue['age']) {
      errorss['age'] = 'Please enter age';
  } else if (!EmailValidator.validate(formValue['email'])) {
    if (!formValue['email']) {
        errorss['email'] = "Please enter email address";
    } else {
        errorss['email'] = 'Please enter valid email address';
    }
  } else if (!formValue['city']) {
    errorss['city'] = "Please enter city";
  } else if (!formValue['phoneno']) {
    errorss['phoneno'] = "Please enter phone Number";
  } else if (formValue['phoneno'].length > 10 || formValue['phoneno'].length < 10) {
    errorss['phoneno'] = "Please enter valid phone Number";
  } else if (!formValue['password']) {
    errorss['password'] = "Please enter password";
  } else if (!formValue['confirmpassword']) {
    errorss['confirmpassword'] = "Please enter confirm password";
  } else if (formValue['password'] !== formValue['confirmpassword']) {
    errorss['confirmpassword'] = "password and confirm password should be same";
  } else {
    isValid = true;
  }
  setErrors(errorss);
  return isValid;
};

const preperArray = (formValue) => {
  const datas = {
    firstName: formValue.firstName,
    lastName: formValue.lastName,
    age: formValue.age,
    email: formValue.email,
    city: formValue.city,
    phoneno: formValue.phoneno,
    password: formValue.password,
    confirmpassword: formValue.confirmpassword
  }
  return datas
}


const onSubmit = (event) => {
  event.preventDefault();
  const valid = handleValidation();
  if(!singleStudent && valid){
    dispatch(addStudent(preperArray(formValue),setShow))
    dispatch(setShow(false))
  } else {
    if (valid) {
    dispatch(updateStudent(formValue))
    dispatch(setIsEdit(false))
    dispatch(setShow(false))
    }
  }
};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='row'>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Frist Name</Form.Label>
                <Form.Control
                  type="text"
                  name='firstName'
                  placeholder="Frist Name"
                  value={formValue.firstName}
                  onChange={(e) => onChangeInput(e)}
                />
                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['firstName'] ? errors['firstName'] : null}</span>
              </Form.Group>
            </div>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name='lastName'
                  placeholder="Last Name"
                  value={formValue.lastName}
                  onChange={(e) => onChangeInput(e)}
                />
                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['lastName'] ? errors['lastName'] : null}</span>
              </Form.Group>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name='age'
                  placeholder="00"
                  value={formValue.age}
                  onChange={(e) => onChangeInput(e)}
                />
                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['age'] ? errors['age'] : null}</span>
              </Form.Group>
            </div>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='text' name='email'
                placeholder={'email'}
                value={formValue.email}
                onChange={(e) => onChangeInput(e)}
                />
                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['email'] ? errors['email'] : null}</span>
              </Form.Group>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name='city'
                  placeholder="City"
                  value={formValue.city}
                  onChange={(e) => onChangeInput(e)}
                />
                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['city'] ? errors['city'] : null}</span>
              </Form.Group>
            </div>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                  type="number"
                  name='phoneno'
                  placeholder="Phone Number"
                  value={formValue.phoneno}
                  onChange={(e) => onChangeInput(e)}
                />
                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['phoneno'] ? errors['phoneno'] : null}</span>
              </Form.Group>
            </div>
          </div>
        {!singleStudent && 
                <div className='row'>
                <div className='col-6'>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInpu7">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      name='password'
                      placeholder="Password"
                      value={formValue.password}
                      onChange={(e) => onChangeInput(e)}
                    />
                    <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['password'] ? errors['password'] : null}</span>
                  </Form.Group>
                </div>
                <div className='col-6'>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                    <Form.Label>Confrim Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Confrim Password"
                      name='confirmpassword'
                      value={formValue.confirmpassword}
                      onChange={(e) => onChangeInput(e)}
                    />
                    <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['confirmpassword'] ? errors['confirmpassword'] : null}</span>
                  </Form.Group>
                </div>
              </div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => onSubmit(e)}>
          {singleStudent ? 'Update' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddStudentModel