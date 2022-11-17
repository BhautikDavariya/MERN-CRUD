import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import Student from './components/student/Student';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>
      <ToastContainer />
        <Routes>
            <Route path='/' element={<Student/>}/>
        </Routes>
      </div>
  )
}

export default App