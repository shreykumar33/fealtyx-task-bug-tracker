// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50', 
        color: 'gray.800', 
      },
    },
  },
  colors: {
    primary: {
      500: '#3182ce', 
    },
  },
});

export default theme;
