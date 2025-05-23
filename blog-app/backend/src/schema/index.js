const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    imagePath: String
    createdAt: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!, author: String!, imagePath: String, createdAt: String): Post!
    deletePost(id: ID!): Boolean!
  }
`;

module.exports = typeDefs; 