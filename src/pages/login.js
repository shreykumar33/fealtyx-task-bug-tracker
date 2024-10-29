// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Input, Button, Text } from '@chakra-ui/react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    //
    const validUser = {
      email: 't@user.com',
      password: '123',//even though i have hardcoded these credentials for the sake of an iterative model. User credentials should never be harcoded as it is a bad practice :)
    };

    
    if (email === validUser.email && password === validUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard'); //going back to dashboard
    } else {
      setError('Oops! Those credentials don’t look right.');
    }
  };

  return (
    <Box textAlign="center" marginTop="50px">
      <Heading as="h2" size="lg" mb={6}>Welcome to FealtyX Task/Bug tracker!</Heading> {/* Updated title */}
      <Input
        type="text"

        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={4}
      />
      <Input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={4}
      />
      {error && <Text color="red.500">{error}</Text>} {/* Display error message */}
      <Button colorScheme="teal" onClick={handleLogin}>Login</Button>
    </Box>
  );
}
