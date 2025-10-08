const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    
    let query = { status: 'published' };
    if (category) {
      query.category = category;
    }
    
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('title slug excerpt author category tags publishedAt readTime views likes');
    
    const total = await BlogPost.countDocuments(query);
    
    res.json({
      posts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: parseInt(page) * parseInt(limit) < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug, status: 'published' });
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Increment view count
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post', error: error.message });
  }
});

// Get related posts
router.get('/:slug/related', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug, status: 'published' });
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Find related posts by category and tags
    const relatedPosts = await BlogPost.find({
      _id: { $ne: post._id },
      status: 'published',
      $or: [
        { category: post.category },
        { tags: { $in: post.tags } }
      ]
    })
    .sort({ publishedAt: -1 })
    .limit(3)
    .select('title slug excerpt author category publishedAt readTime');
    
    res.json(relatedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching related posts', error: error.message });
  }
});

// Get blog categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { status: 'published' });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Get popular posts
router.get('/meta/popular', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const popularPosts = await BlogPost.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(parseInt(limit))
      .select('title slug excerpt author category publishedAt readTime views');
    
    res.json(popularPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular posts', error: error.message });
  }
});

// Like a blog post (simple implementation)
router.post('/:slug/like', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug, status: 'published' });
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    post.likes += 1;
    await post.save();
    
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
});

module.exports = router;
