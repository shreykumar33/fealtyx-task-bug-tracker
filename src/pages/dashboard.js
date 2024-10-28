import { useState } from 'react';
import { Box, Heading, VStack, Text, Flex, HStack, Select, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';
import TaskTrendChart from '../components/TaskTrendChart';

export default function Dashboard() {
  const router = useRouter(); // Hook for programmatic navigation
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTimeSpent, setFilterTimeSpent] = useState('');
  const [showTrends, setShowTrends] = useState(false);

  // Function to add or update tasks
  const addTask = (task) => {
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  // Function to set a task for editing
  const editTask = (index) => {
    setEditingIndex(index);
  };

  // Function to delete a task
  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  // Color change for the dashboard slab while editing
  const dashboardSlabColor = editingIndex !== null ? "orange.300" : "yellow.300";

  // Filter tasks based on criteria
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    const matchesTimeSpent = filterTimeSpent ? task.timeSpent >= filterTimeSpent : true;

    return matchesPriority && matchesStatus && matchesTimeSpent;
  });

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    router.push('/login'); // Redirect to the login page
  };

  return (
    <Box p={8} bg="white" minH="100vh">
      <Flex direction="column" align="center" mb={8}>
        <Heading mb={2} fontSize="3xl" fontWeight="bold">FealtyX Task/Bug Tracker</Heading>
        <Text fontSize="lg" textAlign="center" mb={6}>
          Managing your tasks and tracking your time effectively!
        </Text>
        {/* Logout Button */}
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
      
      {/* Filter Selection */}
      <HStack spacing={4} mb={6}>
        <Select placeholder="Filter by Priority" onChange={(e) => setFilterPriority(e.target.value)} width="200px">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
        <Select placeholder="Filter by Status" onChange={(e) => setFilterStatus(e.target.value)} width="200px">
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </Select>
        <Select placeholder="Minimum Time Spent (hours)" onChange={(e) => setFilterTimeSpent(e.target.value)} width="200px">
          <option value="0">0 hours</option>
          <option value="1">1 hour</option>
          <option value="2">2 hours</option>
        </Select>
      </HStack>

      <Box p={6} bg={dashboardSlabColor} borderRadius="md" boxShadow="lg">
        <VStack spacing={6} align="stretch">
          <CreateTaskForm onAddTask={addTask} taskToEdit={tasks[editingIndex]} />
          <TaskList tasks={filteredTasks} onEditTask={editTask} onDeleteTask={deleteTask} />
          
          {/* Button for toggling task trends */}
          {tasks.length > 0 && (
            <Button 
              colorScheme="teal"
              onClick={() => setShowTrends(!showTrends)}
            >
              {showTrends ? 'Hide Task Trends' : 'Show Task Trends'}
            </Button>
          )}
          
          {/* Conditionally render TaskTrendChart */}
          {showTrends && <TaskTrendChart tasks={tasks} />}
        </VStack>
      </Box>
    </Box>
  );
}
