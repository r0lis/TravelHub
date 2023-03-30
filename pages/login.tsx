import { ThemeProvider } from '@emotion/react';
import { Container, createTheme } from '@mui/material';
import NextLink from 'next/link';
import { forwardRef } from 'react';

import LoginForm from '@/components/loginform';

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
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
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <LoginForm />
      </Container>
    </ThemeProvider>
  );
};
export default Login;
