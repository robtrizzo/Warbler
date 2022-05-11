import axios from 'axios';

export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

/**
 * A wrapper around axios API call that formats errors, etc
 * @param {string} method the HTTP verb you want to use 
 * @param {string} path the route path / endpoint 
 * @param {object} data (optional) data in JSON form for POST requests 
 * @returns 
 */
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        /**
         * when we get data back from axios, it always comes in the 
         * form of an object called 'response' with a sub-object 
         * called 'data'. Further, the 'data' subobject has a 
         * subobject called 'error' in the event something went wrong.
         */
        return axios[method.toLowerCase()](path, data)
            .then(res => {
                return resolve(res.data);
            })
            .catch(err => {
                return reject(err.response.data.error);
            })
    })
}