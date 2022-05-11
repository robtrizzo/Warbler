import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizatonToken(token) {
    setTokenHeader(token);
}

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthorizatonToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData) {
    return dispatch => {
        /**
         * we need to wait for the api call to complete before 
         * we dispatch this action. since we aren't using a 
         * lifecycle method, we need another promise to ensure
         * that the api call has finished before we dispatch anything
         * 
         * in React terminology, this is wrapping a 'thunk' in a promise
         * in order to wait for the API call.
         */
        return new Promise((resolve, reject) => {
            return apiCall('post', `api/auth/${type}`, userData)
                .then(({ token, ...user }) => {
                    localStorage.setItem('jwtToken', token);
                    setAuthorizatonToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve(); // indicate that the API call succeeded
                })
                .catch(err => {
                    // message object coming from custom error handler in server
                    dispatch(addError(err.message));
                    reject(); // indicate that the API call failed
                })
        })
    }
}