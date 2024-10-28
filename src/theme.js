// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50', // Change the background color
        color: 'gray.800', // Change the text color
      },
    },
  },
  colors: {
    primary: {
      500: '#3182ce', // Customize primary color
    },
  },
});

export default theme;
