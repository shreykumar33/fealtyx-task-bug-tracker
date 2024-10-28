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
    // Simulated user credentials
    const validUser = {
      email: 't@user.com',
      password: '123',
    };

    
    if (email === validUser.email && password === validUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard'); // Redirect to the dashboard
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
