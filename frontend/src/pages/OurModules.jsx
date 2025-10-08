import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  LinearProgress,
  useTheme,
  Paper
} from '@mui/material';
import {
  Email as EmailIcon,
  VpnKey as VpnKeyIcon,
  Phone as PhoneIcon,
  Security as SecurityIcon,
  Timer as TimerIcon,
  Star as StarIcon
} from '@mui/icons-material';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const OurModules = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.MODULES);
        setModules(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const getModuleIcon = (moduleId) => {
    switch (moduleId) {
      case 'phishing-spotter':
        return <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
      case 'mfa-setup':
        return <VpnKeyIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
      case 'scam-recognizer':
        return <PhoneIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
      default:
        return <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.1) 0%, rgba(216, 180, 254, 0.1) 100%)',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Our Learning Modules
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Master cybersecurity through interactive, hands-on simulations designed to build real-world skills
          </Typography>
        </Container>
      </Box>

      {/* Modules Grid */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {modules.map((module) => (
            <Grid item xs={12} md={6} lg={4} key={module.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getModuleIcon(module.id)}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {module.title}
                      </Typography>
                      <Chip
                        label={module.difficulty}
                        color={getDifficultyColor(module.difficulty)}
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {module.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TimerIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {module.estimatedTime}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/modules/${module.id}`)}
                    sx={{ mt: 'auto' }}
                  >
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Why Our Modules Work
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <StarIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Interactive Simulations
                </Typography>
                <Typography color="text.secondary">
                  Learn by doing with realistic scenarios that mirror real-world threats
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <SecurityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Instant Feedback
                </Typography>
                <Typography color="text.secondary">
                  Get immediate explanations and learn from mistakes in a safe environment
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <TimerIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Self-Paced Learning
                </Typography>
                <Typography color="text.secondary">
                  Progress at your own speed with adaptive difficulty and personalized paths
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Start Your Cybersecurity Journey?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of learners building their digital defense skills
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Get Started Free
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default OurModules;
