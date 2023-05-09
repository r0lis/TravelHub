import { firestore } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';

import { verifyToken } from '@/server/verifyToken';

type Context = {
  user?: DecodedIdToken | undefined;
};

type DbUser = {
  date: Date;
  likes: number;
  title: string;
  userId: number;
};

const typeDefs = gql`
  type Query {
    
    posts: [Post!]!
    
  }

  type User {
    id: Int
    nickname: String
    firstname: String
    surname: String
    avatarIcon: String
  }

  type Post {
    nickname: String
    firstname: String
    surname: String
    avatarIcon: String
    id: Int
    userId: Int
    date: String
    title: String
    text: String
    likes: Int
    img: String
   
   
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
// eslint-disable-next-line no-use-before-define
const posts: Array<Post> = [];

interface User {
  id: number;
  nickname: string;
  firstname: string;
  surname: string;
  avatarIcon: string;
}

interface Post {
  id: number;
  userId: number;
  date: string;
  title: string;
  text: string;
  likes: number;
  img: string;
  // eslint-disable-next-line no-use-before-define
  
  user: User;
}



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const db = firestore();

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
    ): Post => {
      // Create a new post and return it as a response to the mutation
      const newPost = {
        id: posts.length + 1,
        userId,
        date,
        title,
        text,
        likes,
        img,
       
        user: {
          id: userId,
          nickname: 'Jouda',
          firstname: 'Pepek',
          surname: 'Namornik',
          avatarIcon: 'P',
        },
      };
      posts.push(newPost);
      return newPost;
    },
  },

  Query: {
    
    posts: async () => {
      const usersRef = db.collection(
        'Post',
      ) as FirebaseFirestore.CollectionReference<DbUser>;
      const docsRefs = await usersRef.listDocuments();
      const docsSnapshotPromises = docsRefs.map((doc) => doc.get());
      const docsSnapshots = await Promise.all(docsSnapshotPromises);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dbdocs = docsSnapshots.map((doc) => doc.data()!);
      console.log(dbdocs);

      return dbdocs;
      return [
        {
          id: 1,
          userId: 1,
          date: '10.11.2015',
          text: 'popis',
          img: 'Zamek_pce_2.jpg',
          likes: 50,
          title: 'Zámek Pardubice',
         
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
          img: 'hrad.jpg',
          likes: 20,
          title: 'Hrad Okříšky',
          
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
          img: 'hradjpg.jpg',
          likes: 35,
          title: 'Hrad Cigos',
          
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
          img: 'rozhledna-vrbice1.jpg',
          likes: 60,
          title: 'Rozhledna gajo',
          
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
