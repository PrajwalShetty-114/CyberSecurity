// frontend/src/pages/Dashboard.jsx

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Chip,
  Avatar,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Helper: convert hex color to "r, g, b"
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stats = user?.stats || {
    score: 0,
    rank: '—',
    badges: []
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Title */}
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

      {/* Stats Panel */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          alignItems: 'center',
          mb: 5,
          p: 3,
          bgcolor: 'background.paper',
          border: '1px solid rgba(0,229,255,0.3)',
          boxShadow: '0 0 30px rgba(0,229,255,0.2)',
          borderRadius: 3
        }}
      >
        {/* Score */}
        <Box sx={{ textAlign: 'center', minWidth: 140, mb: { xs: 2, md: 0 } }}>
          <Typography variant="h6" sx={{ color: 'primary.main', mb: 0.5 }}>
            ⚡ Score
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: '#00E5FF',
              fontWeight: 700,
              textShadow: '0 0 20px #00E5FF80'
            }}
          >
            {stats.score}
          </Typography>
        </Box>

        {/* Rank */}
        <Box sx={{ textAlign: 'center', minWidth: 140, mb: { xs: 2, md: 0 } }}>
          <Typography variant="h6" sx={{ color: 'primary.main', mb: 0.5 }}>
            🏆 Rank
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#FFD600',
              fontWeight: 700,
              textShadow: '0 0 18px #FFD60070'
            }}
          >
            {stats.rank}
          </Typography>
        </Box>

        {/* Badges */}
        <Box sx={{ textAlign: 'center', minWidth: 170 }}>
          <Typography variant="h6" sx={{ color: 'primary.main', mb: 0.5 }}>
            <EmojiEventsIcon
              sx={{ verticalAlign: 'middle', color: '#ff80bf', mr: 1 }}
            />
            Badges
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
          >
            {Array.isArray(stats.badges) && stats.badges.length > 0 ? (
              stats.badges.map((badge, i) => (
                <Chip
                  key={i}
                  avatar={
                    <Avatar sx={{ bgcolor: '#00e5ff', color: '#212121' }}>
                      {badge.icon || '🏅'}
                    </Avatar>
                  }
                  label={badge.name || `Badge ${i + 1}`}
                  sx={{
                    bgcolor: 'rgba(0,229,255,0.10)',
                    color: 'primary.main',
                    fontWeight: 600,
                    boxShadow: '0 0 8px #00e5ff80',
                    mr: 1,
                    mb: 1,
                    fontSize: 16
                  }}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                No Badges Yet
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Module Cards */}
      <Grid container spacing={3}>
        {[
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
        ].map((module, index) => (
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
                  <Typography variant="body2" color="text.secondary">
                    {module.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
