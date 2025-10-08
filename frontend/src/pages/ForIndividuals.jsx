import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Security as SecurityIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Shield as ShieldIcon
} from '@mui/icons-material';

const ForIndividuals = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    'Interactive phishing email simulations',
    'Real-world scam recognition training',
    'Multi-factor authentication setup guides',
    'Personalized learning paths',
    'Progress tracking and achievements',
    'Threat of the Week challenges'
  ];

  const benefits = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Protect Yourself',
      description: 'Learn to identify and avoid common cyber threats that target individuals'
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Gamified Learning',
      description: 'Earn points, badges, and achievements as you master cybersecurity skills'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and personalized insights'
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Self-Paced',
      description: 'Learn at your own speed with adaptive difficulty and flexible scheduling'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.1) 0%, rgba(216, 180, 254, 0.1) 100%)',
          py: 10,
          textAlign: 'center'
        }}
      >
        <Container>
          <ShieldIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            Cybersecurity for Individuals
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Build your personal digital defense skills through interactive, engaging simulations
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Start Learning Free
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/modules')}
          >
            Explore Modules
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          What You'll Learn
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Why Choose Digital Shield Academy?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom textAlign="center">
                      {benefit.title}
                    </Typography>
                    <Typography color="text.secondary" textAlign="center">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Learning Path Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Your Learning Journey
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
              <Typography variant="h3" color="primary.main" gutterBottom>
                1
              </Typography>
              <Typography variant="h6" gutterBottom>
                Start with Basics
              </Typography>
              <Typography color="text.secondary">
                Begin with fundamental concepts and simple phishing identification exercises
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
              <Typography variant="h3" color="primary.main" gutterBottom>
                2
              </Typography>
              <Typography variant="h6" gutterBottom>
                Practice & Improve
              </Typography>
              <Typography color="text.secondary">
                Engage with realistic simulations and build your threat detection skills
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
              <Typography variant="h3" color="primary.main" gutterBottom>
                3
              </Typography>
              <Typography variant="h6" gutterBottom>
                Master & Protect
              </Typography>
              <Typography color="text.secondary">
                Achieve mastery and apply your skills to protect yourself and others
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Simple, Transparent Pricing
          </Typography>
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 4, textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h3" color="primary.main" gutterBottom>
                    Free
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Individual Plan
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Access to all learning modules" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Interactive simulations" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Progress tracking" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Threat of the Week challenges" />
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/register')}
                    sx={{ mt: 3 }}
                  >
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Protect Yourself?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of individuals building their cybersecurity skills
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
          >
            Start Your Journey Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default ForIndividuals;
