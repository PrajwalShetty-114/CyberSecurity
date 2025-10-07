// frontend/src/pages/Register.jsx

import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: 'primary.main' }}>
          Create Your Account
        </Typography>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            p: 3,
            width: '100%',
            bgcolor: 'background.paper',
            border: '1px solid rgba(0,229,255,0.4)',
            boxShadow: '0 0 20px rgba(0,229,255,0.6)',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ sx: { color: 'text.primary' } }}
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: 'rgba(224,224,224,0.3)' },
              '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ sx: { color: 'text.primary' } }}
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: 'rgba(224,224,224,0.3)' },
              '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            id="password-confirm"
            autoComplete="new-password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            InputProps={{ sx: { color: 'text.primary' } }}
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: 'rgba(224,224,224,0.3)' },
              '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              boxShadow: '0 0 15px rgba(0,229,255,0.6)',
              '&:hover': { boxShadow: '0 0 25px rgba(0,229,255,0.8)' },
            }}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Log In
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
