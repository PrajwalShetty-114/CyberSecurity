const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    userType: {
        type: String,
        enum: ['individual', 'business_admin', 'business_member', 'platform_admin'],
        default: 'individual'
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        default: null
    },
    progress: {
        completedModules: [{
            type: String,
            enum: ['phishing-spotter', 'mfa-setup', 'scam-recognizer']
        }],
        moduleProgress: {
            'phishing-spotter': {
                score: { type: Number, default: 0 },
                correctAnswers: { type: Number, default: 0 },
                totalAttempts: { type: Number, default: 0 },
                lastAttemptDate: Date,
                simulationsCompleted: { type: Number, default: 0 },
                perfectRuns: { type: Number, default: 0 }
            },
            'mfa-setup': {
                score: { type: Number, default: 0 },
                correctAnswers: { type: Number, default: 0 },
                totalAttempts: { type: Number, default: 0 },
                lastAttemptDate: Date,
                platformsSetup: { type: Number, default: 0 },
                setupCompleted: { type: Boolean, default: false }
            },
            'scam-recognizer': {
                score: { type: Number, default: 0 },
                correctAnswers: { type: Number, default: 0 },
                totalAttempts: { type: Number, default: 0 },
                lastAttemptDate: Date,
                scamsIdentified: { type: Number, default: 0 },
                vishingCallsAvoided: { type: Number, default: 0 },
                smishingTextsAvoided: { type: Number, default: 0 }
            }
        },
        points: { // Main points (for profile display, incremental actions, etc)
            type: Number,
            default: 0
        },
        leaderboardScore: { // Total score for leaderboard/rank (sum modules, bonuses)
            type: Number,
            default: 0
        },
        rank: { // Cached/global rank in leaderboard
            type: Number,
            default: null
        },
        level: {
            type: Number,
            default: 1
        },
        xp: {
            current: { type: Number, default: 0 },
            toNextLevel: { type: Number, default: 1000 }
        },
        badges: [
            {
                id: String,
                name: String,
                description: String,
                imageUrl: String,
                category: {
                    type: String,
                    enum: ['module', 'achievement', 'special', 'streak', 'perfect']
                },
                rarity: {
                    type: String,
                    enum: ['common', 'rare', 'epic', 'legendary'],
                    default: 'common'
                },
                earnedAt: Date
            }
        ],
        achievements: [
            {
                id: String,
                name: String,
                description: String,
                progress: Number,
                target: Number,
                completed: Boolean,
                earnedAt: Date,
                category: String
            }
        ],
        stats: {
            phishingEmailsIdentified: { type: Number, default: 0 },
            scamCallsAvoided: { type: Number, default: 0 },
            mfaSetupCompleted: { type: Number, default: 0 },
            totalTimeSpent: { type: Number, default: 0 }, // in minutes
            loginStreak: { type: Number, default: 0 },
            lastLoginDate: Date,
            perfectScores: { type: Number, default: 0 },
            threatOfWeekCompleted: { type: Number, default: 0 },
            simulationsPlayed: { type: Number, default: 0 },
            averageAccuracy: { type: Number, default: 0 },
            longestStreak: { type: Number, default: 0 }
        },
        preferences: {
            notifications: {
                email: { type: Boolean, default: true },
                threatAlerts: { type: Boolean, default: true },
                achievements: { type: Boolean, default: true }
            },
            difficulty: {
                type: String,
                enum: ['beginner', 'intermediate', 'advanced', 'adaptive'],
                default: 'adaptive'
            },
            theme: {
                type: String,
                enum: ['dark', 'light', 'auto'],
                default: 'dark'
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
