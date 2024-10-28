// src/pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme'; // Make sure this path is correct

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
