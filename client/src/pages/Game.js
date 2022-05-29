import React from 'react';


const Game = () => {
    const word_bank = [
        "family",
        "offense",
        "sugar",
        "mouth",
        "addition",
        "escape",
        "patience",
        "reach",
        "movie",
        "admire"];

    const todays_word = word_bank[Math.floor(Math.random() * word_bank.length)];
    console.log(todays_word);

    return (
        <main>
            <div>
                GAME TIME
            </div>
        <div>

        </div>
            <img src={require("../assets/Image_1.jpg")} alt={"Carlie Anglemire"}/>
        </main>
        
    );
};

export default Game;