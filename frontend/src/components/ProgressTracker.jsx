import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Timer as TimerIcon,
  Star as StarIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const ProgressTracker = ({ progress, compact = false }) => {
  const theme = useTheme();

  const getModuleDisplayName = (moduleId) => {
    return moduleId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return '🏆';
    if (score >= 70) return '⭐';
    return '📚';
  };

  if (compact) {
    return (
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Progress Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">
                {progress.level}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Level
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">
                {progress.points}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Points
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(progress.xp?.current / progress.xp?.toNextLevel) * 100 || 0}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {progress.xp?.current || 0} / {progress.xp?.toNextLevel || 1000} XP to next level
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Box>
      {/* Overall Progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Overall Progress
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary.main" gutterBottom>
                  {progress.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Level
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(progress.xp?.current / progress.xp?.toNextLevel) * 100 || 0}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {progress.xp?.current || 0} / {progress.xp?.toNextLevel || 1000} XP
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary.main" gutterBottom>
                  {progress.points}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Points
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary.main" gutterBottom>
                  {progress.completedModules?.length || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Modules Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary.main" gutterBottom>
                  {progress.badges?.length || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Badges Earned
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Module Progress */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Module Progress
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(progress.moduleProgress || {}).map(([moduleId, data]) => (
              <Grid item xs={12} md={4} key={moduleId}>
                <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2 }}>
                      {getScoreIcon(data.score)}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {getModuleDisplayName(moduleId)}
                      </Typography>
                      <Chip
                        label={`${data.score}%`}
                        color={getScoreColor(data.score)}
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <LinearProgress
                    variant="determinate"
                    value={data.score}
                    color={getScoreColor(data.score)}
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Correct: {data.correctAnswers}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Attempts: {data.totalAttempts}
                    </Typography>
                  </Box>
                  
                  {data.lastAttemptDate && (
                    <Typography variant="caption" color="text.secondary">
                      Last attempt: {new Date(data.lastAttemptDate).toLocaleDateString()}
                    </Typography>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Learning Statistics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6">
                    {progress.stats?.phishingEmailsIdentified || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Phishing Emails Identified
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimerIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6">
                    {Math.round((progress.stats?.totalTimeSpent || 0) / 60)}h
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Time Spent Learning
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6">
                    {progress.stats?.averageAccuracy || 0}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Average Accuracy
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6">
                    {progress.stats?.loginStreak || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Day Streak
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProgressTracker;
