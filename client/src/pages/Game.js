import React, { useState } from "react";
import Auth from "../utils/auth";

// const { loading, data } = useQuery(QUERY_GAME, {
//     variables: { game_username: username }
// });

const Game = () => {
  const [formState, setFormState] = useState({ guess: "" });

  const username = Auth.getProfile().data.username;
  console.log(username);

  const imageArray = [
    "../assets/Image_1.jpg",
    "../assets/Image_2.jpg",
    "../assets/Image_3.jpg",
    "../assets/Image_4.jpg",
    "../assets/Image_5.jpg",
    "../assets/Image_6.jpg",
    "../assets/Image_7.jpg",
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

    formState.guess = formState.guess.toUpperCase();

    console.log(formState.guess);
  };

  return (
    <main>
      <div>GAME TIME</div>
      <div>
        <img
          id="hangman"
          src={require(imageArray[imageIndex])}
          alt={"Carlie Anglemire"}
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
