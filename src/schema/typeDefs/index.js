
const noteTypeDefs = require("./note")
const memoTypeDefs = require("./memo")
const todoTypeDefs = require("./todo")

const typeDefa = `
    type Mutation {
        createNote(addNote: AddNote): Note!
        reformNote(updateNote: UpdateNote): Note!
        deleteNote(id: ID!): String!
        archieveNote(id: ID! status: Boolean!): Note!

        createTodo(content: String! tdate: String!): Todo!
        updateTodo(id: ID! status: Boolean! updatedAt: String!): Todo!

        
        createMemo(addMemo: AddMemo): Memo!
        removeMemo(id: ID!): String!
    }
    type Query {
        fetchNotes(archieved: Boolean!): [Note]
        fetchNote(id: ID!): Note!
        fetchTodo: [Todo]
        fetchMemo(fdate: String!tdate: String!): [Memo]
    }
`

module.exports = [typeDefa, noteTypeDefs, memoTypeDefs, todoTypeDefs]