const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const DlpAPI = require('./datasource/dlp');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        dlpAPI: new DlpAPI()
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});