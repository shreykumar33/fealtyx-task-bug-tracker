import { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text, Flex, HStack, Select, Button, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';
import TaskTrendChart from '../components/TaskTrendChart';
import Sidebar from '../components/Sidebar'; 

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTimeSpent, setFilterTimeSpent] = useState('');
  const [showTrends, setShowTrends] = useState(false);
  const [displayName, setDisplayName] = useState('');

  // Retrieve and format user email from local storage
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setDisplayName(storedEmail); // Store the full email for display
    }

    // Load tasks from local storage on mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Add or update tasks and save to local storage
  const addTask = (task) => {
    let updatedTasks;
    if (editingIndex !== null) {
      updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task; // Update existing task
      setEditingIndex(null);
    } else {
      updatedTasks = [...tasks, task]; // Add new task
    }
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage
  };

  // Set a task for editing
  const editTask = (index) => setEditingIndex(index);

  // Delete a task and update local storage
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update local storage
  };

  // Dashboard slab color based on edit mode
  const dashboardSlabColor = editingIndex !== null ? "orange.300" : "yellow.300";

  // Filter tasks based on criteria
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    const matchesTimeSpent = filterTimeSpent ? task.timeSpent >= parseInt(filterTimeSpent, 10) : true;
    return matchesPriority && matchesStatus && matchesTimeSpent;
  });

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <Flex>
      {/* Sidebar Component */}
      <Sidebar displayName={displayName} onLogout={handleLogout} />

      {/* Main Content Area */}
      <Box flex="1" p={8} bg="white" minH="100vh">
        <Flex direction="column" align="center" mb={8}>
          <Heading mb={2} fontSize="3xl" fontWeight="bold">FealtyX Task/Bug Tracker</Heading>
          <Text fontSize="lg" textAlign="center" mb={6}>
            Managing your tasks and tracking your time effectively!
          </Text>
          <Flex w="full" align="center">
            <Text fontSize="lg" fontWeight="medium">
              Welcome, {displayName}
            </Text>
            <Spacer />
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
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

            {/* Toggle task trends */}
            {tasks.length > 0 && (
              <Button 
                colorScheme="teal"
                onClick={() => setShowTrends(!showTrends)}
              >
                {showTrends ? 'Hide Task Trends' : 'Show Task Trends'}
              </Button>
            )}

            {/* Render TaskTrendChart if trends are toggled on */}
            {showTrends && <TaskTrendChart tasks={tasks} />}
          </VStack>

        </Box>
      </Box>
    </Flex>
  );
}
