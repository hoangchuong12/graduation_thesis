import React, { useState } from 'react';
import { useAdminContext } from '.';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'; 
// import { ToastContainer } from "react-toastify";
const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAdminContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User name:" , username);
        console.log("Password:" , password);
        const authRequest = {
            username: username,
            password: password
        };
        login(authRequest);
    };
    

    return (
        <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
                <div className="card shadow-lg bg-white rounded">
                    <div className="card-body p-5">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3 input-group">
                                <span className="input-group-text"><FaUser /></span>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4 input-group">
                                <span className="input-group-text"><FaLock /></span>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 shadow-sm">Login</button>
                        </form>
                        <p className="text-center mt-3">
                            Don't have an account? <Link to="/signup" className="text-primary">Sign up here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default LoginAdmin;
