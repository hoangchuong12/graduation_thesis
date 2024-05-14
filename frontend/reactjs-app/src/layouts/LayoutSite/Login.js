import React, { useState } from 'react';
import { useUserContext } from './';
import { Link, useLocation } from 'react-router-dom';
import './loginSite.css';
import { FaFacebookF, FaGoogle, FaTwitter, FaGithub } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const { login } = useUserContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        const authRequest = {
            username: username,
            password: password
        };
        const redirectTo = location.state?.redirectTo || "/";
        login(authRequest, redirectTo);
    };

    return (
        <div className="login-site">
            <div className="dashboard-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Đăng nhập</button>
                {/* 2 column grid layout for inline styling */}
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        {/* Checkbox */}
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="form2Example31" defaultChecked />
                            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                        </div>
                    </div>
                    <div className="col">
                        {/* Simple link */}
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>
                {/* Submit button */}
               
                {/* Register buttons */}
                <div className="text-center">
                    <p>Not a member? <a href="/register">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaFacebookF />
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaGoogle />
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaTwitter />
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <FaGithub />
                    </button>
                </div>
            </form>
        </div>
        </div>

    );
};

export default Login;
