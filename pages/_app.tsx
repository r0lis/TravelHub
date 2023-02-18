import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { AppBar, Box, Button, IconButton, TextField, Toolbar } from '@mui/material'
import Posts from "components/Posts"
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getApolloClient } from '@/utility/apollo-client'
import { ApolloProvider } from '@apollo/client'

const client = getApolloClient({ forceNew: false });


export default function App({ Component, pageProps }: AppProps) {
  return (

    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>




  )
}