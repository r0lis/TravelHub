import { createYoga, createSchema } from 'graphql-yoga'
import { gql } from 'graphql-tag';
import axios from 'axios';
const typeDefs = gql`
  type Query {
    users: [User!]!
    githubUsers: [GithubUser!]!
  }
  type User {
    name: String
  }
  type GithubUser {
    id: ID!
    login: String!
    avatarUrl: String!
  }
`
const resolvers = {
  Query: {
    users: () => {
      return [{ name: 'Nextjs' }]
    },
    githubUsers: async () => {
        try {
          const users = await axios.get("https://api.github.com/users");
          return users.data.map(({ id, login, avatar_url: avatarUrl }) => ({
            id,
            login,
            avatarUrl
          }));
        } catch (error) {
          throw error;
        }
      },
  },
}
const schema = createSchema({
  typeDefs,
  resolvers,
})
export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}
export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})