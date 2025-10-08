import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  Analytics as AnalyticsIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  Shield as ShieldIcon
} from '@mui/icons-material';

const ForBusiness = () => {
  const navigate = useNavigate();

  const features = [
    'Team management and member tracking',
    'Comprehensive analytics and reporting',
    'Customizable learning paths',
    'Compliance tracking and certificates',
    'Admin dashboard for oversight',
    'Bulk user management'
  ];

  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: 'per user/month',
      maxUsers: 25,
      features: [
        'All learning modules',
        'Team analytics',
        'Basic reporting',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: '$19.99',
      period: 'per user/month',
      maxUsers: 100,
      features: [
        'Everything in Basic',
        'Advanced analytics',
        'Custom learning paths',
        'Priority support',
        'Compliance reporting'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      maxUsers: 'Unlimited',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated support',
        'On-premise deployment',
        'Custom modules'
      ]
    }
  ];

  const benefits = [
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Team Management',
      description: 'Easily onboard and manage your team members with role-based access control'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Advanced Analytics',
      description: 'Track team progress, identify knowledge gaps, and measure training effectiveness'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Compliance Ready',
      description: 'Meet regulatory requirements with detailed reporting and certificate generation'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'ROI Tracking',
      description: 'Measure the impact of your cybersecurity training investment'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.1) 0%, rgba(216, 180, 254, 0.1) 100%)',
          py: 10,
          textAlign: 'center'
        }}
      >
        <Container>
          <BusinessIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            Cybersecurity Training for Businesses
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Protect your organization with comprehensive, engaging cybersecurity training that your employees will actually complete
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/contact')}
          >
            Contact Sales
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Everything You Need to Secure Your Team
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Why Businesses Choose Us
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom textAlign="center">
                      {benefit.title}
                    </Typography>
                    <Typography color="text.secondary" textAlign="center">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Flexible Pricing Plans
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  p: 3,
                  position: 'relative',
                  ...(plan.name === 'Professional' && {
                    border: '2px solid',
                    borderColor: 'primary.main',
                    transform: 'scale(1.05)'
                  })
                }}
              >
                {plan.name === 'Professional' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" color="primary.main" gutterBottom>
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {plan.period}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Up to {plan.maxUsers} users
                  </Typography>
                  <List>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ fontSize: '0.875rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant={plan.name === 'Professional' ? 'contained' : 'outlined'}
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={() => navigate('/register')}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ROI Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            The Cost of Inaction
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom color="error">
                  Average Cost of a Data Breach
                </Typography>
                <Typography variant="h3" color="error" gutterBottom>
                  $4.45M
                </Typography>
                <Typography color="text.secondary">
                  According to IBM's 2023 Cost of a Data Breach Report
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom color="success.main">
                  Training Investment
                </Typography>
                <Typography variant="h3" color="success.main" gutterBottom>
                  $50-200
                </Typography>
                <Typography color="text.secondary">
                  Per employee per year for comprehensive cybersecurity training
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Secure Your Organization?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Start your free trial today and see the difference interactive training makes
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/contact')}
          >
            Schedule Demo
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default ForBusiness;
