import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import {
  ADD_USER,
  CREATE_GAME,
  CREATE_STATS,
  UPDATE_GAME,
} from "../utils/mutations";
import { getWord } from "../utils/wordFunctions";

function Signup(props) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const [createGame] = useMutation(CREATE_GAME);
  const [createStats] = useMutation(CREATE_STATS);
  const [updateGame] = useMutation(UPDATE_GAME);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;

    const username = formState.username;

    // Creates a new Game object for the new User
    const { data: newGame } = await createGame({
      variables: {
        game_username: username,
      },
    });

    // Creates a new Stats object for the new User
    createStats({
      variables: {
        stats_username: username,
      },
    });

    // Chooses the puzzle word for today's puzzle and transforms it into two arrays of letters
    const { todays_word, current_word } = getWord();

    Auth.login(token);

    try {
      // Adds todays_word and current_word to the Game
      const { data } = await updateGame({
        variables: {
          game_username: username,
          todays_word: todays_word,
          current_word: current_word,
          correct_letters_guessed: newGame.createGame.correct_letters_guessed,
          incorrect_letters_guessed:
            newGame.createGame.incorrect_letters_guessed,
          game_date: newGame.createGame.game_date,
          game_finished: newGame.createGame.game_finished,
        },
      });
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
          <label htmlFor="user">Username:</label>
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
  );
}

export default Signup;
