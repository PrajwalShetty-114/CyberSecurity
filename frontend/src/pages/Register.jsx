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
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await register(email, password);
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
        <Typography component="h1" variant="h5" sx={{ color: 'text.primary' }}>
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
            border: '1px solid rgba(148,163,184,0.12)'
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
              '& .MuiInput-underline:before': { borderBottomColor: 'rgba(148,163,184,0.18)' },
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
              '& .MuiInput-underline:before': { borderBottomColor: 'rgba(148,163,184,0.18)' },
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
              '& .MuiInput-underline:before': { borderBottomColor: 'rgba(148,163,184,0.18)' },
              '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5, boxShadow: 'none' }}
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
