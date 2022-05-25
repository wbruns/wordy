const { Schema } = require("mongoose");

const statsSchema = new Schema({
  games_played: {
    type: Number,
  },
  games_won: {
    type: Number,
  },
  current_streak: {
    type: Number,
  },
});

module.exports = statsSchema;
