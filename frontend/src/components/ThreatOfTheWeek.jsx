import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Security as SecurityIcon,
  Timer as TimerIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const ThreatOfTheWeek = () => {
  const theme = useTheme();
  const [threat, setThreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCompleted, setUserCompleted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => {
    const fetchCurrentThreat = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_ENDPOINTS.THREAT_OF_WEEK + '/current', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setThreat(response.data);
        setUserCompleted(response.data.userCompleted);
        setUserScore(response.data.userScore);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching threat of the week:', error);
        setLoading(false);
      }
    };

    fetchCurrentThreat();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getThreatTypeIcon = (threatType) => {
    switch (threatType) {
      case 'phishing': return '📧';
      case 'vishing': return '📞';
      case 'smishing': return '💬';
      case 'pharming': return '🌐';
      case 'social-engineering': return '🎭';
      case 'malware': return '🦠';
      default: return '⚠️';
    }
  };

  const handleStartChallenge = () => {
    setShowSimulation(true);
  };

  const handleSimulationComplete = async (score) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(API_ENDPOINTS.THREAT_OF_WEEK + '/submit', {
        threatId: threat._id,
        score,
        timeSpent: 300 // 5 minutes average
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserCompleted(true);
      setUserScore(score);
      setShowSimulation(false);
    } catch (error) {
      console.error('Error submitting threat completion:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  if (!threat) {
    return (
      <Alert severity="info">
        No active threat of the week challenge available. Check back next week!
      </Alert>
    );
  }

  if (showSimulation && threat.simulation) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Threat of the Week Challenge
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Complete the simulation to test your knowledge of this week's threat.
        </Typography>
        {/* Simulation component would go here */}
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Simulation Placeholder
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            This would contain the actual interactive simulation for: {threat.title}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleSimulationComplete(85)}
            sx={{ mr: 2 }}
          >
            Complete Simulation (85%)
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowSimulation(false)}
          >
            Cancel
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🏆 Threat of the Week
          </Typography>
          <Chip
            icon={<WarningIcon />}
            label={threat.severity.toUpperCase()}
            color={getSeverityColor(threat.severity)}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ mr: 2 }}>
            {getThreatTypeIcon(threat.threatType)}
          </Typography>
          <Box>
            <Typography variant="h5" gutterBottom>
              {threat.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Week {threat.weekNumber} • {threat.threatType.charAt(0).toUpperCase() + threat.threatType.slice(1)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {threat.description}
        </Typography>

        {threat.realWorldExample && (
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom color="error">
              Real-World Example
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {threat.realWorldExample.description}
            </Typography>
            {threat.realWorldExample.impact && (
              <Typography variant="body2" color="text.secondary">
                <strong>Impact:</strong> {threat.realWorldExample.impact}
              </Typography>
            )}
          </Paper>
        )}

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Prevention Tips
            </Typography>
            <List dense>
              {threat.preventionTips.map((tip, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <CheckIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={tip} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              What to Do
            </Typography>
            <List dense>
              {threat.whatToDo.map((action, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <SecurityIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={action} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        {userCompleted ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6">
                  Challenge Completed! 🎉
                </Typography>
                <Typography variant="body2">
                  You scored {userScore}% on this week's threat challenge.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrophyIcon color="warning" />
                <Typography variant="h6">
                  {userScore}%
                </Typography>
              </Box>
            </Box>
          </Alert>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartChallenge}
              startIcon={<SecurityIcon />}
              sx={{ mb: 2 }}
            >
              Take the Challenge
            </Button>
            <Typography variant="body2" color="text.secondary">
              Test your knowledge with an interactive simulation
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Challenge expires: {new Date(threat.endDate).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ThreatOfTheWeek;
