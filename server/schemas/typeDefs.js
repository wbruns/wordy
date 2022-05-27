const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        current_game: [Game]
        game_stats: [Stats]
    }

    type Game {
        _id: ID
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
        game(_id: ID!): Game
        stats(_id: ID!): Stats
    }

    type Mutation {
        addUser(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        updateGame(_id: ID!): Game
        updateStats(_id: ID!): Stats
        deleteUser(username: String!): User
    }
`;

module.exports = typeDefs;