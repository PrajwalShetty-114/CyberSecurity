const mongoose = require('mongoose');

const threatOfTheWeekSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    threatType: {
        type: String,
        enum: ['phishing', 'vishing', 'smishing', 'pharming', 'social-engineering', 'malware'],
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    simulation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Simulation'
    },
    realWorldExample: {
        description: String,
        source: String,
        impact: String
    },
    preventionTips: [String],
    whatToDo: [String],
    weekNumber: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        score: Number,
        completedAt: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Get current active threat
threatOfTheWeekSchema.statics.getCurrentThreat = async function() {
    const now = new Date();
    return await this.findOne({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now }
    }).populate('simulation');
};

module.exports = mongoose.model('ThreatOfTheWeek', threatOfTheWeekSchema);
