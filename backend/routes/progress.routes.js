const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Get user progress stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.progress) {
      user.progress = {
        points: 0,
        level: 1,
        completedModules: [],
        moduleProgress: {},
        badges: [],
        achievements: [],
        stats: {
          phishingEmailsIdentified: 0,
          scamCallsAvoided: 0,
          mfaSetupCompleted: 0,
          totalTimeSpent: 0,
          loginStreak: 0,
          lastLoginDate: new Date(),
        },
        totalTimeSpent: 0,
      };
      await user.save();
    }

    res.json({
      moduleProgress: user.progress.moduleProgress || {},
      level: user.progress.level || 1,
      points: user.progress.points || 0,
      badges: user.progress.badges || [],
      achievements: user.progress.achievements || [],
      stats: user.progress.stats || {},
      completedModules: user.progress.completedModules || [],
      totalTimeSpent: user.progress.totalTimeSpent || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

// Update progress when a module is completed
router.post('/module-complete', authenticateToken, async (req, res) => {
  try {
    const { moduleId, score, correctAnswers, totalAttempts, timeSpent } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Initialize progress if missing
    if (!user.progress) {
      user.progress = {
        points: 0,
        level: 1,
        completedModules: [],
        moduleProgress: {},
        badges: [],
        achievements: [],
        stats: {
          phishingEmailsIdentified: 0,
          scamCallsAvoided: 0,
          mfaSetupCompleted: 0,
          totalTimeSpent: 0,
          loginStreak: 0,
          lastLoginDate: new Date(),
        },
        totalTimeSpent: 0,
      };
    }

    // Defensive defaults
    const safeScore = Number.isFinite(score) ? score : 0;
    const safeCorrect = Number.isFinite(correctAnswers) ? correctAnswers : 0;
    const safeAttempts = Number.isFinite(totalAttempts) && totalAttempts > 0 ? totalAttempts : Math.max(safeCorrect, 1);
    const safeTime = Number.isFinite(timeSpent) && timeSpent >= 0 ? timeSpent : 0;

    // Update moduleProgress for this moduleId
    user.progress.moduleProgress[moduleId] = {
      score: safeScore,
      correctAnswers: safeCorrect,
      totalAttempts: safeAttempts,
      lastAttemptDate: new Date(),
    };

    // Add the module to completedModules if new
    if (!user.progress.completedModules.includes(moduleId)) {
      user.progress.completedModules.push(moduleId);
    }

    // Calculate points earned in this session
    const pointsEarned = calculatePoints(safeScore, safeCorrect, safeAttempts);
    user.progress.points += pointsEarned;

    // Add time spent
    user.progress.totalTimeSpent += safeTime;

    // Update specific stats based on module
    switch (moduleId) {
      case 'phishing-spotter':
        user.progress.stats.phishingEmailsIdentified += safeCorrect;
        break;
      case 'scam-recognizer':
        user.progress.stats.scamCallsAvoided += safeCorrect;
        break;
      case 'mfa-setup':
        user.progress.stats.mfaSetupCompleted += 1;
        break;
    }

    // Update level based on total points
    user.progress.level = calculateLevel(user.progress.points);

    // Check badges and add any new ones
    const earnedBadges = checkForBadges(user.progress);
    earnedBadges.forEach((badge) => {
      if (!user.progress.badges.some((b) => b.id === badge.id)) {
        user.progress.badges.push({ ...badge, earnedAt: new Date() });
      }
    });

    // Check and update achievements
    const achievements = checkForAchievements(user.progress);
    achievements.forEach((achievement) => {
      const existing = user.progress.achievements.find((a) => a.id === achievement.id);
      if (existing) {
        existing.progress = achievement.progress;
        existing.completed = achievement.completed;
        if (achievement.completed && !existing.earnedAt) {
          existing.earnedAt = new Date();
        }
      } else {
        user.progress.achievements.push({
          ...achievement,
          earnedAt: achievement.completed ? new Date() : null,
        });
      }
    });

    await user.save();

    res.json({
      progress: user.progress,
      pointsEarned,
      newBadges: earnedBadges,
      achievements: achievements.filter((a) => a.completed),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
});

// Calculate points earned in a module based on performance
function calculatePoints(score, correctAnswers, totalAttempts) {
  const basePoints = score * 10;
  const accuracyBonus = (correctAnswers / totalAttempts) * 50;
  const speedBonus = totalAttempts === 1 ? 25 : 0;
  return Math.round(basePoints + accuracyBonus + speedBonus);
}

// Calculate level based on total points
function calculateLevel(points) {
  return Math.floor(points / 1000) + 1;
}

// Check and award badges based on progress
function checkForBadges(progress) {
  const earnedBadges = [];

  // Mastery badges for modules
  const moduleThresholds = {
    'phishing-spotter': { id: 'phishing-expert', name: 'Phishing Expert', threshold: 90 },
    'mfa-setup': { id: 'mfa-master', name: 'MFA Master', threshold: 85 },
    'scam-recognizer': { id: 'scam-detective', name: 'Scam Detective', threshold: 90 }
  };

  Object.entries(progress.moduleProgress).forEach(([moduleId, data]) => {
    const threshold = moduleThresholds[moduleId];
    if (threshold && data.score >= threshold.threshold) {
      earnedBadges.push({
        id: threshold.id,
        name: threshold.name,
        description: `Achieved mastery in ${moduleId} with a score of ${data.score}%`,
        imageUrl: `/badges/${threshold.id}.png`
      });
    }
  });

  // Achievement badges
  if (progress.stats.phishingEmailsIdentified >= 50) {
    earnedBadges.push({
      id: 'phishing-hunter',
      name: 'Phishing Hunter',
      description: 'Successfully identified 50 phishing attempts',
      imageUrl: '/badges/phishing-hunter.png'
    });
  }

  if (progress.stats.scamCallsAvoided >= 30) {
    earnedBadges.push({
      id: 'scam-shield',
      name: 'Scam Shield',
      description: 'Protected yourself from 30 scam calls',
      imageUrl: '/badges/scam-shield.png'
    });
  }

  if (progress.stats.mfaSetupCompleted >= 3) {
    earnedBadges.push({
      id: 'mfa-guardian',
      name: 'MFA Guardian',
      description: 'Set up MFA on 3 different platforms',
      imageUrl: '/badges/mfa-guardian.png'
    });
  }

  return earnedBadges;
}

// Check for achievements (progress updates)
function checkForAchievements(progress) {
  const achievements = [
    {
      id: 'security-novice',
      name: 'Security Novice',
      description: 'Complete your first module',
      progress: progress.completedModules.length,
      completed: progress.completedModules.length >= 1
    },
    {
      id: 'security-expert',
      name: 'Security Expert',
      description: 'Complete all modules with a score of 80% or higher',
      progress: Object.values(progress.moduleProgress).filter(m => m.score >= 80).length,
      completed: Object.values(progress.moduleProgress).every(m => m.score >= 80)
    },
    {
      id: 'perfect-defender',
      name: 'Perfect Defender',
      description: 'Achieve 100% score in any module',
      progress: Object.values(progress.moduleProgress).some(m => m.score === 100) ? 1 : 0,
      completed: Object.values(progress.moduleProgress).some(m => m.score === 100)
    },
    {
      id: 'consistent-learner',
      name: 'Consistent Learner',
      description: 'Maintain a 7-day login streak',
      progress: progress.stats.loginStreak,
      completed: progress.stats.loginStreak >= 7
    }
  ];

  return achievements;
}

// Leaderboard for top 10 users by points
router.get('/leaderboard', authenticateToken, async (req, res) => {
  try {
    const leaderboard = await User.find({}, 'email progress.points progress.level progress.badges')
      .sort({ 'progress.points': -1 })
      .limit(10);

    res.json(leaderboard.map(user => ({
      email: user.email,
      points: user.progress.points || 0,
      level: user.progress.level || 1,
      badgeCount: user.progress.badges?.length || 0
    })));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
});

module.exports = router;
