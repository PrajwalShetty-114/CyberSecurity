// frontend/src/pages/Dashboard.jsx

import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Phishing Spotter',
      description: 'Learn to identify and avoid phishing emails',
      path: '/modules/phishing-spotter',
      color: '#00E5FF'
    },
    {
      title: 'MFA Setup Guide',
      description: 'Master Multi-Factor Authentication setup',
      path: '/modules/mfa-setup',
      color: '#FF00FF'
    },
    {
      title: 'Scam Recognizer',
      description: 'Spot and avoid common phone and SMS scams',
      path: '/modules/scam-recognizer',
      color: '#00FF88'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        component="h1" 
        variant="h4" 
        sx={{ 
          mb: 4, 
          textAlign: 'center',
          color: 'primary.main',
          textShadow: '0 0 10px rgba(0,229,255,0.5)'
        }}
      >
        Digital Shield Academy
      </Typography>

      <Grid container spacing={3}>
        {modules.map((module, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                bgcolor: 'background.paper',
                border: `1px solid rgba(${hexToRgb(module.color)}, 0.4)`,
                boxShadow: `0 0 15px rgba(${hexToRgb(module.color)}, 0.6)`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 0 25px rgba(${hexToRgb(module.color)}, 0.8)`
                }
              }}
            >
              <CardActionArea 
                onClick={() => navigate(module.path)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div"
                    sx={{ 
                      color: module.color,
                      textShadow: `0 0 8px ${module.color}40`
                    }}
                  >
                    {module.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                  >
                    {module.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add a floating progress ring or stats card here later */}
    </Container>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
}
