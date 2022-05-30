import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_GAME } from '../utils/queries';
import Auth from "../utils/auth";
import { checkLetters } from "../utils/wordFunctions";



const Game = () => {
  const [formState, setFormState] = useState({ guess: "" });
  

  const username = Auth.getProfile().data.username;

  const { loading, data: gameData } = useQuery(QUERY_GAME, {
      variables: { game_username: username }
  });

  console.log(gameData);

  const imageArray = [
    "Image_1.jpg",
    "Image_2.jpg",
    "Image_3.jpg",
    "Image_4.jpg",
    "Image_5.jpg",
    "Image_6.jpg",
    "Image_7.jpg",
  ];

  let imageIndex = 4;

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    formState.guess = formState.guess.toUpperCase();

    console.log(formState.guess);
    
    console.log(checkLetters(gameData.game.correct_letters_guessed , formState.guess));

    checkLetters(gameData.game.incorrect_letters_guessed , formState.guess);
  };

  return (
    <main>
      <div>GAME TIME</div>
      <div>
        <img
          id="hangman"
          src={require(`../assets/${imageArray[imageIndex]}`)}
          alt="Carlie Anglemire"
        />
      </div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="guess">Guess:</label>
          <input
            placeholder="Enter a letter"
            name="guess"
            type="guess"
            maxLength={1}
            required
            pattern="^[A-Za-z]+$"
            value={formState.guess}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Game;
