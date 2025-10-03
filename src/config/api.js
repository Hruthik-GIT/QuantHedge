// API Configuration for BAU Quantum Hedge
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5001/hedgeguard-ai-202510030010/us-central1', // Firebase Functions emulator
    timeout: 10000
  },
  production: {
    baseURL: 'https://us-central1-hedgeguard-ai-202510030010.cloudfunctions.net', // Firebase Functions URL
    timeout: 15000
  }
};

// Get current environment
const getEnvironment = () => {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

// Get API configuration for current environment
export const getApiConfig = () => {
  const env = getEnvironment();
  return API_CONFIG[env];
};

// API Endpoints
export const API_ENDPOINTS = {
  ANALYZE: '/quanthedge_api/api/analyze',
  HEALTH: '/quanthedge_api/api/health',
  ROOT: '/quanthedge_api'
};

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export default API_CONFIG;
