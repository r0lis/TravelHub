import { useQuery, gql } from "@apollo/client";

interface PostQueryData {
  post: {
    id: string;
    nickname: string;
    firstname: string;
    surname: string;
    avatarIcon: string;
    title: string;
    date: string;
    text: string;
    img: string;
    likes: number;
    comments: Comment[];
  };
}

interface Comment {
  id: string;
  userId: string;
  text: string;
  date: string;
}

interface PostProps {
  postId: string;
}

const POST_QUERY = gql`
  query PostQuery($postId: ID!) {
    post(id: $postId) {
      id
      nickname
      firstname
      surname
      avatarIcon
      title
      date
      text
      img
      likes
      comments {
        id
        userId
        text
        date
      }
    }
  }
`;

function Post(props: PostProps) {
  const { postId } = props;

  const { loading, error, data } = useQuery<PostQueryData>(POST_QUERY, {
    variables: {
      postId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  const { post } = data;

  return (
    <div>
      <h1>{post.title}</h1>
      {/* Render other post content here */}
    </div>
  );
}

export default Post;