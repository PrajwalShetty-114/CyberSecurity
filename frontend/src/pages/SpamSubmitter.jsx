import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  Chip,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Send as SendIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const SpamSubmitter = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    subject: '',
    sender: '',
    senderEmail: '',
    body: '',
    isSpam: null,
    reason: ''
  });

  const steps = [
    'Submit Email',
    'Your Assessment',
    'Analysis Results',
    'Points Earned'
  ];

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSpamAssessment = (isSpam) => {
    setFormData({
      ...formData,
      isSpam
    });
  };

  const handleSubmit = async () => {
    if (!formData.subject || !formData.sender || !formData.senderEmail || !formData.body) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.isSpam === null) {
      setError('Please indicate whether you think this email is spam');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to submit spam emails');
        setLoading(false);
        return;
      }

      console.log('Submitting spam email:', {
        emailContent: {
          subject: formData.subject,
          sender: formData.sender,
          senderEmail: formData.senderEmail,
          body: formData.body
        },
        userAssessment: {
          isSpam: formData.isSpam,
          reason: formData.reason
        }
      });

      const response = await axios.post(API_ENDPOINTS.SPAM_SUBMISSIONS + '/submit', {
        emailContent: {
          subject: formData.subject,
          sender: formData.sender,
          senderEmail: formData.senderEmail,
          body: formData.body
        },
        userAssessment: {
          isSpam: formData.isSpam,
          reason: formData.reason
        }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Response received:', response.data);

      setAnalysis(response.data.analysis);
      setPointsEarned(response.data.pointsEarned);
      setActiveStep(2);
    } catch (error) {
      console.error('Error submitting spam email:', error);
      console.error('Error response:', error.response);
      
      if (error.code === 'ECONNREFUSED') {
        setError('Cannot connect to server. Please make sure the backend server is running.');
      } else if (error.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(error.response?.data?.message || error.message || 'Error submitting spam email');
      }
    } finally {
      setLoading(false);
    }
  };

  const getThreatTypeColor = (threatType) => {
    switch (threatType) {
      case 'phishing': return 'error';
      case 'malware': return 'error';
      case 'scam': return 'warning';
      case 'spam': return 'info';
      case 'legitimate': return 'success';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Submit a Suspicious Email
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Help improve our spam detection by submitting emails you think might be malicious. 
              Our AI will analyze the content and award you points for correct assessments.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Subject"
                  value={formData.subject}
                  onChange={handleInputChange('subject')}
                  required
                  placeholder="e.g., URGENT: Verify Your Account"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sender Name"
                  value={formData.sender}
                  onChange={handleInputChange('sender')}
                  required
                  placeholder="e.g., Security Department"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sender Email"
                  value={formData.senderEmail}
                  onChange={handleInputChange('senderEmail')}
                  required
                  placeholder="e.g., security@bank.com"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Body"
                  value={formData.body}
                  onChange={handleInputChange('body')}
                  required
                  multiline
                  rows={6}
                  placeholder="Paste the email content here..."
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Assessment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Based on the email you submitted, do you think it's spam or malicious?
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    border: formData.isSpam === true ? '2px solid' : '1px solid',
                    borderColor: formData.isSpam === true ? 'error.main' : 'divider',
                    bgcolor: formData.isSpam === true ? 'error.50' : 'background.paper'
                  }}
                  onClick={() => handleSpamAssessment(true)}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <WarningIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Yes, it's Spam
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This email looks suspicious or malicious
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    border: formData.isSpam === false ? '2px solid' : '1px solid',
                    borderColor: formData.isSpam === false ? 'success.main' : 'divider',
                    bgcolor: formData.isSpam === false ? 'success.50' : 'background.paper'
                  }}
                  onClick={() => handleSpamAssessment(false)}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      No, it's Legitimate
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This email appears to be from a legitimate source
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Reason (Optional)"
              value={formData.reason}
              onChange={handleInputChange('reason')}
              multiline
              rows={3}
              placeholder="Why do you think this email is/isn't spam?"
            />
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Analysis Results
            </Typography>
            
            {analysis && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        AI Analysis
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <SecurityIcon sx={{ mr: 1, color: analysis.isMalicious ? 'error.main' : 'success.main' }} />
                        <Typography variant="h6" color={analysis.isMalicious ? 'error.main' : 'success.main'}>
                          {analysis.isMalicious ? 'MALICIOUS' : 'LEGITIMATE'}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Confidence: {analysis.confidence}%
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Risk Score: {analysis.riskScore}/100
                      </Typography>
                      <Chip 
                        label={analysis.threatType.toUpperCase()} 
                        color={getThreatTypeColor(analysis.threatType)}
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2">
                        {analysis.explanation}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Detected Keywords
                      </Typography>
                      {analysis.detectedKeywords.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {analysis.detectedKeywords.map((keyword, index) => (
                            <Chip
                              key={index}
                              label={keyword.keyword}
                              color={getSeverityColor(keyword.severity)}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No suspicious keywords detected
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Your Assessment vs AI Analysis
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1">
                          Your assessment: <strong>{formData.isSpam ? 'Spam' : 'Legitimate'}</strong>
                        </Typography>
                        <Typography variant="body1">
                          AI analysis: <strong>{analysis.isMalicious ? 'Malicious' : 'Legitimate'}</strong>
                        </Typography>
                        {formData.isSpam === analysis.isMalicious ? (
                          <Chip icon={<CheckCircleIcon />} label="Correct!" color="success" />
                        ) : (
                          <Chip icon={<WarningIcon />} label="Different" color="warning" />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Points Earned!
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <AnalyticsIcon sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
              <Typography variant="h3" color="primary.main">
                +{pointsEarned}
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
              Points Added to Your Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for helping improve our spam detection system!
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setActiveStep(0);
                setFormData({
                  subject: '',
                  sender: '',
                  senderEmail: '',
                  body: '',
                  isSpam: null,
                  reason: ''
                });
                setAnalysis(null);
                setPointsEarned(0);
              }}
            >
              Submit Another Email
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          🛡️ Spam Email Submitter
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Help us build a better spam detection system by submitting suspicious emails
        </Typography>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ minHeight: 400 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Back
          </Button>
          
          {activeStep < steps.length - 1 && (
            <Button
              variant="contained"
              onClick={activeStep === 1 ? handleSubmit : () => setActiveStep(activeStep + 1)}
              disabled={loading || (activeStep === 1 && formData.isSpam === null)}
              startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            >
              {loading ? 'Analyzing...' : activeStep === 1 ? 'Submit & Analyze' : 'Next'}
            </Button>
          )}
        </Box>
      </Paper>

      {/* Information Card */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <EmailIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  1. Submit Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Paste the suspicious email content including subject, sender, and body
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  2. AI Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our AI analyzes the email for malicious patterns and keywords
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  3. Earn Points
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get points for correct assessments and help improve our system
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SpamSubmitter;
