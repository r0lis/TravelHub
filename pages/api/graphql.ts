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

  input PostInput {
    userId: Int!
    date: String!
    title: String!
    text: String!
    likes: Int!
    img: String!
  }

  type Mutation {
    createPost(input: PostInput!): Post
    deletePost(id: Int!): Boolean
  }
`;

const posts: Array<Post> = [];

interface Post {
  id: number;
  userId: number;
  date: string;
  title: string;
  text: string;
  likes: number;
  img: string;
  nickname: string;
  firstname: string;
  surname: string;
  avatarIcon: string;
}

const db = firestore();

const resolvers = {
  Mutation: {
    createPost: async (_: any, { input }: { input: PostInput }): Promise<Post> => {
      const newPost = {
        id: Math.floor(Math.random() * 100000),
        userId: input.userId,
        date: input.date,
        title: input.title,
        text: input.text,
        likes: input.likes,
        img: input.img,
        nickname: 'Jouda',
        firstname: 'Pepek',
        surname: 'Namornik',
        avatarIcon: 'P',
      };
      const newPostRef = await db.collection('Post').add(newPost);
      const newPostId = newPostRef.id;
      return { ...newPost, id: newPostId };
    },
    deletePost: async (_: any, { id }: { id: number }): Promise<boolean> => {
      const postsRef = db.collection('Post');
      const querySnapshot = await postsRef.where('id', '==', id).get();
    
      const deletePromises = querySnapshot.docs.map((doc) => doc.ref.delete());
      await Promise.all(deletePromises);
    
      console.log(`Deleted ${querySnapshot.size} documents with ID ${id}`);
      return true;
    },
    
  },

  Query: {
    posts: async () => {
      const postsRef = db.collection('Post') as FirebaseFirestore.CollectionReference<DbUser>;
      const docsRefs = await postsRef.listDocuments();
      const docsSnapshotPromises = docsRefs.map((doc) => doc.get());
      const docsSnapshots = await Promise.all(docsSnapshotPromises);
      const dbdocs = docsSnapshots.map((doc) => doc.data()!);
      console.log(dbdocs);
      return dbdocs;
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
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
