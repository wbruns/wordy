const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormatter");

const gameSchema = new Schema(
  {
    game_username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    current_word: {
      type: Array,
    },
    todays_word: {
      type: Array,
    },
    incorrect_letters_guessed: {
      type: Array,
      default: []
    },
    correct_letters_guessed: {
      type: Array,
      default: []
    },
    game_date: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    game_finished: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;
