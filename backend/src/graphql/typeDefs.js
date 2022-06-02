const { gql } = require("apollo-server");

module.exports = gql`
  type GameList {
    count: Int
    next_page: String
    previous_page: String
    results: [Game]!
  }

  type Game {
    id: ID!
    title: String!
    released: String!
    background_image: String!
  }

  type Query {
    gamesList(page: Int): GameList
    game(id: ID!): Game!
  }
`;
