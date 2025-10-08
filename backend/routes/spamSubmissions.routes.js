const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const SpamSubmission = require('../models/SpamSubmission');
const User = require('../models/User');
const spamAnalyzer = require('../utils/spamAnalyzer');

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

// Submit a spam email for analysis
router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { emailContent, userAssessment } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate required fields
    if (!emailContent || !emailContent.subject || !emailContent.sender || 
        !emailContent.senderEmail || !emailContent.body) {
      return res.status(400).json({ message: 'Missing required email content fields' });
    }

    if (userAssessment.isSpam === undefined || userAssessment.isSpam === null) {
      return res.status(400).json({ message: 'User assessment is required' });
    }

    // Analyze the email using our spam analyzer
    const analysis = spamAnalyzer.analyzeEmail(emailContent);
    
    // Calculate points based on analysis and user assessment
    const pointsData = spamAnalyzer.calculatePoints(analysis, userAssessment);
    
    // Create spam submission record
    const spamSubmission = new SpamSubmission({
      userId: req.userId,
      emailContent: {
        subject: emailContent.subject,
        sender: emailContent.sender,
        senderEmail: emailContent.senderEmail,
        body: emailContent.body,
        receivedDate: emailContent.receivedDate || new Date()
      },
      analysis: {
        isMalicious: analysis.isMalicious,
        confidence: analysis.confidence,
        threatType: analysis.threatType,
        detectedKeywords: analysis.detectedKeywords,
        riskScore: analysis.riskScore,
        explanation: analysis.explanation
      },
      userAssessment: {
        isSpam: userAssessment.isSpam,
        reason: userAssessment.reason || ''
      },
      points: {
        awarded: pointsData.points,
        reason: pointsData.reason
      },
      status: 'analyzed'
    });

    await spamSubmission.save();

    // Update user points and stats
    user.progress.points += pointsData.points;
    user.progress.stats.simulationsPlayed += 1;
    
    // Update specific stats based on threat type
    if (analysis.threatType === 'phishing') {
      user.progress.stats.phishingEmailsIdentified += 1;
    } else if (analysis.threatType === 'malware') {
      user.progress.stats.scamCallsAvoided += 1; // Using this field for malware detection
    }

    // Check for new badges
    const newBadges = checkForSpamSubmissionBadges(user.progress, spamSubmission);
    newBadges.forEach(badge => {
      if (!user.progress.badges.some(b => b.id === badge.id)) {
        user.progress.badges.push({ ...badge, earnedAt: new Date() });
      }
    });

    await user.save();

    res.json({
      message: 'Spam email submitted and analyzed successfully',
      analysis: spamSubmission.analysis,
      pointsEarned: pointsData.points,
      newBadges: newBadges,
      submissionId: spamSubmission._id
    });

  } catch (error) {
    console.error('Error submitting spam email:', error);
    res.status(500).json({ message: 'Error analyzing spam email', error: error.message });
  }
});

// Get user's spam submission history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const submissions = await SpamSubmission.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('emailContent analysis userAssessment points status createdAt');

    const total = await SpamSubmission.countDocuments({ userId: req.userId });

    res.json({
      submissions,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + submissions.length < total,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching submission history', error: error.message });
  }
});

// Get spam submission statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    
    const stats = await SpamSubmission.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalSubmissions: { $sum: 1 },
          totalPoints: { $sum: '$points.awarded' },
          correctAssessments: {
            $sum: {
              $cond: [
                { $eq: ['$userAssessment.isSpam', '$analysis.isMalicious'] },
                1,
                0
              ]
            }
          },
          maliciousEmails: {
            $sum: {
              $cond: [{ $eq: ['$analysis.isMalicious', true] }, 1, 0]
            }
          },
          legitimateEmails: {
            $sum: {
              $cond: [{ $eq: ['$analysis.isMalicious', false] }, 1, 0]
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalSubmissions: 0,
      totalPoints: 0,
      correctAssessments: 0,
      maliciousEmails: 0,
      legitimateEmails: 0
    };

    result.accuracy = result.totalSubmissions > 0 
      ? Math.round((result.correctAssessments / result.totalSubmissions) * 100) 
      : 0;

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching submission stats', error: error.message });
  }
});

// Get recent spam submissions for community insights
router.get('/recent', authenticateToken, async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const recentSubmissions = await SpamSubmission.find({ status: 'analyzed' })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('userId', 'email')
      .select('emailContent analysis points createdAt')
      .lean();

    // Anonymize user data
    const anonymizedSubmissions = recentSubmissions.map(submission => ({
      ...submission,
      userId: {
        email: submission.userId.email.replace(/(.{2}).*(@.*)/, '$1***$2')
      }
    }));

    res.json(anonymizedSubmissions);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent submissions', error: error.message });
  }
});

// Get threat statistics for dashboard
router.get('/threat-stats', authenticateToken, async (req, res) => {
  try {
    const threatStats = await SpamSubmission.aggregate([
      { $match: { status: 'analyzed' } },
      {
        $group: {
          _id: '$analysis.threatType',
          count: { $sum: 1 },
          avgRiskScore: { $avg: '$analysis.riskScore' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const totalSubmissions = await SpamSubmission.countDocuments({ status: 'analyzed' });

    res.json({
      threatTypes: threatStats,
      totalSubmissions,
      lastUpdated: new Date()
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching threat statistics', error: error.message });
  }
});

// Helper function to check for spam submission badges
function checkForSpamSubmissionBadges(progress, submission) {
  const badges = [];

  // First submission badge
  if (progress.stats.simulationsPlayed === 1) {
    badges.push({
      id: 'spam-hunter-novice',
      name: 'Spam Hunter Novice',
      description: 'Submitted your first spam email for analysis',
      category: 'achievement',
      rarity: 'common'
    });
  }

  // Correct assessment streak
  const isCorrect = submission.userAssessment.isSpam === submission.analysis.isMalicious;
  if (isCorrect) {
    // This would need to be tracked in user progress for streak counting
    badges.push({
      id: 'spam-detective',
      name: 'Spam Detective',
      description: 'Correctly identified a malicious email',
      category: 'achievement',
      rarity: 'rare'
    });
  }

  // High-risk email detection
  if (submission.analysis.riskScore >= 80) {
    badges.push({
      id: 'threat-expert',
      name: 'Threat Expert',
      description: 'Identified a high-risk malicious email',
      category: 'special',
      rarity: 'epic'
    });
  }

  // Multiple submissions
  if (progress.stats.simulationsPlayed >= 10) {
    badges.push({
      id: 'spam-hunter-expert',
      name: 'Spam Hunter Expert',
      description: 'Submitted 10+ spam emails for analysis',
      category: 'achievement',
      rarity: 'rare'
    });
  }

  return badges;
}

module.exports = router;
