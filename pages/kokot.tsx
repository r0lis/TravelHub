
import { ThemeProvider } from '@emotion/react';
import { Container, createTheme } from '@mui/material';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import Pokus from '@/components/pokus';
import LoginForm from '@/components/loginform';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apolloClient';
import { PostQueryData, POST_QUERY } from '@/queries/demo.graphql';

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  // @ts-ignore
  return <NextLink ref={ref} {...props} />;
});

const theme = createTheme({
  palette: {
    background: {
      paper: '#fafafa',
    },
    primary: { main: '#6200EE' },
    secondary: { main: '#7e57c2' },
  },
  components: {
    MuiLink: {
      defaultProps: {
        // @ts-ignore
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'rgba(234, 128, 252, 0.8)',
        },
      },
    },
  },
});

const Login = () => {
  const postId = 1;
  const { loading, error, data } = useQuery<PostQueryData>(POST_QUERY, {
    variables: {
      postId,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  const post = data?.post;

  return (
    <ApolloProvider client={client}>
      <Pokus postId={postId} />
    </ApolloProvider>
  );
};

export default Login;