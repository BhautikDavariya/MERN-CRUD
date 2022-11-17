import { studentTypes } from '../action-types/ActionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case studentTypes.FETCHS_STUDENTS:
            return action.payload;
        default:
            return state;
    }
};