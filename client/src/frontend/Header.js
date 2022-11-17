import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { PersonPlusFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import AddStudentModel from '../components/student/AddStudentModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Button onClick={handleShow} className='text-center' variant="success">
            <FontAwesomeIcon icon={faUserPlus}  className='pe-2'/>
          Add Student
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {show && <AddStudentModel show={show} setShow={setShow} handleClose={handleClose}/>}
    </>
  );
}

export default Header;