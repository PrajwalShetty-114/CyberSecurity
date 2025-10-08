const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        name: {
            type: String,
            required: true
        },
        email: String,
        bio: String
    },
    category: {
        type: String,
        enum: ['cybersecurity', 'phishing', 'mfa', 'scams', 'best-practices', 'news', 'social-engineering'],
        required: true
    },
    tags: [String],
    featuredImage: String,
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    publishedAt: Date,
    readTime: {
        type: Number, // in minutes
        default: 5
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
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

// Update updatedAt before saving
blogPostSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Generate slug from title
blogPostSchema.pre('save', function(next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }
    next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
