const NotesResolver = require('./notes');
const TodoResolver = require('./todo');
const MemoResolver = require('./memos');

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
  }
};
