const todoTypeDefs = `
    type Todo {
        id: ID!
        content: String!
        status: Boolean
        createdAt: String!
        updatedAt: String!
        userSub: String!
    }
`
module.exports = todoTypeDefs