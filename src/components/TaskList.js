import { Box, Heading, Text, HStack, Button, VStack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'; 
import Timer from './Timer'; 

const MotionBox = motion(Box);

const formatTimeSpent = (time) => {const hours = Math.floor(time / 3600);const minutes = Math.floor((time % 3600) / 60);const seconds = Math.floor(time % 60);return `${hours}h ${minutes}m ${seconds}s`;
};



const getStatusColor = (status) => {
  switch (status) {
    case 'Done':
      return 'green.300';
    case 'In Progress':
      return 'yellow.300';
    case 'To Do':
      return 'red.300';
    default:
      return 'gray.300';
  }
};


const TaskList = ({ tasks, onEditTask, onDeleteTask }) => (
  <VStack spacing={4} align="stretch">
    {tasks.map((task, index) => (
      <MotionBox
        key={index}
        p={5}
        bg="white"
        borderRadius="md"
        
        boxShadow="lg" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        _hover={{ boxShadow: 'xl', transform: 'scale(1.02)' }}
      >


        <HStack>
          <Heading size="md" color="teal.500">{index + 1}.</Heading> {/* Numbering starts from 1 */}
          <Heading size="md">{task.title || 'Untitled Task'}</Heading>
        </HStack>
        <Text>Description: {task.description || 'N/A'}</Text>
        <Text>Assignee: {task.assignee || 'N/A'}</Text>
        <Text>Priority: {task.priority || 'N/A'}</Text>
        <Text>Status: <Text as="span" color={getStatusColor(task.status)}>{task.status || 'N/A'}</Text></Text> {/* Color-coded status */}
        <Text>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</Text> {/* Format date */}
        
        {/*showing the timer if the task is being tracked */}
        {task.isTracking && task.startTime && (
          <Text>
            Timer: <Timer startTime={task.startTime} /> {/*displaying the timer */}
          </Text>
        )}

        <Text>Total Time Spent: {formatTimeSpent(task.timeSpent || 0)} </Text> {/*displaying formatted time spent */}
        
        <HStack mt={4}>
          <Button size="sm" colorScheme="yellow" onClick={() => onEditTask(index)} aria-label={`Edit task ${task.title}`}>
            <Icon as={EditIcon} mr={1} /> Edit

          </Button>
          <Button size="sm" colorScheme="red" onClick={() => onDeleteTask(index)} aria-label={`Delete task ${task.title}`}>
            <Icon as={DeleteIcon} mr={1} /> Delete
          </Button>

        </HStack>
      </MotionBox>
    ))}
  </VStack>
);

export default TaskList;
