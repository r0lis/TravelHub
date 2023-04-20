import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';

import { verifyToken } from '@/server/verifyToken';

type Context = {
  user?: DecodedIdToken | undefined;
};

const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type User {
    id: Int
    nickname: String
    firstname: String
    surname: String
    avatarIcon: String
  }

  type Post {
    id: Int
    userId: Int
    date: String
    title: String
    text: String
    likes: Int
    img: String
    comments: [Comment!]!
    user: User!
  }

  type Comment {
    id: Int
    postId: Int
    userId: Int
    text: String
    date: String
  }

  type Mutation {
    createPost(
      userId: Int!
      date: String!
      title: String!
      text: String!
      likes: Int!
      img: String!
    ): Post
  }
`;
const posts = [];
const resolvers = {
  Mutation: {
    createPost: (
      _: any,
      {
        userId,
        date,
        title,
        text,
        likes,
        img,
      }: {
        userId: number;
        date: string;
        title: string;
        text: string;
        likes: number;
        img: string;
      },
    ): any => {
      // Create a new post and return it as a response to the mutation
      const newPost = {
        id: posts.length + 1,
        userId,
        date,
        title,
        text,
        likes,
        img,
        comments: [],
      };
      posts.push(newPost);
      return newPost;
    },
  },

  Query: {
    users: (content: Context) => {
      return [
        {
          id: 1,
          nickname: 'Jouda',
          firstname: 'Pepek',
          surname: 'Namornik',
          avatarIcon: 'P',
        },
        {
          id: 2,
          nickname: 'Jouda',
          firstname: 'Pepek',
          surname: 'Namornik',
          avatarIcon: 'P',
        },
        {
          id: 3,
          nickname: 'Pids',
          firstname: 'Paja',
          surname: 'Kalašnikov',
          avatarIcon: 'P',
        },
        {
          id: 4,
          nickname: 'Cavo',
          firstname: 'Gajo',
          surname: 'Dego',
          avatarIcon: 'C',
        },
      ];
    },
    posts: () => {
      return [
        {
          id: 1,
          userId: 1,
          date: '10.11.2015',
          text: 'popis',
          img: 'Zamek_pce_2.jpg',
          likes: 50,
          title: 'Zámek Pardubice',
          comments: [],
          user: {
            id: 1,
            nickname: 'Jouda',
            firstname: 'Pepek',
            surname: 'Namornik',
            avatarIcon: 'P',
          },
        },
        {
          id: 2,
          userId: 2,
          date: '12.12.2015',
          text: 'popis 2',
          img: 'hradokr.pdf',
          likes: 20,
          title: 'Hrad Okříšky',
          comments: [],
          user: {
            id: 2,
            nickname: 'Honza',
            firstname: 'Jan',
            surname: 'Novák',
            avatarIcon: 'N',
          },
        },
        {
          id: 3,
          userId: 3,
          date: '15.1.2016',
          text: 'popis 3',
          img: 'divadlo_bratrancu.jpg',
          likes: 35,
          title: 'Divadlo Bratříčkův, Plzeň',
          comments: [],
          user: {
            id: 3,
            nickname: 'Pids',
            firstname: 'Paja',
            surname: 'Kalašnikov',
            avatarIcon: 'P',
          },
        },
        {
          id: 4,
          userId: 4,
          date: '20.2.2016',
          text: 'popis 4',
          img: 'Radnice1.jpg',
          likes: 60,
          title: 'Radnice v Olomouci',
          comments: [],
          user: {
            id: 4,
            nickname: 'Cavo',
            firstname: 'Gajo',
            surname: 'Dego',
            avatarIcon: 'C',
          },
        },
      ];
    },
    comments: () => {
      return [
        {
          id: 1,
          postId: 1,
          userId: 1,
          text: 'To je zajímavý příspěvek',
          date: '20.11.2015',
        },
        {
          id: 2,
          postId: 2,
          userId: 1,
          text: 'Skvělý příspěvek!',
          date: '22.12.2015',
        },
        {
          id: 3,
          postId: 3,
          userId: 4,
          text: 'Velmi pěkné divadlo',
          date: '26.1.2016',
        },
        {
          id: 4,
          postId: 4,
          userId: 3,
          text: 'Moc se mi tam líbilo!',
          date: '25.2.2016',
        },
      ];
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});
export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};
export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  context: async (context) => {
    const auth = context.request.headers.get('authorization');
    console.log(auth);
    return {
      user: auth ? await verifyToken(auth) : undefined,
    } as Context;
  },
});
