const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dayjs = require('dayjs');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            email,
            password
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Initialize progress if missing and update login streak
        if (!user.progress) {
            user.progress = {
                completedModules: [],
                moduleProgress: {},
                points: 0,
                leaderboardScore: 0,
                rank: null,
                level: 1,
                badges: [],
                achievements: [],
                stats: {
                    phishingEmailsIdentified: 0,
                    scamCallsAvoided: 0,
                    mfaSetupCompleted: 0,
                    totalTimeSpent: 0,
                    loginStreak: 0,
                    lastLoginDate: new Date()
                }
            };
        }

        const lastLoginDate = user.progress.stats.lastLoginDate ? dayjs(user.progress.stats.lastLoginDate) : null;
        const today = dayjs().startOf('day');
        if (lastLoginDate) {
            const diffDays = today.diff(lastLoginDate.startOf('day'), 'day');
            if (diffDays === 1) {
                user.progress.stats.loginStreak += 1;
            } else if (diffDays > 1) {
                user.progress.stats.loginStreak = 1;
            }
        } else {
            user.progress.stats.loginStreak = 1;
        }
        user.progress.stats.lastLoginDate = new Date();

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;