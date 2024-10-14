import React from 'react';
import { Box, Button, Text } from '../components';
import { useAuth } from '../context/AuthContext';

const Application: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400'>
      <Text variant='title' text={'Welcome to the Application'} />
      <Text variant='subtitle' text={"We're glad to have you on board!"} />
      <Text
        variant='body'
        text={'Enjoy exploring all the features we have to offer.'}
      />
      <Button
        onClick={handleLogout}
        className='bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition duration-200'
      >
        Log Out
      </Button>
    </Box>
  );
};

export default Application;
