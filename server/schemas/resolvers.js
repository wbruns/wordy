const { AuthenticationError } = require("apollo-server-express");
const { User, Game, Stats } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in!");
    },
    game: async (parent, { _id }) => {
      return Game.findOne({ _id });
    },
    stats: async (parent, { _id }) => {
      return Stats.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect login credentials!");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect login credentials!");
      }

      const token = signToken(user);
      return { token, user };
    },
    updateGame: async (
      parent,
      {
        gameId,
        current_word,
        todays_word,
        incorrect_letters_guessed,
        correct_letters_guessed,
        game_date,
        current_date,
        game_finished,
      },
      context
    ) => {
      if (context.user) {
        const updatedGame = await Game.findOneAndUpdate(
          { _id: gameId },
          {
            $set: {
              current_word: current_word,
              todays_word: todays_word,
              incorrect_letters_guessed: incorrect_letters_guessed,
              correct_letters_guessed: correct_letters_guessed,
              game_date: game_date,
              current_date: current_date,
              game_finished: game_finished,
            },
          },
          { new: true }
        );
        return updatedGame;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateStats: async (
      parents,
      { statsId, games_played, games_won, current_streak },
      context
    ) => {
      if (context.user) {
        const updatedStats = await Stats.findOneAndUpdate(
          { _id: statsId },
          {
            $set: {
              games_played: games_played,
              games_won: games_won,
              current_streak: current_streak,
            },
          },
          { new: true }
        );
        return updatedStats;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteUser: async (parents, { username }, context) => {
      if (context.user) {
        const deletedUser = await User.findOneAndDelete(
          { username: username },
          { new: true }
        );
        return deletedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
