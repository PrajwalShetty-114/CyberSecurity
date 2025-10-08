const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ThreatOfTheWeek = require('../models/ThreatOfTheWeek');
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

// Get current threat of the week
router.get('/current', authenticateToken, async (req, res) => {
  try {
    const currentThreat = await ThreatOfTheWeek.getCurrentThreat();
    
    if (!currentThreat) {
      return res.status(404).json({ message: 'No active threat of the week' });
    }
    
    // Check if user has already completed this threat
    const user = await User.findById(req.userId);
    const userParticipation = currentThreat.participants.find(p => 
      p.userId.toString() === req.userId
    );
    
    res.json({
      ...currentThreat.toObject(),
      userCompleted: !!userParticipation,
      userScore: userParticipation?.score || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current threat', error: error.message });
  }
});

// Submit threat of the week completion
router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { threatId, score, timeSpent } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const threat = await ThreatOfTheWeek.findById(threatId);
    if (!threat) {
      return res.status(404).json({ message: 'Threat not found' });
    }
    
    // Check if user already participated
    const existingParticipation = threat.participants.find(p => 
      p.userId.toString() === req.userId
    );
    
    if (existingParticipation) {
      return res.status(400).json({ message: 'Already participated in this threat' });
    }
    
    // Add user participation
    threat.participants.push({
      userId: req.userId,
      score,
      completedAt: new Date()
    });
    
    await threat.save();
    
    // Update user stats
    user.progress.stats.threatOfWeekCompleted += 1;
    user.progress.points += Math.round(score * 2); // Double points for threat of the week
    user.progress.stats.totalTimeSpent += timeSpent;
    
    // Check for threat-specific badges
    const newBadges = [];
    if (score >= 90) {
      newBadges.push({
        id: 'threat-master',
        name: 'Threat Master',
        description: 'Scored 90%+ on a Threat of the Week challenge',
        category: 'special',
        rarity: 'epic'
      });
    }
    
    if (user.progress.stats.threatOfWeekCompleted >= 5) {
      newBadges.push({
        id: 'threat-hunter',
        name: 'Threat Hunter',
        description: 'Completed 5 Threat of the Week challenges',
        category: 'achievement',
        rarity: 'rare'
      });
    }
    
    // Add new badges
    newBadges.forEach(badge => {
      if (!user.progress.badges.some(b => b.id === badge.id)) {
        user.progress.badges.push({ ...badge, earnedAt: new Date() });
      }
    });
    
    await user.save();
    
    res.json({
      message: 'Threat of the week completed successfully',
      score,
      pointsEarned: Math.round(score * 2),
      newBadges,
      rank: threat.participants.length
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error submitting threat completion', error: error.message });
  }
});

// Get threat of the week leaderboard
router.get('/leaderboard/:threatId', authenticateToken, async (req, res) => {
  try {
    const { threatId } = req.params;
    const threat = await ThreatOfTheWeek.findById(threatId).populate('participants.userId', 'email');
    
    if (!threat) {
      return res.status(404).json({ message: 'Threat not found' });
    }
    
    // Sort participants by score (descending)
    const leaderboard = threat.participants
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((participant, index) => ({
        rank: index + 1,
        email: participant.userId.email,
        score: participant.score,
        completedAt: participant.completedAt
      }));
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
});

// Get all threats (for admin/history)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const threats = await ThreatOfTheWeek.find()
      .sort({ startDate: -1 })
      .limit(20);
    
    res.json(threats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching threats', error: error.message });
  }
});

// Create new threat of the week (admin only)
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (user.userType !== 'platform_admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const {
      title,
      description,
      threatType,
      severity,
      simulationId,
      realWorldExample,
      preventionTips,
      whatToDo,
      weekNumber,
      startDate,
      endDate
    } = req.body;
    
    const threat = new ThreatOfTheWeek({
      title,
      description,
      threatType,
      severity,
      simulation: simulationId,
      realWorldExample,
      preventionTips,
      whatToDo,
      weekNumber,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });
    
    await threat.save();
    
    res.status(201).json({
      message: 'Threat of the week created successfully',
      threat
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error creating threat', error: error.message });
  }
});

module.exports = router;
