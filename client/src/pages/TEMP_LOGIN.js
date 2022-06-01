// const [updateGame] = useMutation(UPDATE_GAME);
// const [updateStats] = useMutation(UPDATE_STATS);
// const { data: userStats } = useQuery(QUERY_STATS, {
//   variables: { stats_username: username },
// });
// const { data: gameData } = useQuery(QUERY_GAME, {
//   variables: { game_username: username },
// });

// const handleChange = (event) => {
//   const { name, value } = event.target;

//   setFormState({
//     ...formState,
//     [name]: value,
//   });
// };

// const [login, { error }] = useMutation(LOGIN_USER);

// const handleFormSubmit = async (event) => {
//   event.preventDefault();

//   try {
//     const { data } = await login({
//       variables: { ...formState },
//     });

//     Auth.login(data.login.token);
//   } catch (e) {
//     console.error(e);
//   }

//   setFormState({
//     username: "",
//     password: "",
//   });

//   if (login) {
//     // Variables for Stats db calls
//     let games_played = userStats?.stats.games_played;
//     let games_won = userStats?.stats.games_won;

//     // Variables for Game db calls
//     const { todays_word, current_word } = getWord();
//     const game_date = gameData?.game.game_date;

//     console.log(todays_word, current_word);

//     const currentDate = new Date();
//     const formattedcurrentDate = `${
//       currentDate.getMonth() + 1
//     }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

//     if (formattedcurrentDate !== game_date) {
//       // Check if the user didn't finish the game from the last day they played
//       if (gameData?.game.game_finished === false) {
//         // Update the stats to reset the current_streak
//         updateStats({
//           variables: {
//             stats_username: username,
//             games_played: games_played,
//             games_won: games_won,
//             current_streak: 0,
//           },
//         });
//       }

//       // Update the game to reset, making it a new game
//       updateGame({
//         variables: {
//           game_username: username,
//           current_word: current_word,
//           correct_letters_guessed: [],
//           todays_word: todays_word,
//           incorrect_letters_guessed: [],
//           game_date: formattedcurrentDate,
//           game_finished: false,
//         },
//       });
//     }
//   }
// };

// return (
//   <div className="container">
//     <Link to="/signup">← Go to Signup</Link>

//     <h2>Login</h2>
//     <form onSubmit={handleFormSubmit}>
//       <div className="flex-row">
//         <label htmlFor="user">Username</label>
//         <input
//           placeholder="username"
//           name="username"
//           type="username"
//           id="user"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex-row">
//         <label htmlFor="pwd">Password:</label>
//         <input
//           placeholder="******"
//           name="password"
//           type="password"
//           id="pwd"
//           onChange={handleChange}
//         />
//       </div>
//       {error ? (
//         <div>
//           <p>The provided credentials are incorrect</p>
//         </div>
//       ) : null}
//       <div className="flex-row flex-end">
//         <button type="submit">Submit</button>
//       </div>
//     </form>
//   </div>
// );
// };

// export default Login;
