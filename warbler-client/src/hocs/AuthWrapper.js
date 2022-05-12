import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const mapState = state => ({
    isAuthenticated: state.currentUser.isAuthenticated
});

const useAuth = () => {
    const { isAuthenticated } = useSelector(mapState);
    const navigate = useNavigate();

    useEffect(
        () => {
            if (!isAuthenticated) {
                navigate('/signin')
            }
        },
        [isAuthenticated]
    );
    return isAuthenticated;
}

const AuthWrapper = (props) => useAuth() && props.children;
export default AuthWrapper;