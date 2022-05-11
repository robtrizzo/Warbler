import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./Navbar";
import Main from './Main';
import { setAuthorizatonToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from 'jwt-decode';

const store = configureStore();

/**
 * When the page refreshes, check if there is an
 * auth token and keep it so that the user doesn't
 * need to sign in again.
 */
if (localStorage.jwtToken) {
    setAuthorizatonToken(localStorage.jwtToken);
    /**
     * prevent someone from manually tampering
     * with the key of jwtToken in localStorage
     */
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (err) {
        store.dispatch(setCurrentUser({}));
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="onboarding">
                <Navbar />
                <Main />
            </div>
        </Router>
    </Provider>
);

export default App;
