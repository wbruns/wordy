const mongoose = require("mongoose");

const { Schema } = mongoose;

const gameSchema = new Schema({
  current_word: {
    type: Array,
  },
  todays_word: {
    type: Array,
  },
  incorrect_letters_guessed: {
    type: Array,
  },
  correct_letters_guessed: {
    type: Array,
  },
  potential_words: {
    type: Array,
  },
  game_date: {
    type: Date,
    default: Date.now
  },
  current_date: {
    type: Date
  },
  game_finished: {
    type: Boolean,
    default: false,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
