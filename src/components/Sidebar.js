// src/components/Sidebar.js
import { useState } from 'react';
import { Box, VStack, Text, IconButton, Flex, Tooltip, Button } from '@chakra-ui/react';
import { FiMenu, FiHome, FiList, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';

const Sidebar = ({ displayName, onLogout }) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);


  const username = displayName.split('@')[0];
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const isActiveRoute = (path) => router.pathname === path;

  return (
    <Box
      w={isExpanded ? '250px' : '80px'}
      p={5}
      bg="gray.700"
      color="white"
      minH="100vh"
      borderRight="1px solid"
      borderColor="gray.600"
      transition="width 0.3s"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VStack align="flex-start" spacing={6} w="full">
        {/* Toggle Sidebar Button */}
        <IconButton
          icon={<FiMenu />}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          colorScheme="whiteAlpha"
          mb={4}
          alignSelf={isExpanded ? 'flex-end' : 'center'}
        />

        {/* Display Username when expanded */}
        {isExpanded && (
          <Text fontSize="lg" fontWeight="bold" mb={6} alignSelf="flex-start">
            {username}
          </Text>
        )}

        {/* Navigation Options */}
        <Flex direction="column" w="full" align={isExpanded ? 'flex-start' : 'center'} spacing={2}>
          {/* Dashboard Button */}
          <Tooltip label="Dashboard" placement="right" isDisabled={!isExpanded}>
            <Button
              leftIcon={isExpanded ? <FiHome /> : null}
              onClick={() => router.push('/dashboard')}
              w="full"
              variant="ghost"
              justifyContent={isExpanded ? 'flex-start' : 'center'}
              colorScheme={isActiveRoute('/dashboard') ? 'teal' : 'whiteAlpha'}
              iconSpacing={isExpanded ? 2 : 0}
              p={isExpanded ? 4 : 2}
            >
              {isExpanded && 'Dashboard'}
              {!isExpanded && <FiHome />}
            </Button>
          </Tooltip>

          {/* Tasks Button */}
          <Tooltip label="Tasks" placement="right" isDisabled={!isExpanded}>
            <Button
              leftIcon={isExpanded ? <FiList /> : null}
              onClick={() => router.push('/TasksPage')} 
              w="full"
              variant="ghost"
              justifyContent={isExpanded ? 'flex-start' : 'center'}
              colorScheme={isActiveRoute('/tasks') ? 'teal' : 'whiteAlpha'} 
              iconSpacing={isExpanded ? 2 : 0}
              p={isExpanded ? 4 : 2}
            >
              {isExpanded && 'Tasks'}
              {!isExpanded && <FiList />}
            </Button>
          </Tooltip>

          {/* Logout Button */}
          <Tooltip label="Logout" placement="right" isDisabled={!isExpanded}>
            <Button
              leftIcon={isExpanded ? <FiLogOut /> : null}
              onClick={onLogout}
              w="full"
              variant="ghost"
              justifyContent={isExpanded ? 'flex-start' : 'center'}
              colorScheme="red"
              iconSpacing={isExpanded ? 2 : 0}
              p={isExpanded ? 4 : 2}
            >
              {isExpanded && 'Logout'}
              {!isExpanded && <FiLogOut />}
            </Button>
          
          </Tooltip>
        
        </Flex>
      </VStack>
    </Box>
  
);
};

export default Sidebar;
