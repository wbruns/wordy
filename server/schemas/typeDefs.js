const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    current_game: Game
    game_stats: Stats
  }

  type Game {
    game_username: String
    current_word: [String]
    todays_word: [String]
    incorrect_letters_guessed: [String]
    correct_letters_guessed: [String]
    potential_words: [String]
    game_date: String
    current_date: String
    game_finished: Boolean
  }

  type Stats {
    stats_username: String
    games_played: Int
    games_won: Int
    current_streak: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    game(game_username: String!): Game
    stats(stats_username: String!): Stats
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createGame(game_username: String!): Game
    createStats(stats_username: String!): Stats
    updateGame(
      game_username: String!
      current_word: [String]
      todays_word: [String]
      incorrect_letters_guessed: [String]
      correct_letters_guessed: [String]
      game_date: String
      current_date: String
      game_finished: Boolean
    ): Game
    updateStats(
      stats_username: String!
      games_played: Int
      games_won: Int
      current_streak: Int
    ): Stats
    deleteUser(username: String!): User
    deleteGame(game_username: String!): Game
    deleteStats(stats_username: String!): Stats
  }
`;

module.exports = typeDefs;
