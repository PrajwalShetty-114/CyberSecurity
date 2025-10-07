// frontend/src/components/LoadingSpinner.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';

export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 3
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          border: '4px solid transparent',
          borderTop: '4px solid #00E5FF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          boxShadow: '0 0 15px rgba(0,229,255,0.6)',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          }
        }}
      />
      <Typography
        sx={{
          color: 'primary.main',
          fontWeight: 600,
          textShadow: '0 0 10px rgba(0,229,255,0.5)'
        }}
      >
        Loading Shield...
      </Typography>
    </Box>
  );
}
