const NotesResolver = require('./notes');
const TodoResolver = require('./todo');
const MemoResolver = require('./memos');


const { GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
})

module.exports = {
  Mutation: {
    ...NotesResolver.Mutation,
    ...TodoResolver.Mutation,
    ...MemoResolver.Mutation
  },
  Query: {
    ...NotesResolver.Query,
    ...TodoResolver.Query,
    ...MemoResolver.Query
  },
  Date: dateScalar
};
