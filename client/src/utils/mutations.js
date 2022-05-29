import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_GAME = gql`
  mutation createGame($game_username: String!) {
    createGame(game_username: $game_username) {
      game_username
      current_word
      todays_word
      incorrect_letters_guessed
      correct_letters_guessed
      game_date
      current_date
      game_finished
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation updateGame(
    $game_username: String!,
    $current_word: [String],
    $todays_word: [String],
    $incorrect_letters_guessed: [String],
    $correct_letters_guessed: [String],
    $game_date: String,
    $current_date: String,
    $game_finished: Boolean
  ) {
    updateGame(
      game_username: $game_username,
      current_word: $current_word,
      todays_word: $todays_word,
      incorrect_letters_guessed: $incorrect_letters_guessed,
      correct_letters_guessed: $correct_letters_guessed,
      game_date: $game_date,
      current_date: $current_date,
      game_finished: $game_finished
    ) {
      game_username
      current_word
      todays_word
      incorrect_letters_guessed
      correct_letters_guessed
      game_date
      current_date
      game_finished
    }
  }
`;

export const CREATE_STATS = gql`
  mutation createStats($stats_username: String!) {
    createStats(stats_username: $stats_username) {
      games_won
      games_played
      stats_username
      current_streak
    }
  }
`;

export const UPDATE_STATS = gql`
  mutation updateStats(
    $stats_username: String!,
    $games_played: Int,
    $games_won: Int,
    $current_streak: Int
  ) {
    updateStats(
      stats_username: $stats_username,
      games_played: $games_played,
      games_won: $games_won,
      current_streak: $current_streak
    ) {
      stats_username
      games_played
      games_won
      current_streak
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($username: String!) {
    deleteUser(username: $username) {
      username
    }
  }
`;

export const DELETE_GAME = gql`
  mutation deleteGame($game_username: String!) {
    deleteGame(game_username: $game_username) {
      game_username
    }
  }
`;

export const DELETE_STATS = gql`
  mutation deleteStats($stats_username: String!) {
    deleteStats(stats_username: $stats_username) {
      stats_username
    }
  }
`;
