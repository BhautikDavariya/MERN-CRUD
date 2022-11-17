import {combineReducers} from 'redux';
import EditStudent from './EditStudent';
import StudentReducer from './StudentReducer';


export default combineReducers({
    students: StudentReducer,
    getStudentData: EditStudent
});
