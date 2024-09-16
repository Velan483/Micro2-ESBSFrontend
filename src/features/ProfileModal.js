import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Avatar, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ user, onClose, onPhotoUpdate }) => {
  const [email, setEmail] = useState(user.email);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(sessionStorage.getItem('ProfilePhotoUrl') || '');
  const [role, setRole] = useState(sessionStorage.getItem('Role') || ''); // Get role from session storage
  const navigate = useNavigate();

  useEffect(() => {
    setPhotoUrl(user.profilePhotoUrl || '');
    setRole(sessionStorage.getItem('Role') || ''); // Update role when user changes
  }, [user]);

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handlePhotoUpload = async () => {
    if (!profilePhoto) return;

    const exhibitorId = sessionStorage.getItem('Exhibitor ID');
    const organizerId = sessionStorage.getItem('Organizer ID');
    let url = '';

    if (role === 'Exhibitor') {
      url = `http://localhost:8090/exhibitor/profile-photo/${exhibitorId}`;
    } else if (role === 'Organizer') {
      url = `http://localhost:8090/organizer/profile-photo/${organizerId}`;
    } else {
      console.error('Invalid role:', role);
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);

    try {
      await axios.patch(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newPhotoUrl = URL.createObjectURL(profilePhoto);
      setPhotoUrl(newPhotoUrl);
      sessionStorage.setItem('ProfilePhotoUrl', newPhotoUrl);
      onPhotoUpdate(newPhotoUrl);
    } catch (err) {
      console.error('Error uploading photo:', err);
    }
  };

  const handleViewBookingHistory = () => {
    onClose();
    navigate('/booking-history');
  };

  const handleBookingDetails = () => {
    onClose();
    navigate('/booking-details');
  };

  return (
    <Container component="main" maxWidth="md" sx={{ padding: 3, backgroundColor: 'white' }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Profile</Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar src={photoUrl} sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 1 }}>Email: {email}</Typography>
        <TextField
          type="file"
          onChange={handlePhotoChange}
          sx={{ mb: 2 }}
        />
        <Box display="flex" flexDirection="row" alignItems="center" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePhotoUpload}
            sx={{ mr: 1 }} // Margin-right to space out buttons
          >
            Upload Photo
          </Button>
          {role === 'Exhibitor' && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={handleBookingDetails}
                sx={{ mr: 1 }} // Margin-right to space out buttons
              >
                Booking Status
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleViewBookingHistory}
              >
                Booking History
              </Button>
            </>
          )}
        </Box>
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileModal;
