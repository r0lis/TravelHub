// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import NextLink from 'next/link';
import { forwardRef } from 'react';

import Test from '@/components/test';

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

const Test2 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Test />
    </ThemeProvider>
  );
};
export default Test2;
