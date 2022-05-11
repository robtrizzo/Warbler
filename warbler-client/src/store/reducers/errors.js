import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

/**
 * Very rudimentary but flexible error handler that allows
 * us to add and remove errors in a simple structure.
 */
export default (state = { message: null }, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return { ...state, message: action.error }
        case REMOVE_ERROR:
            return { ...state, message: null }
        default:
            return state;
    }
}