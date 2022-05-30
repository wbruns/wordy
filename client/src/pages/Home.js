import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = () => {
    return (
        <main>
            <h2>About</h2> 
            <p>
                Welcome to Wordy!  This is a daily hangman style game where you try to guess the correct word of the day.  
                After creating an account or logging in, you can play the game.  If you're new, head over to our Signup page to get started!
            </p>
            <h3>Instructions</h3>
            <p>
                In each game you have to guess the correct letters for today's word while avoiding the dreaded noose.
                Your guesses are updated in realtime, correct letters will fill in the blanks and incorrect guesses will add a body part to the gallows. Oh no! <br/>
                Guess wrong 6 times and the hangman will get ya! <br/><br/>

                You can head over to your profile page to check out your stats. <br/><br/>

                Good luck playing!
            </p>
            {
                Auth.loggedIn() ? (
                    <button className="game-button">
                        <Link to="/game">Play Now!</Link>
                    </button>
                ) : (
                    <p>Login to play!</p>
                )
            }
        </main>
    );
};

export default Home;