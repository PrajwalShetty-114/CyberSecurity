const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    industry: {
        type: String,
        trim: true
    },
    size: {
        type: String,
        enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
        default: 'small'
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    settings: {
        allowLeaderboards: {
            type: Boolean,
            default: true
        },
        requireCompletion: {
            type: Boolean,
            default: false
        },
        customModules: [{
            type: String
        }]
    },
    analytics: {
        totalMembers: {
            type: Number,
            default: 0
        },
        averageScore: {
            type: Number,
            default: 0
        },
        completionRate: {
            type: Number,
            default: 0
        },
        lastActivity: Date
    },
    subscription: {
        plan: {
            type: String,
            enum: ['free', 'basic', 'premium', 'enterprise'],
            default: 'free'
        },
        maxMembers: {
            type: Number,
            default: 5
        },
        expiresAt: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Update analytics when members are added/removed
businessSchema.methods.updateAnalytics = async function() {
    const User = mongoose.model('User');
    const members = await User.find({ businessId: this._id });
    
    this.analytics.totalMembers = members.length;
    
    if (members.length > 0) {
        const totalScores = members.reduce((sum, member) => {
            return sum + (member.progress?.points || 0);
        }, 0);
        this.analytics.averageScore = Math.round(totalScores / members.length);
        
        const completedModules = members.reduce((sum, member) => {
            return sum + (member.progress?.completedModules?.length || 0);
        }, 0);
        this.analytics.completionRate = Math.round((completedModules / (members.length * 3)) * 100);
    }
    
    this.analytics.lastActivity = new Date();
    await this.save();
};

module.exports = mongoose.model('Business', businessSchema);
