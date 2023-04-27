import { gql, useQuery } from '@apollo/client';

const GET_POSTS_QUERY = gql`
  query {
    posts {
      id
      userId
      date
      title
      text
      likes
      img
      comments {
        id
        postId
        userId
        text
        date
      }
      user {
        id
        nickname
        firstname
        surname
        avatarIcon
      }
    }
  }
`;

function PostsList() {
    const { data } = useQuery(GET_POSTS_QUERY);
  
    return (
      <div>
        {data?.posts.map((post: any) => (
          <div key={post.user.id}>
            <h2>{post.comments.text}</h2>
          </div>
        ))}
      </div>
    );
  
}
export default PostsList;