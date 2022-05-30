import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header className="flex-row px-1">
                <Link to="/">
                    <h1>Wordy</h1>
                </Link>
                <nav>
                    <ul className="flex-row">
                        {Auth.loggedIn() ? (
                            <>
                                <li className="mx-1">
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li className="mx-1">
                                    <a href="/" onClick={logout}>
                                        Logout
                                    </a>
                                </li>
                                <li className="mx-1 flex-end">
                                    <Link to="/game">Play Now!</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mx-1">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="mx-1">
                                    <Link to="/signup">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
        </header>
    );
};

export default Header;