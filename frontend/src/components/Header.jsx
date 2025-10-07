// frontend/src/components/Header.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log('Failed to log out');
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'rgba(18,18,18,0.95)',
        borderBottom: '1px solid rgba(0,229,255,0.4)',
        boxShadow: '0 0 15px rgba(0,229,255,0.6)',
        backdropFilter: 'blur(8px)',
        mb: 4
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: 'primary.main',
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0,229,255,0.5)'
          }}
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer' }}
        >
          🛡️ Digital Shield Academy
        </Typography>

        {currentUser ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              sx={{
                border: '1px solid rgba(0,229,255,0.4)',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0,229,255,0.1)',
                  boxShadow: '0 0 10px rgba(0,229,255,0.6)'
                }
              }}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                px: 3,
                py: 1,
                fontWeight: 600,
                boxShadow: '0 0 10px rgba(255,0,255,0.6)',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(255,0,255,0.8)'
                }
              }}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              sx={{
                border: '1px solid rgba(0,229,255,0.4)',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0,229,255,0.1)',
                  boxShadow: '0 0 10px rgba(0,229,255,0.6)'
                }
              }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                px: 3,
                py: 1,
                fontWeight: 600,
                boxShadow: '0 0 10px rgba(255,0,255,0.6)',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(255,0,255,0.8)'
                }
              }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
