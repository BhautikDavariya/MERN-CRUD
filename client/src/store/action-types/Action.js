import { studentTypes } from "./ActionTypes";
import axios from 'axios';
import { errorNotify, notify } from "../../toast/ThorMessage";


export const fetchsStudents = (page, perPage, setTotalRows, setPerPage) => async (dispatch) => {
  // `http://localhost:4000/api/student/get-all?page=${page}&per_page=${perPage}&delay=1`
    // await  axios.get(`http://localhost:4000/api/student/get-all`)
    await  axios.get(`http://localhost:4000/api/student/get-all?page=${page}&per_page=${perPage}`)
    .then(
      (result) => {
        console.log("data", result.data.data.data)
        dispatch({type: studentTypes.FETCHS_STUDENTS , payload: result.data.data.data});
        dispatch(setTotalRows(result.data.data.totalPosts))
        dispatch((setPerPage(result.data.data.rowsPerPage)))
      },
      (error) => {
        // dispatch(errorNotify(error))
      }
    )
};


export const addStudent = (Student, setShow) => async (dispatch) => {
  await axios.post("http://localhost:4000/api/student/add", Student)
  .then(
    (result) => {
      if(result.data.error){
        dispatch(errorNotify(result.data.message))
      } else {
      dispatch(fetchsStudents())
      dispatch(notify('Student Add Sucsessfull'))
      }
    },
    (error) => {
      // dispatch(errorNotify(error))
    }
  )
};


export const getStudent = (StudentId, setShow) => async (dispatch) => {
  await axios.get("http://localhost:4000/api/student/get-by-id?_id=" + StudentId)
  .then(
    (result) => {
      dispatch({type: studentTypes.FETCH_STUDENT , payload: result.data});
    },
    (error) => {
      // dispatch(errorNotify(error))
    }
  )
};


export const updateStudent = (Student, setShow) => async (dispatch) => {
  await axios.post("http://localhost:4000/api/student/update", Student)
  .then(
    (result) => {
      dispatch(fetchsStudents())
      dispatch(notify('Student Update Sucsessfull'))
    },
    (error) => {
      // dispatch(errorNotify(error))
    }
  )
};


export const deleteStudent = (StudentId, setShow) => async (dispatch) => {
  await axios.delete("http://localhost:4000/api/student/delete?_id=" + StudentId)
  .then(
    (result) => {
      dispatch(fetchsStudents())
      dispatch(notify('Student Delete Sucsessfull'))
    },
    (error) => {
      // dispatch(errorNotify(error))
    }
  )
};
