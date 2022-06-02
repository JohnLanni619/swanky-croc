const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const videogameApi = require('./graphql/datasources/videogameApi');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            videogameApi: new videogameApi(),
        };
    },
    context: () => {
        return {
            // Set this as a variable in .env file
            token: 'bf24f5c0887a49a4ad0df2bd7dfc4bef'
        };
    },
    playground: {
        endpoint: "/graphql"
    }
});

server.listen(3500).then( ({url}) => {
    console.log(`server running at ${url}`)
})