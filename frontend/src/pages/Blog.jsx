import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Blog = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.BLOG, {
          params: {
            page: currentPage,
            category: selectedCategory || undefined,
            limit: 6
          }
        });
        setPosts(response.data.posts);
        setTotalPages(response.data.pagination.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.BLOG + '/meta/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.BLOG, {
        params: {
          page: 1,
          category: selectedCategory || undefined,
          limit: 6
        }
      });
      setPosts(response.data.posts);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'cybersecurity': 'primary',
      'phishing': 'error',
      'mfa': 'info',
      'scams': 'warning',
      'best-practices': 'success',
      'news': 'secondary'
    };
    return colors[category] || 'default';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography>Loading blog posts...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.1) 0%, rgba(216, 180, 254, 0.1) 100%)',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Cybersecurity Blog
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            Stay informed with the latest cybersecurity insights, threats, and best practices
          </Typography>
          
          {/* Search and Filter */}
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleSearch} variant="contained" size="small">
                      Search
                    </Button>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip
                label="All"
                onClick={() => setSelectedCategory('')}
                color={selectedCategory === '' ? 'primary' : 'default'}
                variant={selectedCategory === '' ? 'filled' : 'outlined'}
              />
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? 'primary' : 'default'}
                  variant={selectedCategory === category ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Blog Posts */}
      <Container sx={{ py: 8 }}>
        {posts.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No blog posts found.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item xs={12} md={6} lg={4} key={post._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                    },
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  {post.featuredImage && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.featuredImage}
                      alt={post.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        color={getCategoryColor(post.category)}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="h6" component="h3" gutterBottom>
                      {post.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {post.excerpt}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {post.author.name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(post.publishedAt)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <VisibilityIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {post.views} views
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <FavoriteIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {post.likes} likes
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {post.readTime} min read
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>

      {/* Newsletter Signup */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Get the latest cybersecurity insights delivered to your inbox
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, maxWidth: 400, mx: 'auto' }}>
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
              />
              <Button variant="contained">
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Blog;
