import { createTheme, ThemeProvider } from '@mui/material';
import BotNav from 'components/BotNav';
import NextLink from 'next/link';
import * as React from 'react';
import { forwardRef } from 'react';

import NavBar from '@/components/Nav';
import Posts from '@/components/Posts';

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    background: {
      paper: '#eeeeee',
      default: '#7c4dff',
    },

    MuiLink: {
      defaultProps: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        root: {},
      },
    },
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <NavBar />
        <Posts />
        <BotNav />
      </>
    </ThemeProvider>
  );
};
export default Home;
