require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const  typeDefs  = require('./schema/typeDefs');
const  resolvers  = require('./schema/resolvers');
const mongoose = require('mongoose');
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({req}),
});

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    server.applyMiddleware({ app, path: '/graphql', playgroundPath: '/graphql-playground' });
    app.listen({ port: process.env.PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    )
  })