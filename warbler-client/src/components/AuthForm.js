import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function AuthForm(props) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const {
        heading,
        buttonText,
        signup,
        errors,
        removeError
    } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const authType = props.signup ? 'signup' : 'signin';
        props.onAuth(authType, { email, username, password, profileImageUrl })
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                return;
            });
    };

    useEffect(() => {
        removeError();
    }, [location]);

    return (
        <div>
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h2>{heading}</h2>
                        {errors.message &&
                            <div
                                className="alert alert-danger"
                            >
                                {errors.message}
                            </div>}
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        {signup && (
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                />
                                <label htmlFor="image-url">Image URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="image-url"
                                    name="profileImageUrl"
                                    onChange={e => setProfileImageUrl(e.target.value)}
                                    value={profileImageUrl}
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary btn-block btn-lg"
                        >
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;