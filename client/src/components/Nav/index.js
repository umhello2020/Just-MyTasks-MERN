import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.module.css';

import Auth from '../../utils/auth';

const Nav = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const renderAuthLinks = () => {
        if (Auth.loggedIn()) {
            return (
                <>
                    <Link className="nav-link" to="/donation">
                        Donation
                    </Link>
                    <Link className="nav-link" to="/task">
                        Task
                    </Link>
                    <Link className="nav-link" to="/me">
                        {Auth.getProfile().data.username}'s Profile
                    </Link>
                    <button className="nav-link nav-logout-btn" onClick={logout}>
                        Logout
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                    <Link className="nav-link" to="/signup">
                        Signup
                    </Link>
                </>
            );
        }
    };

    return (
        <nav className="nav-header">
            <div className="container nav-container">
                <div className="nav-logo">
                    <Link className="nav-link" to="/">
                        <h1 className="nav-title">Just MyTasks</h1>
                    </Link>
                </div>
                <div className="nav-links">
                    {renderAuthLinks()}
                </div>
            </div>
        </nav>

    );
};

export default Nav;
