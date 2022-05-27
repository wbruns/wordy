const { Schema, model } = require("mongoose");

const statsSchema = new Schema({
  stats_username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  games_played: {
    type: Number,
    default: 0,
  },
  games_won: {
    type: Number,
    default: 0,
  },
  current_streak: {
    type: Number,
    default: 0,
  },
});

const Stats = model("Stats", statsSchema);

module.exports = Stats;
