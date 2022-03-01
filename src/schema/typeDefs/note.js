const noteTypeDefs = `
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
`
module.exports = noteTypeDefs