// frontend/src/components/Header.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();


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
        background: 'rgba(17, 24, 39, 0.7)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
        boxShadow: '0 10px 30px rgba(2, 6, 23, 0.6)',
        backdropFilter: 'blur(10px)',
        mb: 4
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: 'text.primary',
            fontWeight: 700,
            letterSpacing: -0.3
          }}
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer' }}
        >
          🛡️ Digital Shield Academy
        </Typography>

        {user && user.isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              sx={{
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(148, 163, 184, 0.08)'
                }
              }}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={{
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(148, 163, 184, 0.08)'
                }
              }}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              sx={{
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(148, 163, 184, 0.08)'
                }
              }}
              onClick={() => navigate('/modules/phishing-spotter')}
            >
              Phishing Spotter
            </Button>
            <Button
              color="inherit"
              sx={{
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(148, 163, 184, 0.08)'
                }
              }}
              onClick={() => navigate('/modules/mfa-setup')}
            >
              MFA Setup
            </Button>
            <Button
              color="inherit"
              sx={{
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(148, 163, 184, 0.08)'
                }
              }}
              onClick={() => navigate('/modules/scam-recognizer')}
            >
              Scam Recognizer
            </Button>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                px: 3,
                py: 1,
                fontWeight: 600
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
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(148, 163, 184, 0.08)'
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
                fontWeight: 600
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
