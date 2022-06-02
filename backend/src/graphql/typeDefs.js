const { gql } = require('apollo-server')

module.exports = gql`
    type Game {
        id: ID!
        title: String!
        released: String!
        background_image: String!
    }

    type Query {
        games: [Game]!
        game(id: ID!): Game!
    }
`