import React from 'react';
import { Button, Box } from '@mui/material';

const TabNavigation = ({ currentPage, onChangePage }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Button
        variant={currentPage === 'exhibitor' ? 'contained' : 'outlined'}
        onClick={() => onChangePage('exhibitor')}
        sx={{ mx: 1, bgcolor: currentPage === 'exhibitor' ? '#ff7961' : 'transparent' }}
      >
        Exhibitor
      </Button>
      <Button
        variant={currentPage === 'organizer' ? 'contained' : 'outlined'}
        onClick={() => onChangePage('organizer')}
        sx={{ mx: 1, bgcolor: currentPage === 'organizer' ? '#ff7961' : 'transparent' }}
      >
        Organizer
      </Button>
    </Box>
  );
};

export default TabNavigation;
