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
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  School as SchoolIcon,
  Psychology as PsychologyIcon,
  Speed as SpeedIcon,
  EmojiEvents as TrophyIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const AcademyDifference = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const traditionalVsInteractive = [
    {
      aspect: 'Learning Method',
      traditional: 'Passive reading and videos',
      interactive: 'Hands-on simulations and practice'
    },
    {
      aspect: 'Engagement',
      traditional: 'Low completion rates (20-30%)',
      interactive: 'High engagement (80%+ completion)'
    },
    {
      aspect: 'Retention',
      traditional: 'Forget 70% within 24 hours',
      interactive: 'Build muscle memory through repetition'
    },
    {
      aspect: 'Assessment',
      traditional: 'Multiple choice quizzes',
      interactive: 'Real-world scenario testing'
    },
    {
      aspect: 'Feedback',
      traditional: 'Generic explanations',
      interactive: 'Instant, contextual feedback'
    },
    {
      aspect: 'Motivation',
      traditional: 'Compliance-focused',
      interactive: 'Gamified with points and badges'
    }
  ];

  const principles = [
    {
      icon: <PlayIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Learning by Doing',
      description: 'Our simulations put you in real-world scenarios where you make actual decisions and see immediate consequences.'
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Cognitive Science-Based',
      description: 'Built on proven learning principles including spaced repetition, active recall, and immediate feedback.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Adaptive Learning',
      description: 'Difficulty adjusts based on your performance, ensuring you\'re always challenged but never overwhelmed.'
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Gamification',
      description: 'Points, badges, and leaderboards make learning addictive while building confidence and motivation.'
    }
  ];

  const stats = [
    { number: '85%', label: 'Average Completion Rate' },
    { number: '3x', label: 'Faster Skill Development' },
    { number: '90%', label: 'Knowledge Retention After 6 Months' },
    { number: '95%', label: 'User Satisfaction Score' }
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
          <SchoolIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            The Academy Difference
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Why traditional cybersecurity training fails and how our interactive approach creates lasting behavioral change
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
          >
            Experience the Difference
          </Button>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h3" color="primary.main" gutterBottom>
                  {stat.number}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Traditional vs Interactive Comparison */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Traditional Training vs. Interactive Learning
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom color="error">
                    Traditional Training
                  </Typography>
                  <List>
                    {traditionalVsInteractive.map((item, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemIcon>
                          <CloseIcon color="error" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.traditional}
                          secondary={item.aspect}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', border: '2px solid', borderColor: 'primary.main' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom color="primary">
                    Digital Shield Academy
                  </Typography>
                  <List>
                    {traditionalVsInteractive.map((item, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemIcon>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.interactive}
                          secondary={item.aspect}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Learning Principles */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Our Learning Principles
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {principles.map((principle, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    {principle.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom textAlign="center">
                    {principle.title}
                  </Typography>
                  <Typography color="text.secondary" textAlign="center">
                    {principle.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Science Behind Our Approach */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            The Science Behind Our Approach
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Spaced Repetition
                </Typography>
                <Typography color="text.secondary">
                  We reinforce learning through carefully timed repetition, helping information move from short-term to long-term memory.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Active Recall
                </Typography>
                <Typography color="text.secondary">
                  Instead of passive consumption, learners actively retrieve information, strengthening neural pathways and improving retention.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Immediate Feedback
                </Typography>
                <Typography color="text.secondary">
                  Instant feedback helps learners understand mistakes immediately and correct their mental models in real-time.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Success Stories */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Proven Results
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  "Our phishing click rates dropped by 75% after implementing Digital Shield Academy."
                </Typography>
                <Typography color="text.secondary">
                  — Sarah Chen, CISO at TechCorp
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  "Finally, cybersecurity training that employees actually enjoy and complete."
                </Typography>
                <Typography color="text.secondary">
                  — Michael Rodriguez, IT Director at FinanceFirst
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ py: 8, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Transform Your Cybersecurity Training?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join the organizations already seeing results with our interactive approach
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/contact')}
          >
            Schedule Demo
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AcademyDifference;
