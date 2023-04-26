import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/system';
import Post from 'components/Post2';
import * as React from 'react';

import { UserPosts } from '../types';

const posts: Array<UserPosts> = [
  {
    id: 1,
    nickname: 'Jouda',
    firstname: 'Pepek',
    surname: 'Namornik',
    avatarIcon: 'J',
    title: 'Zámek Pardubice',
    // eslint-disable-next-line sonarjs/no-duplicate-string
    date: '10.11.2015',
    text: 'popis',
    img: 'Zamek_pce_2.jpg',
    likes: 50,
    comments: [
      {
        id: 1,
        userId: 2,
        text: 'To je zajímavý příspěvek',
        // eslint-disable-next-line sonarjs/no-duplicate-string
        date: '20.11.2015',
      },
      {
        id: 2,
        userId: 3,
        text: 'Souhlasím',
        // eslint-disable-next-line sonarjs/no-duplicate-string
        date: '11.01.2015',
      },
    ],
  },
  {
    id: 2,
    nickname: 'Frank',
    firstname: 'Frankota',
    surname: 'Pakosta',
    avatarIcon: 'F',
    title: 'Hrad Zvíkov',
    date: '10.11.2015',
    text: 'popis',
    img: 'hrad.jpg',
    likes: 120,
    comments: [
      {
        id: 1,
        userId: 2,
        text: 'Tojs',
        date: '20.11.2015',
      },
      {
        id: 2,
        userId: 3,
        text: 'nevim',
        date: '11.01.2015',
      },
    ],
  },
  {
    id: 3,
    nickname: 'Pids',
    firstname: 'Paja',
    surname: 'Kalašnikov',
    avatarIcon: 'P',
    title: 'Hrad Kost',
    date: '10.11.2015',
    text: 'popis',
    img: 'hradjpg.jpg',
    likes: 101,
    comments: [
      {
        id: 1,
        userId: 2,
        text: 'supr příspěvek',
        date: '20.11.2015',
      },
      {
        id: 2,
        userId: 3,
        text: 'nSouhlasím',
        date: '11.01.2015',
      },
    ],
  },
  {
    id: 4,
    nickname: 'Cavo',
    firstname: 'Gajo',
    surname: 'Dego',
    avatarIcon: 'C',
    title: 'Rozhledna Vrbice',
    date: '10.11.2015',
    text: 'popis',
    img: 'rozhledna-vrbice1.jpg',
    likes: 404,
    comments: [
      {
        id: 1,
        userId: 2,
        text: 'Dobry',
        date: '20.11.2015',
      },
      {
        id: 2,
        userId: 3,
        text: 'Sobota',
        date: '11.01.2015',
      },
    ],
  },
];

const RowAndColumnSpacing: React.FC = () => {
  return (
    <Container sx={{ paddingTop: '20px', paddingBottom: '100px' }}>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={15} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
          {posts.map((post) => (
            <Grid xs={6} key={post.id}>
              <Post {...post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default RowAndColumnSpacing;
