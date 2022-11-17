import { studentTypes } from '../action-types/ActionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case studentTypes.FETCH_STUDENT:
            return action.payload;
        default:
            return state;
    }
};