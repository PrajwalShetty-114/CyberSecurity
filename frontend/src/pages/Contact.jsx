import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  useTheme
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Business as BusinessIcon,
  Support as SupportIcon
} from '@mui/icons-material';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this to your backend API
  };

  const contactMethods = [
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'hello@digitalshieldacademy.com',
      action: 'mailto:hello@digitalshieldacademy.com'
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: <LocationIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Visit Us',
      description: 'Our headquarters',
      contact: '123 Security Street, Cyber City, CC 12345',
      action: null
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'business', label: 'Business Partnership' },
    { value: 'support', label: 'Technical Support' },
    { value: 'media', label: 'Media & Press' },
    { value: 'careers', label: 'Careers' }
  ];

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
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Have questions about our cybersecurity training platform? We'd love to hear from you.
          </Typography>
        </Container>
      </Box>

      {/* Contact Methods */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', p: 3, textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {method.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {method.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {method.description}
                  </Typography>
                  {method.action ? (
                    <Button
                      variant="outlined"
                      href={method.action}
                      sx={{ wordBreak: 'break-all' }}
                    >
                      {method.contact}
                    </Button>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {method.contact}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Send us a Message
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Fill out the form below and we'll get back to you within 24 hours.
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company (Optional)"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Inquiry Type"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      SelectProps={{
                        native: true
                      }}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SendIcon />}
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Frequently Asked Questions
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Paper sx={{ p: 3, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    How long does it take to complete the training?
                  </Typography>
                  <Typography color="text.secondary">
                    Most modules can be completed in 15-30 minutes, but you can learn at your own pace.
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 3, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Is there a free trial available?
                  </Typography>
                  <Typography color="text.secondary">
                    Yes! Individual users get full access for free. Businesses can start with a 14-day free trial.
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 3, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Do you offer custom training modules?
                  </Typography>
                  <Typography color="text.secondary">
                    Yes, we can create custom modules for enterprise clients based on your specific needs and industry.
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    What kind of support do you provide?
                  </Typography>
                  <Typography color="text.secondary">
                    We offer email support for all users, with priority support for business customers.
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Business Contact CTA */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Secure Your Organization?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Schedule a demo with our team to see how Digital Shield Academy can transform your cybersecurity training.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<BusinessIcon />}
              sx={{ mr: 2, mb: 2 }}
            >
              Schedule Demo
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<SupportIcon />}
            >
              Get Support
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
