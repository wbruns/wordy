import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            username: '',
            password: '',
        });
    };

    return (
        <div className="container">
            <Link to="/signup">← Go to Signup</Link>

            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex-row">
                    <label htmlFor="user">Username</label>
                    <input
                        placeholder="username"
                        name="username"
                        type="username"
                        id="user"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                {error ? (
                    <div>
                        <p>The provided credentials are incorrect</p>
                    </div>
                ) : null}
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}