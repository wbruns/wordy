import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_GAME } from "../utils/mutations";
import { QUERY_GAME } from "../utils/queries";
import Auth from "../utils/auth";
import { checkLetters } from "../utils/wordFunctions";

const Game = () => {
  const [formState, setFormState] = useState({ guess: "" });
  const [updateGame, { error }] = useMutation(UPDATE_GAME);
  const username = Auth.getProfile().data.username;

  const { loading, data: gameData } = useQuery(QUERY_GAME, {
    variables: { game_username: username },
  });

  if (!loading) {
    console.log(gameData);
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

  let imageIndex = 0;

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
    debugger;

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
    let correctCheck = checkLetters(correct_letters_guessed, guess);

    let incorrectCheck = checkLetters(incorrect_letters_guessed, guess);

    if (correctCheck || incorrectCheck) {
      // if it's not in either, do the other checks

      console.log("no duplicate guess");
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
      await updateGame({
        variables: {
          game_username: username,
          current_word: current_word,
          correct_letters_guessed: correct_letters_guessed,
        },
      });
      if (todays_word === current_word) {
        // End the game - WIN!!
        // have a modal pop up?
        console.log("Winner!");
      }

      try {
        const { data } = await updateGame({
            variables: {
                game_username: username,
                current_word: current_word,
                correct_letters_guessed: correct_letters_guessed
            }
        });

        if (data) {
            console.log("data", data);
        }
    } catch (e) {
        console.error(e);
    }

    } else {
      // Push the letter into the incorrect_letters_guessed array
      incorrect_letters_guessed.push(guess);
      console.log(incorrect_letters_guessed);
      // Change the image
      imageIndex = imageIndex + 1;
      // update game call
      await updateGame({
        variables: {
          game_username: username,
          incorrect_letters_guessed: incorrect_letters_guessed,
        },
      });
      if (incorrect_letters_guessed.length === 7) {
        // End the game - LOSE
        // have a modal pop up?
        console.log("You lose!");
      }

      try {
        const { data } = await updateGame({
            variables: {
                game_username: username,
                incorrect_letters_guessed: incorrect_letters_guessed
            }
        });

        if (data) {
            console.log("data", data);
        }
    } catch (e) {
        console.error(e);
    }
    }
  };
  //src={require(`../assets/${imageArray[imageIndex]}`)}
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
