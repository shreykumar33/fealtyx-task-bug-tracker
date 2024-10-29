// src/pages/tasks.js
import { useState, useEffect } from 'react';
import { Box, VStack, Heading, Text, SimpleGrid, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Navigate back to the dashboard
  const navigateToDashboard = () => router.push('/dashboard');

  return (
    <Box p={8} bg="gray.100" minH="100vh">
      <Heading fontSize="2xl" mb={6} textAlign="center">All Tasks</Heading>
      
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Box key={index} p={4} bg="white" borderRadius="md" boxShadow="md">
              <Heading fontSize="xl" mb={2}>{task.title}</Heading>
              
              <Text><strong>Priority:</strong> {task.priority}</Text>
              <Text><strong>Status:</strong> {task.status}</Text>
              <Text><strong>Time Spent:</strong> {task.timeSpent} hours</Text>
              <Text><strong>Details:</strong> {task.details}</Text>
            </Box>
          ))
        ) : (
          <Text textAlign="center">No tasks available.</Text>
        )}
      </SimpleGrid>

      <Button mt={6} colorScheme="teal" onClick={navigateToDashboard}>Back to Dashboard</Button>
    </Box>
  );
}
