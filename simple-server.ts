import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto"

const typeDefs = gql`
  type Query {
    hello: [String]!
    users: [User]!
  }

  type Mutation {
    createUser(name: String!): User!
  }

  type User {
    id: String!
    name: String!
  }
`

const users: { id: string; name: string  }[] = [];

const server = new ApolloServer({ 
  typeDefs,
  resolvers: {
    Query: {
      hello: () => 'Hello World!',
      users: () => users
    },

    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name
        }

        users.push(user)

        return user
      }
    }
  }
});

server.listen().then(({ url }) => {console.log(`HTTP server ready at ${url}`)})