import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from '../utils/auth';
import { ADD_USER, CREATE_GAME, CREATE_STATS, UPDATE_GAME } from "../utils/mutations";
import { QUERY_GAME } from "../utils/queries";
import { getWord } from '../utils/getWord';

function Signup(props) {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const [createGame] = useMutation(CREATE_GAME);
    const [createStats] = useMutation(CREATE_STATS);
    const [updateGame, { error }] = useMutation(UPDATE_GAME);

    

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                username: formState.username,
                password: formState.password,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
        // <Navigate to ="/game" />
        const username = Auth.getProfile(token).data.username;

        createGame({
            variables: {
                game_username: username
            }
        });

        createStats({
            variables: {
                stats_username: username
            }
        });

        const { todays_word, current_word} = getWord();

        console.log(todays_word, current_word);

        try {
            const { data } = await updateGame({
                variables: {
                    game_username: username,
                    todays_word: todays_word,
                    current_word: current_word
                }
            });

            if (data) {
                console.log("data", data);
            }
        } catch (e) {
            console.error(e);
        }
        

        
        


    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="container">
            <Link to="/login">← Go to Login</Link>

            <h2>Signup</h2>
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
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;