import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';


// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PhishingSpotter from './pages/modules/PhishingSpotter';
import MfaSetup from './pages/modules/MfaSetup';
import ScamRecognizer from './pages/modules/ScamRecognizer';

const theme = createTheme({
  palette: {
    mode: 'dark',                      // Enable dark mode
    primary: {
      main: '#00E5FF',                 // Neon cyan
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#FF00FF',                 // Neon magenta
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    background: {
      default: '#121212',              // Deep charcoal
      paper: '#1E1E1E',                // Slightly lighter panel
    },
    text: { primary: '#E0E0E0' },      // Light gray for text
    error: { main: '#EF4444' },
    success: { main: '#22C55E' },
  },
  typography: {
    fontFamily: '"Orbitron", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 0 15px rgba(0,229,255,0.6)',  // Neon glow
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
           <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/modules/phishing-spotter" element={<PhishingSpotter />} />
            <Route path="/modules/mfa-setup" element={<MfaSetup />} />
            <Route path="/modules/scam-recognizer" element={<ScamRecognizer />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;