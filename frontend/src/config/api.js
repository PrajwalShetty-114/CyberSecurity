// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`
  },
  MODULES: `${API_BASE_URL}/api/modules`,
  PROGRESS: `${API_BASE_URL}/api/progress`,
  SIMULATIONS: `${API_BASE_URL}/api/simulations`,
  THREAT_OF_WEEK: `${API_BASE_URL}/api/threat-of-week`,
  BUSINESS: `${API_BASE_URL}/api/business`,
  BLOG: `${API_BASE_URL}/api/blog`,
  SPAM_SUBMISSIONS: `${API_BASE_URL}/api/spam-submissions`
};

export default API_BASE_URL;
