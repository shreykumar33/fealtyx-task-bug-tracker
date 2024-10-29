import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
  Text,

} from '@chakra-ui/react';
import Timer from './Timer'; 

const CreateTaskForm = ({ onAddTask, taskToEdit }) => {const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ''
  );
  const [priority, setPriority] = useState(
    taskToEdit ? taskToEdit.priority : ''
  );
  const [status, setStatus] = useState(taskToEdit ? taskToEdit.status : '');
  const [assignee, setAssignee] = useState(taskToEdit ? taskToEdit.assignee : '');
  const [dueDate, setDueDate] = useState(
    taskToEdit ? taskToEdit.dueDate : ''
  );
  const [timeSpent, setTimeSpent] = useState(taskToEdit ? taskToEdit.timeSpent : 0);
  const [isTracking, setIsTracking] = useState(false);
  const [intervalId, setIntervalId] = useState(null); 
  const [startTime, setStartTime] = useState(null); //setting timer

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setAssignee(taskToEdit.assignee);
      setDueDate(taskToEdit.dueDate);
      setTimeSpent(taskToEdit.timeSpent || 0);
      setIsTracking(taskToEdit.isTracking || false);
      setStartTime(taskToEdit.startTime || null);
    } else {
      resetForm();
    }
  }, [taskToEdit]);

  //clearing the interval
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('');
    setStatus('');
    setAssignee('');
    setDueDate('');
    setTimeSpent(0);
    setIsTracking(false);
    setStartTime(null);
    clearInterval(intervalId); 
    setIntervalId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      priority,
      status,
      assignee,
      dueDate,
      timeSpent,
      isTracking, 
      startTime: isTracking ? Date.now() : null, 
    };
    onAddTask(task);
    resetForm();
  };

  const handleToggleTracking = () => {
    if (isTracking) {
      //stop tracking
      setIsTracking(false);
      clearInterval(intervalId); 

      setIntervalId(null); 
    } else {
      
      setIsTracking(true);
      setStartTime(Date.now());
      const id = setInterval(() => {
        setTimeSpent((prev) => prev + 1 / 3600); //incrementing time spent every second for simulating an actual timer
      }, 1000);
      setIntervalId(id); 

    }
  };

  const handleClearTimeSpent = () => {setTimeSpent(0); };

  //formatting time spent properlu
  const formatTimeSpent = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    const seconds = Math.round(((time % 1) * 60) % 1 * 60); 
    return `${hours}h ${minutes}m ${seconds}s`; 
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input

            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Priority</FormLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>

            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>

            
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Status</FormLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Assignee</FormLabel>
          <Input
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Total Time Spent</FormLabel>
          <Text>{formatTimeSpent(timeSpent)}</Text>
          <Text>Elapsed Time: {isTracking && <Timer startTime={startTime} />}</Text> {/* Display live timer if tracking */}
          <Button
            onClick={handleToggleTracking}
            colorScheme={isTracking ? "red" : "green"}
          >
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Button>
          <Button
            onClick={handleClearTimeSpent}
            colorScheme="gray"
            ml={2}
          >
            Clear Time Spent
          </Button>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          {taskToEdit ? 'Update Task' : 'Add Task'}
        </Button>
      </VStack>
    </form>
  );
};

export default CreateTaskForm;
