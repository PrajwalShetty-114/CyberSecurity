const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Business = require('../models/Business');
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

// Create a new business account
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { name, industry, size } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user already has a business
    if (user.businessId) {
      return res.status(400).json({ message: 'User already belongs to a business' });
    }
    
    // Create business
    const business = new Business({
      name,
      industry,
      size,
      adminId: req.userId,
      members: [{
        userId: req.userId,
        role: 'admin'
      }]
    });
    
    await business.save();
    
    // Update user
    user.userType = 'business_admin';
    user.businessId = business._id;
    await user.save();
    
    res.status(201).json({
      message: 'Business created successfully',
      business
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error creating business', error: error.message });
  }
});

// Get business details
router.get('/details', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('businessId');
    
    if (!user || !user.businessId) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    const business = await Business.findById(user.businessId)
      .populate('members.userId', 'email firstName lastName progress.points progress.level')
      .populate('adminId', 'email firstName lastName');
    
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business details', error: error.message });
  }
});

// Invite member to business
router.post('/invite', authenticateToken, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user || user.userType !== 'business_admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const business = await Business.findById(user.businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    // Check subscription limits
    if (business.members.length >= business.subscription.maxMembers) {
      return res.status(400).json({ message: 'Member limit reached for current subscription' });
    }
    
    // Check if user exists
    const invitedUser = await User.findOne({ email });
    if (!invitedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user already belongs to a business
    if (invitedUser.businessId) {
      return res.status(400).json({ message: 'User already belongs to a business' });
    }
    
    // Add member to business
    business.members.push({
      userId: invitedUser._id,
      role: 'member'
    });
    
    // Update user
    invitedUser.userType = 'business_member';
    invitedUser.businessId = business._id;
    
    await business.save();
    await invitedUser.save();
    await business.updateAnalytics();
    
    res.json({
      message: 'Member invited successfully',
      member: {
        email: invitedUser.email,
        role: 'member'
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error inviting member', error: error.message });
  }
});

// Remove member from business
router.delete('/members/:memberId', authenticateToken, async (req, res) => {
  try {
    const { memberId } = req.params;
    const user = await User.findById(req.userId);
    
    if (!user || user.userType !== 'business_admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const business = await Business.findById(user.businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    // Remove member from business
    business.members = business.members.filter(member => 
      member.userId.toString() !== memberId
    );
    
    // Update user
    const memberUser = await User.findById(memberId);
    if (memberUser) {
      memberUser.userType = 'individual';
      memberUser.businessId = null;
      await memberUser.save();
    }
    
    await business.save();
    await business.updateAnalytics();
    
    res.json({ message: 'Member removed successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error removing member', error: error.message });
  }
});

// Get business analytics
router.get('/analytics', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.businessId) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    const business = await Business.findById(user.businessId)
      .populate('members.userId', 'progress');
    
    // Calculate detailed analytics
    const members = business.members.map(m => m.userId);
    const analytics = {
      totalMembers: members.length,
      averageScore: 0,
      completionRate: 0,
      moduleProgress: {
        'phishing-spotter': { completed: 0, averageScore: 0 },
        'mfa-setup': { completed: 0, averageScore: 0 },
        'scam-recognizer': { completed: 0, averageScore: 0 }
      },
      topPerformers: [],
      recentActivity: []
    };
    
    if (members.length > 0) {
      // Calculate averages
      const totalPoints = members.reduce((sum, member) => 
        sum + (member.progress?.points || 0), 0);
      analytics.averageScore = Math.round(totalPoints / members.length);
      
      // Module progress
      Object.keys(analytics.moduleProgress).forEach(moduleId => {
        const moduleData = members
          .filter(m => m.progress?.moduleProgress?.[moduleId])
          .map(m => m.progress.moduleProgress[moduleId]);
        
        if (moduleData.length > 0) {
          analytics.moduleProgress[moduleId].completed = moduleData.length;
          analytics.moduleProgress[moduleId].averageScore = Math.round(
            moduleData.reduce((sum, data) => sum + data.score, 0) / moduleData.length
          );
        }
      });
      
      // Top performers
      analytics.topPerformers = members
        .sort((a, b) => (b.progress?.points || 0) - (a.progress?.points || 0))
        .slice(0, 5)
        .map(member => ({
          email: member.email,
          points: member.progress?.points || 0,
          level: member.progress?.level || 1
        }));
    }
    
    res.json(analytics);
    
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

// Update business settings
router.put('/settings', authenticateToken, async (req, res) => {
  try {
    const { allowLeaderboards, requireCompletion, customModules } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user || user.userType !== 'business_admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const business = await Business.findById(user.businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    business.settings.allowLeaderboards = allowLeaderboards;
    business.settings.requireCompletion = requireCompletion;
    business.settings.customModules = customModules;
    
    await business.save();
    
    res.json({
      message: 'Settings updated successfully',
      settings: business.settings
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error: error.message });
  }
});

// Leave business (for members)
router.post('/leave', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.businessId) {
      return res.status(400).json({ message: 'Not a member of any business' });
    }
    
    if (user.userType === 'business_admin') {
      return res.status(400).json({ message: 'Admin cannot leave business. Transfer ownership first.' });
    }
    
    const business = await Business.findById(user.businessId);
    if (business) {
      // Remove from business members
      business.members = business.members.filter(member => 
        member.userId.toString() !== req.userId
      );
      await business.save();
      await business.updateAnalytics();
    }
    
    // Update user
    user.userType = 'individual';
    user.businessId = null;
    await user.save();
    
    res.json({ message: 'Left business successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error leaving business', error: error.message });
  }
});

module.exports = router;
