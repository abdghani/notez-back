const memoTypeDefs = `
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
`
module.exports = memoTypeDefs