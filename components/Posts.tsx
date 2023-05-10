import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/system';
import Post from 'components/Post';
import * as React from 'react';
import { gql, useQuery } from '@apollo/client';

import { UserPosts } from '../types';

const GET_POSTS_QUERY = gql`
  query {
    posts {
      date
      id
      img
      likes
      text
      title
      userId
     
        avatarIcon
        firstname
        id
        nickname
        surname
        
      
    }
  }
`;

const RowAndColumnSpacing: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error } = useQuery(GET_POSTS_QUERY);
    const {data} = useQuery(GET_POSTS_QUERY);
  return (
    <Container sx={{ paddingTop: '20px', paddingBottom: '100px' }}>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={15} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
          {data?.posts.map((post: any) => (
            <Grid xs={6} key={post.id}>
              
              <Post {...post}  />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default RowAndColumnSpacing;
