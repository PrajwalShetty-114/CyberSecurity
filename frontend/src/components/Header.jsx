// frontend/src/components/Header.jsx

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Menu, 
  MenuItem, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log('Failed to log out');
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Modules', path: '/modules' },
    { label: 'For Individuals', path: '/individuals' },
    { label: 'For Business', path: '/business' },
    { label: 'Academy Difference', path: '/academy-difference' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

  const authenticatedNavigationItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Modules', path: '/modules' },
    { label: 'Spam Submitter', path: '/spam-submitter' },
    { label: 'Blog', path: '/blog' }
  ];

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
          onClick={() => navigate(user && user.isAuthenticated ? '/dashboard' : '/')}
          style={{ cursor: 'pointer' }}
        >
          🛡️ Digital Shield Academy
        </Typography>

        {isMobile ? (
          <Box>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
            >
              {(user && user.isAuthenticated ? authenticatedNavigationItems : navigationItems).map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    handleMobileMenuClose();
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              {user && user.isAuthenticated ? (
                <MenuItem onClick={() => {
                  handleLogout();
                  handleMobileMenuClose();
                }}>
                  Sign Out
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => {
                    navigate('/login');
                    handleMobileMenuClose();
                  }}>
                    Sign In
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate('/register');
                    handleMobileMenuClose();
                  }}>
                    Sign Up
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        ) : (
          <>
            {user && user.isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {authenticatedNavigationItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    sx={{
                      border: '1px solid rgba(148, 163, 184, 0.18)',
                      borderRadius: 2,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(148, 163, 184, 0.08)'
                      }
                    }}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
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
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navigationItems.slice(0, 3).map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    sx={{
                      border: '1px solid rgba(148, 163, 184, 0.18)',
                      borderRadius: 2,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(148, 163, 184, 0.08)'
                      }
                    }}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
