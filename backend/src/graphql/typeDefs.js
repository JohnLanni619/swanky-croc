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
    website: String
    metacritic: Int
    description: String
    platforms: [Platform]
  }

  type Platform {
    platform_id: ID
    platform_name: String
  }

  type Query {
    gamesList(page: Int, page_size: Int): GameList
    game(id: ID!): Game!
  }
`;
