const todoTypeDefs = `
    scalar Date

    type Todo {
        id: ID!
        content: String!
        status: Boolean
        createdAt: String!
        updatedAt: String!
        userSub: String!
    }
    
    input CreateTodoInput {
        content: String!
        tdate: String!
    }

    input UpdateTodoInput {
        id: ID! 
        status: Boolean! 
        updatedAt: String!
    }
`
module.exports = todoTypeDefs