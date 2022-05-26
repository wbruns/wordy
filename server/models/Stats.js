const mongoose = require('mongoose');

const { Schema } = mongoose;

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

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;
