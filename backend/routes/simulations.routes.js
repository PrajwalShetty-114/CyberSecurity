const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Simulation = require('../models/Simulation');
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

// Get simulations for a specific module
router.get('/module/:moduleId', authenticateToken, async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { difficulty, limit = 10 } = req.query;
    
    let query = { moduleId };
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    const simulations = await Simulation.find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    res.json(simulations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching simulations', error: error.message });
  }
});

// Get a random simulation for practice
router.get('/random/:moduleId', authenticateToken, async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { difficulty } = req.query;
    
    let query = { moduleId };
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    const count = await Simulation.countDocuments(query);
    const random = Math.floor(Math.random() * count);
    const simulation = await Simulation.findOne(query).skip(random);
    
    if (!simulation) {
      return res.status(404).json({ message: 'No simulations found' });
    }
    
    res.json(simulation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random simulation', error: error.message });
  }
});

// Submit simulation result
router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { simulationId, userAction, timeSpent, isCorrect } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const simulation = await Simulation.findById(simulationId);
    if (!simulation) {
      return res.status(404).json({ message: 'Simulation not found' });
    }
    
    // Calculate points based on performance
    let pointsEarned = 0;
    if (isCorrect) {
      pointsEarned = simulation.points;
      // Bonus for speed (under 30 seconds)
      if (timeSpent < 30) {
        pointsEarned += Math.round(simulation.points * 0.5);
      }
    } else {
      // Small penalty for wrong answers
      pointsEarned = -Math.round(simulation.points * 0.1);
    }
    
    // Update user progress
    const moduleId = simulation.moduleId;
    if (!user.progress.moduleProgress[moduleId]) {
      user.progress.moduleProgress[moduleId] = {
        score: 0,
        correctAnswers: 0,
        totalAttempts: 0,
        lastAttemptDate: new Date()
      };
    }
    
    const moduleProgress = user.progress.moduleProgress[moduleId];
    moduleProgress.totalAttempts += 1;
    moduleProgress.lastAttemptDate = new Date();
    
    if (isCorrect) {
      moduleProgress.correctAnswers += 1;
      moduleProgress.score = Math.round((moduleProgress.correctAnswers / moduleProgress.totalAttempts) * 100);
      
      // Update specific stats based on module
      switch (moduleId) {
        case 'phishing-spotter':
          user.progress.stats.phishingEmailsIdentified += 1;
          moduleProgress.simulationsCompleted += 1;
          if (moduleProgress.score === 100) {
            moduleProgress.perfectRuns += 1;
            user.progress.stats.perfectScores += 1;
          }
          break;
        case 'scam-recognizer':
          user.progress.stats.scamCallsAvoided += 1;
          moduleProgress.scamsIdentified += 1;
          break;
        case 'mfa-setup':
          if (userAction === 'setup-completed') {
            user.progress.stats.mfaSetupCompleted += 1;
            moduleProgress.platformsSetup += 1;
            moduleProgress.setupCompleted = true;
          }
          break;
      }
    }
    
    // Update overall stats
    user.progress.points += pointsEarned;
    user.progress.stats.simulationsPlayed += 1;
    user.progress.stats.totalTimeSpent += timeSpent;
    
    // Calculate average accuracy
    const totalCorrect = Object.values(user.progress.moduleProgress)
      .reduce((sum, mp) => sum + (mp.correctAnswers || 0), 0);
    const totalAttempts = Object.values(user.progress.moduleProgress)
      .reduce((sum, mp) => sum + (mp.totalAttempts || 0), 0);
    user.progress.stats.averageAccuracy = totalAttempts > 0 ? 
      Math.round((totalCorrect / totalAttempts) * 100) : 0;
    
    // Update level and XP
    updateUserLevel(user);
    
    // Check for new badges and achievements
    const newBadges = checkForBadges(user.progress);
    const newAchievements = checkForAchievements(user.progress);
    
    // Add new badges
    newBadges.forEach(badge => {
      if (!user.progress.badges.some(b => b.id === badge.id)) {
        user.progress.badges.push({ ...badge, earnedAt: new Date() });
      }
    });
    
    // Update achievements
    newAchievements.forEach(achievement => {
      const existing = user.progress.achievements.find(a => a.id === achievement.id);
      if (existing) {
        existing.progress = achievement.progress;
        existing.completed = achievement.completed;
        if (achievement.completed && !existing.earnedAt) {
          existing.earnedAt = new Date();
        }
      } else {
        user.progress.achievements.push({
          ...achievement,
          earnedAt: achievement.completed ? new Date() : null
        });
      }
    });
    
    await user.save();
    
    res.json({
      pointsEarned,
      newBadges,
      newAchievements: newAchievements.filter(a => a.completed),
      updatedProgress: user.progress,
      feedback: generateFeedback(simulation, isCorrect, userAction)
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error submitting simulation', error: error.message });
  }
});

// Helper function to update user level
function updateUserLevel(user) {
  const xpPerLevel = 1000;
  const newLevel = Math.floor(user.progress.points / xpPerLevel) + 1;
  
  if (newLevel > user.progress.level) {
    user.progress.level = newLevel;
    user.progress.xp.current = user.progress.points % xpPerLevel;
    user.progress.xp.toNextLevel = xpPerLevel - user.progress.xp.current;
  } else {
    user.progress.xp.current = user.progress.points % xpPerLevel;
    user.progress.xp.toNextLevel = xpPerLevel - user.progress.xp.current;
  }
}

// Helper function to check for badges
function checkForBadges(progress) {
  const badges = [];
  
  // Module mastery badges
  Object.entries(progress.moduleProgress).forEach(([moduleId, data]) => {
    if (data.score >= 90) {
      const badgeId = `${moduleId}-master`;
      if (!progress.badges.some(b => b.id === badgeId)) {
        badges.push({
          id: badgeId,
          name: `${moduleId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Master`,
          description: `Achieved 90%+ accuracy in ${moduleId}`,
          category: 'module',
          rarity: 'rare'
        });
      }
    }
  });
  
  // Perfect score badges
  if (progress.stats.perfectScores >= 5) {
    badges.push({
      id: 'perfect-defender',
      name: 'Perfect Defender',
      description: 'Achieved 5 perfect scores',
      category: 'perfect',
      rarity: 'epic'
    });
  }
  
  // Streak badges
  if (progress.stats.loginStreak >= 7) {
    badges.push({
      id: 'consistent-learner',
      name: 'Consistent Learner',
      description: '7-day login streak',
      category: 'streak',
      rarity: 'rare'
    });
  }
  
  return badges;
}

// Helper function to check for achievements
function checkForAchievements(progress) {
  const achievements = [
    {
      id: 'first-simulation',
      name: 'First Steps',
      description: 'Complete your first simulation',
      progress: progress.stats.simulationsPlayed,
      target: 1,
      completed: progress.stats.simulationsPlayed >= 1,
      category: 'milestone'
    },
    {
      id: 'simulation-master',
      name: 'Simulation Master',
      description: 'Complete 50 simulations',
      progress: progress.stats.simulationsPlayed,
      target: 50,
      completed: progress.stats.simulationsPlayed >= 50,
      category: 'milestone'
    },
    {
      id: 'accuracy-expert',
      name: 'Accuracy Expert',
      description: 'Maintain 90%+ average accuracy',
      progress: progress.stats.averageAccuracy,
      target: 90,
      completed: progress.stats.averageAccuracy >= 90,
      category: 'performance'
    }
  ];
  
  return achievements;
}

// Helper function to generate feedback
function generateFeedback(simulation, isCorrect, userAction) {
  if (isCorrect) {
    return {
      type: 'success',
      message: 'Excellent! You correctly identified this threat.',
      explanation: simulation.explanation
    };
  } else {
    return {
      type: 'error',
      message: 'Not quite right. Let\'s learn from this.',
      explanation: simulation.explanation,
      correctAction: simulation.isMalicious ? 'Report/Delete' : 'Safe to proceed'
    };
  }
}

module.exports = router;
