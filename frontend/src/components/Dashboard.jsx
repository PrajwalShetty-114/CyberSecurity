import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  CircularProgress,
  useTheme,
  Tabs,
  Tab,
  Chip,
  Button
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Timer as TimerIcon,
  Star as StarIcon,
  Security as SecurityIcon,
  Grade as GradeIcon,
  Dashboard as DashboardIcon,
  Badge as BadgeIcon,
  TrendingUp as TrendingUpIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import ProgressTracker from './ProgressTracker';
import Badge from './Badge';
import ThreatOfTheWeek from './ThreatOfTheWeek';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [statsResponse, leaderboardResponse] = await Promise.all([
          axios.get(API_ENDPOINTS.PROGRESS + '/stats', { headers }),
          axios.get(API_ENDPOINTS.PROGRESS + '/leaderboard', { headers })
        ]);

        setStats(statsResponse.data);
        setLeaderboard(leaderboardResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back! 🛡️
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Continue your cybersecurity learning journey
        </Typography>
      </Box>

      {/* Threat of the Week */}
      <Box sx={{ mb: 4 }}>
        <ThreatOfTheWeek />
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<EmailIcon />}
                  onClick={() => navigate('/spam-submitter')}
                  sx={{ height: 60 }}
                >
                  Submit Spam Email
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<SecurityIcon />}
                  onClick={() => navigate('/modules')}
                  sx={{ height: 60 }}
                >
                  Practice Modules
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<TrophyIcon />}
                  onClick={() => navigate('/modules')}
                  sx={{ height: 60 }}
                >
                  View Badges
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<TrendingUpIcon />}
                  onClick={() => navigate('/blog')}
                  sx={{ height: 60 }}
                >
                  Read Blog
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Dashboard Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<DashboardIcon />}
            label="Overview"
            iconPosition="start"
          />
          <Tab
            icon={<BadgeIcon />}
            label="Badges"
            iconPosition="start"
          />
          <Tab
            icon={<TrendingUpIcon />}
            label="Progress"
            iconPosition="start"
          />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Quick Stats */}
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'rgba(125, 211, 252, 0.15)',
                      mb: 2,
                      mx: 'auto'
                    }}
                  >
                    <SecurityIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" gutterBottom>
                    Level {stats.level}
                  </Typography>
                  <Typography variant="h6" color="primary.main" gutterBottom>
                    {stats.points} Points
                  </Typography>
                  <Box sx={{ width: '100%', mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(stats.xp?.current / stats.xp?.toNextLevel) * 100 || 0}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {stats.xp?.current || 0} / {stats.xp?.toNextLevel || 1000} XP to next level
                  </Typography>
                </Card>
              </Grid>

              {/* Recent Achievements */}
              <Grid item xs={12} md={8}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Achievements
                    </Typography>
                    {stats.achievements?.filter(achievement => achievement.completed).length > 0 ? (
                      <List>
                        {stats.achievements
                          .filter(achievement => achievement.completed)
                          .slice(0, 3)
                          .map((achievement) => (
                            <ListItem key={achievement.id}>
                              <ListItemIcon>
                                <TrophyIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary={achievement.name}
                                secondary={achievement.description}
                              />
                            </ListItem>
                          ))}
                      </List>
                    ) : (
                      <Typography color="text.secondary">
                        Complete modules to earn achievements!
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Module Progress Overview */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Module Progress
                    </Typography>
                    <Grid container spacing={2}>
                      {Object.entries(stats.moduleProgress || {}).map(([moduleId, data]) => (
                        <Grid item xs={12} sm={6} md={4} key={moduleId}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" gutterBottom>
                                {moduleId.split('-').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={data.score}
                                    sx={{ height: 8, borderRadius: 4 }}
                                  />
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                  {data.score}%
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                Correct: {data.correctAnswers}/{data.totalAttempts} attempts
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Leaderboard */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Top Defenders
                    </Typography>
                    <List>
                      {leaderboard.slice(0, 5).map((user, index) => (
                        <React.Fragment key={user.email}>
                          <ListItem>
                            <ListItemIcon>
                              <Avatar sx={{ bgcolor: 'rgba(148,163,184,0.15)', color: 'text.primary' }}>
                                {index + 1}
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={user.email}
                              secondary={`Level ${user.level} • ${user.points} Points`}
                            />
                            <Box display="flex" alignItems="center">
                              <GradeIcon sx={{ mr: 1 }} />
                              <Typography variant="body2">
                                {user.badgeCount}
                              </Typography>
                            </Box>
                          </ListItem>
                          {index < leaderboard.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Quick Stats */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Your Stats
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <StarIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phishing Emails Identified"
                          secondary={stats.stats?.phishingEmailsIdentified || 0}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SecurityIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Scam Calls Avoided"
                          secondary={stats.stats?.scamCallsAvoided || 0}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TimerIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Time Spent"
                          secondary={formatTime(stats.totalTimeSpent || 0)}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Your Badges
              </Typography>
              {stats.badges?.length > 0 ? (
                <Grid container spacing={3}>
                  {stats.badges.map((badge) => (
                    <Grid item xs={12} sm={6} md={4} key={badge.id}>
                      <Badge badge={badge} showDetails={true} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No badges earned yet
                  </Typography>
                  <Typography color="text.secondary">
                    Complete modules and challenges to earn your first badge!
                  </Typography>
                </Paper>
              )}
            </Box>
          )}

          {activeTab === 2 && (
            <ProgressTracker progress={stats} />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;