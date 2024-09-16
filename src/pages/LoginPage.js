import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../features/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const LoginPage = ({ onClose, onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8090/exhibitor/login', data);
      console.log('API Response:', res.data);
  
      if (res.data.role === "Exhibitor" || res.data.role === "Organizer") {
        console.log('Login successful');
        sessionStorage.setItem(`${res.data.role} ID`, res.data.id);
        sessionStorage.setItem('Email', res.data.email);
        sessionStorage.setItem('Role', res.data.role); 
        sessionStorage.setItem('name', res.data.name); 
        sessionStorage.setItem('PhoneNumber', res.data.phoneNumber); 
        login();     
        onLogin(); 
        onClose(); 
        const redirectTo = sessionStorage.getItem('redirectTo');
        if (redirectTo) {
          sessionStorage.removeItem('redirectTo');
          navigate(redirectTo);
        } else {
          navigate('/');
        }
      } else {
        console.log('Login failed');
        setApiError('Login failed: Invalid role');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setApiError('Login failed: Invalid email or password');
    }
  };
  
  const handleRegisterClick = () => {
    onClose();
    navigate('/register');
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Avatar sx={{ m: 1, bgcolor: '#ff7961' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {apiError && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {apiError}
          </Typography>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff7961',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff7961',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff7961',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff7961',
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#ff7961', '&:hover': { backgroundColor: '#e55b50' } }}
          >
            Login
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Don’t have an account?{' '}
            <Button onClick={handleRegisterClick} sx={{ textTransform: 'none', color: '#ff7961' }}>
              Register
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;


