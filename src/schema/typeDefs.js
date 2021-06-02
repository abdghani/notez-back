const { gql } = require('apollo-server');


module.exports = gql`
    type Note {
        id: ID!
        title: String!
        content: String!
        archieved: Boolean
        createdAt: String!
        userSub: String!
        has_header: Boolean
        header_image: String!
        header_content: String!
        tags: [String!]
    }
    type Todo {
        id: ID!
        content: String!
        status: Boolean
        createdAt: String!
        updatedAt: String!
        userSub: String!
    }
    type Memo {
        id: ID!
        content: String!
        tags: [String!]!
        createdAt: String!
        updatedAt: String!
    }
    input AddMemo {
        mdate: String!
        content: String!
        tags: [String!]
    }
    input AddNote {
        title: String!
        content: String!
        has_header: Boolean
        header_image: String!
        header_content: String!
        tags: [String!]
    }
    input UpdateNote {
        id: ID!
        title: String!
        content: String!
        has_header: Boolean
        header_image: String!
        header_content: String!
        tags: [String!]
    }
    type Mutation {
        createNote(addNote: AddNote): Note!
        reformNote(updateNote: UpdateNote): Note!
        deleteNote(id: ID!): String!
        archieveNote(
            id: ID!
            status: Boolean!
            ): Note!
        createTodo(
            content: String!
            tdate: String!
        ): Todo!
        updateTodo(
            id: ID!
            status: Boolean!
            updatedAt: String!
        ): Todo!
        createMemo(addMemo: AddMemo): Memo!
        removeMemo(id: ID!): String!
    }
    type Query {
        fetchNotes(archieved: Boolean!): [Note]
        fetchNote(id: ID!): Note!
        fetchTodo: [Todo]
        fetchMemo(
            fdate: String!
            tdate: String!
        ): [Memo]
    }
`