const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
    moduleId: {
        type: String,
        required: true,
        enum: ['phishing-spotter', 'mfa-setup', 'scam-recognizer']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['email', 'phone', 'sms', 'website', 'mfa-setup', 'quiz'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    content: {
        // For phishing emails
        emailContent: {
            subject: String,
            sender: String,
            senderEmail: String,
            body: String,
            attachments: [String],
            links: [{
                url: String,
                displayText: String,
                isMalicious: Boolean,
                explanation: String
            }]
        },
        // For phone/SMS scams
        phoneContent: {
            callerId: String,
            script: String,
            audioUrl: String,
            correctResponses: [String],
            wrongResponses: [String]
        },
        // For MFA setup
        mfaContent: {
            platform: String,
            steps: [{
                stepNumber: Number,
                title: String,
                description: String,
                action: String,
                expectedResult: String
            }]
        },
        // For quizzes
        quizContent: {
            question: String,
            options: [String],
            correctAnswer: Number,
            explanation: String
        }
    },
    isMalicious: {
        type: Boolean,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 10
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Simulation', simulationSchema);
