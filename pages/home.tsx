import * as React from "react";
import { Container, createTheme, ThemeProvider, Typography } from "@mui/material";
import Posts from "@/components/Posts";
import NavBar from "components/Nav"
import BotNav from "components/BotNav"
import NextLink from "next/link";
import { forwardRef } from "react";
import { usePeopleQuery } from "@/generated/graphql";

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  //@ts-ignore
  return <NextLink ref={ref} {...props} />;
});


const theme = createTheme({
  palette: {
    background: {
      paper: '#fafafa',
    },
    primary: { main: '#6200EE' },
    secondary: { main: '#7e57c2' }
  },
  components: {
    background: {
      paper: '#eeeeee',
      default: '#7c4dff',
    },

    MuiLink: {
      defaultProps: {
        //@ts-ignore
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

        }
      }
    }
  }
},

);

const Home = () => {

  const {data,loading,error} =usePeopleQuery();
  return (
    <ThemeProvider theme={theme}>
      <><NavBar /><Posts /><BotNav /></>


    </ThemeProvider>


  );
};
export default Home;
