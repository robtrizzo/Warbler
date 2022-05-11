import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false, // true when user logged in
    user: {
        // all the user info when logged in
    }
};

// logouts will be handled by SET_CURRENT_USER with an empty user object
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                // the !! turns a potentially empty object into a boolean false
                isAuthenticated: !!Object.keys(action.user).length > 0,
                user: action.user
            };
        default:
            return state;
    }
}