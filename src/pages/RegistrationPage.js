import React, { useState } from 'react';
import { Container, Box, Paper, Typography, Avatar, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { CSSTransition } from 'react-transition-group';
import TabNavigation from '../features/TabNavigation';
import Modal from '../features/Modal';
import LoginPage from './LoginPage';
import ExhibitorRegister from './ExhibitorRegister';
import OrganizerRegister from './OrganizerRegister';
import '../styles/register.css'; 

const RegistrationPage = () => {
  const [currentPage, setCurrentPage] = useState('exhibitor');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container component="main" maxWidth="sm" className="registration-container">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Avatar sx={{ m: 1, bgcolor: '#ff7961' }}>
          <PersonAddAlt1Icon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <TabNavigation currentPage={currentPage} onChangePage={setCurrentPage} />
        <Box className="rotate-wrapper">
          <CSSTransition
            in={currentPage === 'exhibitor'}
            timeout={200}
            classNames="rotate"
            unmountOnExit
          >
            <div>
              <ExhibitorRegister />
            </div>
          </CSSTransition>
          <CSSTransition
            in={currentPage === 'organizer'}
            timeout={600}
            classNames="rotate"
            unmountOnExit
          >
            <div>
              <OrganizerRegister />
            </div>
          </CSSTransition>
        </Box>
        <Typography variant="body2" color="textSecondary" align="center">
          Already have an account?{' '}
          <Button onClick={() => openModal(<LoginPage onClose={closeModal} />)} sx={{ textTransform: 'none', color: '#ff7961' }}>
            Login
          </Button>
        </Typography>
      </Paper>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalContent}
      </Modal>
    </Container>
  );
};

export default RegistrationPage;
