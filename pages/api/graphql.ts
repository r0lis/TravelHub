import { createYoga, createSchema } from 'graphql-yoga'
import { gql } from 'graphql-tag';
import axios from 'axios';
import { verifyToken } from '@/server/verifyToken';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

type Context = {
  user?: DecodedIdToken | undefined
}

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
      userId: Int!,
      date: String!,
      title: String!,
      text: String!,
      likes: Int!,
      img: String!
    ): Post
  }
`;
const posts = [
];
const resolvers = {
  Mutation: {
    createPost: (
      _: any,
      { userId, date, title, text, likes, img }: {
        userId: number,
        date: string,
        title: string,
        text: string,
        likes: number,
        img: string,
      }
    ): any => {
      // Vytvořit nový příspěvek a vrátit ho jako odpověď na mutaci
      const newPost = {
        id: posts.length + 1,
        userId,
        date,
        title,
        text,
        likes,
        img,
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
          nickname:"Jouda", 
          firstname:"Pepek", 
          surname:"Namornik", 
          avatarIcon:"P" 
        },
        { 
          id: 2,
          nickname:"Jouda", 
          firstname:"Pepek", 
          surname:"Namornik", 
          avatarIcon:"P" 
        },
        {
          id: 3, 
          nickname:"Pids", 
          firstname:"Paja", 
          surname:"Kalašnikov", 
          avatarIcon: "P", 
        },
        {
          id: 4, 
          nickname:"Cavo", 
          firstname:"Gajo", 
          surname:"Dego", 
          avatarIcon: "C",
        }
      
      ];
    },
    posts: () => {
      return [
        {
          idUser: 1, 
          date:"10.11.2015",
          text:"popis",
          img:"Zamek_pce_2.jpg",
          likes: 50,
          title:"Zámek Pardubice",
        },
        {
          idUser: 2, 
          title:"Hrad Zvíkov",
          date:"10.11.2015",
          text:"popis",
          img:"hrad.jpg",
          likes:120
        },
        {
          idUser: 3, 
          title:"Hrad Kost",
          date:"10.11.2015",
          text:"popis",
          img:"hrad.jpg",
          likes:20
        },
        {
          idUser: 4, 
          title:"Rozhledna Vrbice",
          date:"10.11.2015",
          text:"popis",
          img:"hrad.jpg",
          likes:202
        }
      ]
    },
    comments: () => {
      return[
      { 
        idPost: 1,
        userId: 1,
        text: "To je zajímavý příspěvek",
        date: "20.11.2015",
      },
      { 
        idPost: 2,
        userId: 1,
        text: "To je zajímavý příspěvek",
        date: "20.11.2015",
      },
      { 
        idPost: 3,
        userId: 4,
        text: "To je zajímavý příspěvek",
        date: "20.11.2015",
      },
      { 
        idPost: 4,
        userId: 3,
        text: "To je zajímavý příspěvek",
        date: "20.11.2015",
      },
    ]
    },
    
  },
};

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
  context: async (context) => {
    const auth = context.request.headers.get('authorization');
    console.log(auth);
    return {
      user : auth
        ? await verifyToken(auth)
        : undefined
    } as Context
  }
})