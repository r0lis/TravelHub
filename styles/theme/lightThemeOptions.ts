import { ThemeOptions } from '@mui/material/styles';
import NextLink from 'next/link';
import { forwardRef } from 'react';



const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background:{
      paper:'#FFFFFF'
    }
   
    
  },
};

export default lightThemeOptions;