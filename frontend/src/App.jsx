import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';


// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import OurModules from './pages/OurModules';
import ForIndividuals from './pages/ForIndividuals';
import ForBusiness from './pages/ForBusiness';
import AcademyDifference from './pages/AcademyDifference';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PhishingSpotter from './pages/modules/PhishingSpotter';
import MfaSetup from './pages/modules/MfaSetup';
import ScamRecognizer from './pages/modules/ScamRecognizer';
import SpamSubmitter from './pages/SpamSubmitter';

const theme = createTheme({
  palette: {
    mode: 'dark',                      // Enable dark mode
    primary: {
      main: '#7dd3fc',                 // Soft cyan
      light: '#a5e3ff',
      dark: '#38bdf8',
    },
    secondary: {
      main: '#d8b4fe',                 // Soft purple
      light: '#e9d5ff',
      dark: '#c084fc',
    },
    background: {
      default: '#0b0e14',              // Deep ink
      paper: '#111827',                // Blue-tinted charcoal
    },
    text: { primary: '#e5e7eb', secondary: '#9aa4b2' },
    error: { main: '#ef4444' },
    success: { main: '#22c55e' },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: -0.5 },
    h2: { fontWeight: 600, letterSpacing: -0.25 },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: '0 0 0 0 rgba(0,0,0,0)',
          '&:hover': { boxShadow: '0 0 0 0 rgba(0,0,0,0)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(2, 6, 23, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.12)'
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    }
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
            <Route path="/modules" element={<OurModules />} />
            <Route path="/individuals" element={<ForIndividuals />} />
            <Route path="/business" element={<ForBusiness />} />
            <Route path="/academy-difference" element={<AcademyDifference />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/modules/phishing-spotter"
              element={
                <ProtectedRoute>
                  <PhishingSpotter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/modules/mfa-setup"
              element={
                <ProtectedRoute>
                  <MfaSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/modules/scam-recognizer"
              element={
                <ProtectedRoute>
                  <ScamRecognizer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spam-submitter"
              element={
                <ProtectedRoute>
                  <SpamSubmitter />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user && user.isAuthenticated ? children : <Navigate to="/login" replace />;
}