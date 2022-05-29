import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
    }
  }
`;

export const QUERY_GAME = gql`
  query game($game_username: String!) {
    game(game_username: $game_username) {
      game_username
      current_word
      todays_word
      incorrect_letters_guessed
      correct_letters_guessed
      game_date
      game_finished
    }
  }
`;

export const QUERY_STATS = gql`
  query stats($stats_username: String!) {
    stats(stats_username: $stats_username) {
      games_won
      games_played
      stats_username
      current_streak
    }
  }
`;
