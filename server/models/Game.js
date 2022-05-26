const { Schema } = require("mongoose");

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
  },
  current_date: {
    type: Date,
    default: Date.now,
  },
  game_finished: {
    type: Boolean,
    default: false,
  },
});

module.exports = gameSchema;
