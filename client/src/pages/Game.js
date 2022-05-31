import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_GAME, UPDATE_STATS } from "../utils/mutations";
import { QUERY_GAME, QUERY_STATS } from "../utils/queries";
import Auth from "../utils/auth";
import { checkLetters } from "../utils/wordFunctions";
import { Navigate } from "react-router-dom";

const Game = () => {
  const [formState, setFormState] = useState({ guess: "" });
  const [updateGame] = useMutation(UPDATE_GAME);
  const username = Auth.getProfile().data.username;
  const [updateStats] = useMutation(UPDATE_STATS, { variables: { stats_username: username } });
  const { data: userStats } = useQuery(QUERY_STATS, { variables: { stats_username: username } });

  const { loading, data: gameData } = useQuery(QUERY_GAME, {
    variables: { game_username: username },
  });

  let games_played = userStats?.stats.games_played;
  let games_won = userStats?.stats.games_won;
  let current_streak = userStats?.stats.current_streak;

  if (gameData) {
    

    if (gameData.game.incorrect_letters_guessed.length >= 6) {
      // End the game - LOSE
      // have a modal pop up?
      console.log(gameData);

      updateStats({
        variables: {
            stats_username: username,
            games_played: games_played + 1,
            games_won: games_won,
            current_streak: 0
        }
      });

      updateGame({
        variables: {
          game_username: username,
          current_word: gameData.game.current_word,
          correct_letters_guessed: gameData.game.correct_letters_guessed,
          todays_word: gameData.game.todays_word,
          incorrect_letters_guessed: gameData.game.incorrect_letters_guessed,
          game_date: gameData.game.game_date,
          game_finished: true
        },
      });

      return <Navigate to="/profile" />
    }
  }

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
    // debugger;

    const correct_letters_guessed = [...gameData.game.correct_letters_guessed];
    const incorrect_letters_guessed = [
      ...gameData.game.incorrect_letters_guessed,
    ];
    const todays_word = [...gameData.game.todays_word];
    const current_word = [...gameData.game.current_word];

    console.log(incorrect_letters_guessed);
    console.log(correct_letters_guessed);
    console.log(todays_word);
    console.log(current_word);

    formState.guess = formState.guess.toUpperCase();

    let guess = formState.guess;

    console.log(guess);

    let incorrectCheck = checkLetters(incorrect_letters_guessed, guess);

    let correctCheck = checkLetters(correct_letters_guessed, guess);

    if (correctCheck || incorrectCheck) {
      // if it's not in either, do the other checks

      alert("You've already guessed this, idiot.");
      return;
    }

    let letterCheck = checkLetters(todays_word, guess);

    if (letterCheck) {
      // If letter matches one from "todays_word", then it will push that letter to the "current_word" array at that index
      for (let i = 0; i < todays_word.length; i++) {
        if (guess === todays_word[i]) {
          current_word.splice(i, 1, guess);
          console.log(current_word);
        }
      }

      // Push the letter into the correct_letters_guessed array
      correct_letters_guessed.push(guess);
      console.log(correct_letters_guessed);
      // update game call
      updateGame({
        variables: {
          game_username: username,
          current_word: current_word,
          correct_letters_guessed: correct_letters_guessed,
          todays_word: gameData.game.todays_word,
          incorrect_letters_guessed: gameData.game.incorrect_letters_guessed,
          game_date: gameData.game.game_date,
          game_finished: gameData.game.game_finished
        },
      });

      if (!current_word.includes('-')) {
        // End the game - WIN!!
        // have a modal pop up?
        updateStats({
          variables: {
              stats_username: username,
              games_played: games_played + 1,
              games_won: games_won + 1,
              current_streak: current_streak + 1
          }
        });

        updateGame({
          variables: {
            game_username: username,
            current_word: current_word,
            correct_letters_guessed: correct_letters_guessed,
            todays_word: gameData.game.todays_word,
            incorrect_letters_guessed: gameData.game.incorrect_letters_guessed,
            game_date: gameData.game.game_date,
            game_finished: true
          },
        });

        return <Navigate to="/profile" />
      }

    } else {
      // Push the letter into the incorrect_letters_guessed array
      incorrect_letters_guessed.push(guess);
      console.log(incorrect_letters_guessed);

      // update game call
      updateGame({
        variables: {
          game_username: username,
          incorrect_letters_guessed: incorrect_letters_guessed,
          current_word: gameData.game.current_word,
          correct_letters_guessed: gameData.game.correct_letters_guessed,
          todays_word: gameData.game.todays_word,
          game_date: gameData.game.game_date,
          game_finished: gameData.game.game_finished
        },
      });
    }
  };
<<<<<<< HEAD
=======

  //src={require(`../assets/${imageArray[imageIndex]}`)}

  if (loading) {
    return (
      <div>loading</div>
    )
  }

>>>>>>> b21e8edb13af75e35bb091e5a15e341e21717c2e
  return (
    <main>
      <div>GAME TIME</div>
      <div>
        <img
          id="hangman"
<<<<<<< HEAD
          src={require(`../assets/${imageArray[imageIndex]}`)}
=======
          src={require(`../assets/${imageArray[gameData.game.incorrect_letters_guessed.length || 0]}`)}
>>>>>>> b21e8edb13af75e35bb091e5a15e341e21717c2e
          alt="Carlie Anglemire"
        />
      </div>
      <div>{gameData.game.correct_letters_guessed}</div>
      <div>{gameData.game.incorrect_letters_guessed}</div>
      <div>{gameData.game.current_word}</div>
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
