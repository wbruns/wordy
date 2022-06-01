import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_GAME, UPDATE_STATS } from "../utils/mutations";
import { QUERY_GAME, QUERY_STATS } from "../utils/queries";
import Auth from "../utils/auth";
import { checkLetters } from "../utils/wordFunctions";
import { Navigate } from "react-router-dom";

const Game = () => {
  const [formState, setFormState] = useState({ guess: "" });
  const username = Auth.getProfile().data.username;

  // Database calls
  const [updateGame] = useMutation(UPDATE_GAME);
  const [updateStats] = useMutation(UPDATE_STATS, {
    variables: { stats_username: username },
  });
  const { data: userStats } = useQuery(QUERY_STATS, {
    variables: { stats_username: username },
  });
  const { loading, data: gameData } = useQuery(QUERY_GAME, {
    variables: { game_username: username },
  });

  // Variables for Stats db calls
  let games_played = userStats?.stats.games_played;
  let games_won = userStats?.stats.games_won;
  let current_streak = userStats?.stats.current_streak;

  if (gameData) {
    // If the user has guessed incorrectly 6 times, the game ends and the user loses
    if (gameData.game.incorrect_letters_guessed.length >= 6) {
      // Update the stats to reset the current_streak and update the games_played by 1
      updateStats({
        variables: {
          stats_username: username,
          games_played: games_played + 1,
          games_won: games_won,
          current_streak: 0,
        },
      });

      // Update the game to show game_finished as true
      updateGame({
        variables: {
          game_username: username,
          current_word: gameData.game.current_word,
          correct_letters_guessed: gameData.game.correct_letters_guessed,
          todays_word: gameData.game.todays_word,
          incorrect_letters_guessed: gameData.game.incorrect_letters_guessed,
          game_date: gameData.game.game_date,
          game_finished: true,
        },
      });

      // Automatically route the user to profile when the game is done and has been lost
      return <Navigate to="/profile" />;
    } else if (gameData.game.game_finished === true) {
      // Automatically route the user to profile when the game is done and has been won
      return <Navigate to="/profile" />;
    }
  }

  // Images of the hangman
  const imageArray = [
    "Image_1.jpg",
    "Image_2.jpg",
    "Image_3.jpg",
    "Image_4.jpg",
    "Image_5.jpg",
    "Image_6.jpg",
    "Image_7.jpg",
  ];

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    // event.preventDefault();

    // Variables for Game db calls
    const correct_letters_guessed = [...gameData.game.correct_letters_guessed];
    const incorrect_letters_guessed = [
      ...gameData.game.incorrect_letters_guessed,
    ];
    const todays_word = [...gameData.game.todays_word];
    const current_word = [...gameData.game.current_word];

    // Automatically change user input to a capitalized letter
    formState.guess = formState.guess.toUpperCase();

    let guess = formState.guess;

    // Function to check if the user's guess is already in the arrays incorrect_letters_guessed and correct_letters_guessed
    let incorrectCheck = checkLetters(incorrect_letters_guessed, guess);
    let correctCheck = checkLetters(correct_letters_guessed, guess);

    // If it's not in either array, continue on to other checks. Otherwise, return message about duplicate guess.
    if (correctCheck || incorrectCheck) {
      alert("You've already guessed this, idiot.");
      return;
    }

    // Function to check if user's guess matches at least one letter in todays_word
    let letterCheck = checkLetters(todays_word, guess);

    if (letterCheck) {
      // If letter matches one from "todays_word", then it will push that letter to the "current_word" array at that index
      for (let i = 0; i < todays_word.length; i++) {
        if (guess === todays_word[i]) {
          current_word.splice(i, 1, guess);
        }
      }

      // Push the letter into the correct_letters_guessed array
      correct_letters_guessed.push(guess);

      // Update game call with new current_word and correct_letters_guessed arrays
      updateGame({
        variables: {
          game_username: username,
          current_word: current_word,
          correct_letters_guessed: correct_letters_guessed,
          todays_word: gameData.game.todays_word,
          incorrect_letters_guessed: gameData.game.incorrect_letters_guessed,
          game_date: gameData.game.game_date,
          game_finished: gameData.game.game_finished,
        },
      });

      // If all - has been replaced in the current_word, then the user has won
      if (!current_word.includes("-")) {
        // Update the user's stats to increase all fields by 1 after win
        updateStats({
          variables: {
            stats_username: username,
            games_played: games_played + 1,
            games_won: games_won + 1,
            current_streak: current_streak + 1,
          },
        });

        // Update the game with the new current_word and correct_letters_guessed arrays and change game_finished to true
        updateGame({
          variables: {
            game_username: username,
            current_word: current_word,
            correct_letters_guessed: correct_letters_guessed,
            todays_word: gameData.game.todays_word,
            incorrect_letters_guessed: gameData.game.incorrect_letters_guessed,
            game_date: gameData.game.game_date,
            game_finished: true,
          },
        });

        // Automatically route the user to profile when the game is done and has been won
        return <Navigate to="/profile" />;
      }
    } else {
      // Push the letter into the incorrect_letters_guessed array
      incorrect_letters_guessed.push(guess);

      // Update the game with the new incorrect_letters_guessed array
      updateGame({
        variables: {
          game_username: username,
          incorrect_letters_guessed: incorrect_letters_guessed,
          current_word: gameData.game.current_word,
          correct_letters_guessed: gameData.game.correct_letters_guessed,
          todays_word: gameData.game.todays_word,
          game_date: gameData.game.game_date,
          game_finished: gameData.game.game_finished,
        },
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div>GAME TIME</div>
      <div>
        <img
          id="hangman"
          src={require(`../assets/${
            imageArray[gameData.game.incorrect_letters_guessed.length || 0]
          }`)}
          alt="The hangman person"
        />
      </div>
      <div>Correct Letters:&nbsp;{gameData.game.correct_letters_guessed}</div>
      <div>Incorrect Letters:&nbsp;{gameData.game.incorrect_letters_guessed}</div>
      <div>{gameData.game.current_word}</div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="guess">Guess:&nbsp;</label>
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
