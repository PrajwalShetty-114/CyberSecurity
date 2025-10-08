const mongoose = require('mongoose');

const spamSubmissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emailContent: {
        subject: {
            type: String,
            required: true,
            trim: true
        },
        sender: {
            type: String,
            required: true,
            trim: true
        },
        senderEmail: {
            type: String,
            required: true,
            trim: true
        },
        body: {
            type: String,
            required: true
        },
        receivedDate: {
            type: Date,
            default: Date.now
        }
    },
    analysis: {
        isMalicious: {
            type: Boolean,
            default: false
        },
        confidence: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        threatType: {
            type: String,
            enum: ['phishing', 'malware', 'scam', 'spam', 'legitimate'],
            default: 'spam'
        },
        detectedKeywords: [{
            keyword: String,
            category: String,
            severity: {
                type: String,
                enum: ['low', 'medium', 'high', 'critical'],
                default: 'medium'
            }
        }],
        riskScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        explanation: {
            type: String,
            default: ''
        }
    },
    userAssessment: {
        isSpam: {
            type: Boolean,
            required: true
        },
        reason: {
            type: String,
            trim: true
        }
    },
    points: {
        awarded: {
            type: Number,
            default: 0
        },
        reason: {
            type: String,
            default: ''
        }
    },
    status: {
        type: String,
        enum: ['pending', 'analyzed', 'verified', 'rejected'],
        default: 'pending'
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    verifiedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
spamSubmissionSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Index for efficient queries
spamSubmissionSchema.index({ userId: 1, createdAt: -1 });
spamSubmissionSchema.index({ 'analysis.isMalicious': 1, status: 1 });
spamSubmissionSchema.index({ 'emailContent.senderEmail': 1 });

module.exports = mongoose.model('SpamSubmission', spamSubmissionSchema);
