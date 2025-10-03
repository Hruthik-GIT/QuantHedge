import axios from 'axios';
import { getApiConfig, API_ENDPOINTS, DEFAULT_HEADERS } from '../config/api.js';

// Create axios instance
const apiClient = axios.create({
  ...getApiConfig(),
  headers: DEFAULT_HEADERS
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API] Response: ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    console.error('[API] Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// QuantHedge API Service
export const quanthedgeAPI = {
  // Analyze portfolio
  analyzePortfolio: async (prompt = 'analyze my portfolio') => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ANALYZE, {
        prompt
      });
      return response.data;
    } catch (error) {
      console.error('[QuantHedge API] Analyze error:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      console.error('[QuantHedge API] Health check error:', error);
      throw error;
    }
  },

  // Get API info
  getApiInfo: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ROOT);
      return response.data;
    } catch (error) {
      console.error('[QuantHedge API] Info error:', error);
      throw error;
    }
  }
};

// Portfolio API Service (for market data)
export const portfolioAPI = {
  // Get market data
  getMarketData: async () => {
    try {
      // For now, return mock data - this will be replaced with real market data API
      return {
        vix: 18.5,
        sentiment: 'bullish',
        sp500_performance: 0.025,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('[Portfolio API] Market data error:', error);
      throw error;
    }
  },

  // Get portfolio summary
  getPortfolioSummary: async () => {
    try {
      // Mock portfolio data - this will be replaced with real portfolio data
      return {
        totalValue: 125000,
        totalReturn: 25000,
        totalReturnPercent: 25.0,
        holdings: [
          { ticker: 'AAPL', quantity: 50, price: 150.00, value: 7500 },
          { ticker: 'TSLA', quantity: 25, price: 200.00, value: 5000 },
          { ticker: 'MSFT', quantity: 30, price: 300.00, value: 9000 },
          { ticker: 'GOOGL', quantity: 20, price: 250.00, value: 5000 },
          { ticker: 'NVDA', quantity: 15, price: 400.00, value: 6000 }
        ],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('[Portfolio API] Portfolio summary error:', error);
      throw error;
    }
  }
};

// Risk API Service
export const riskAPI = {
  // Calculate portfolio risk
  calculateRisk: async (portfolioData) => {
    try {
      // Mock risk calculation - this will be replaced with real risk calculation
      return {
        beta: 1.2,
        var_95: 5000,
        exposed_assets: ['AAPL', 'TSLA'],
        risk_score: 'medium',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('[Risk API] Risk calculation error:', error);
      throw error;
    }
  }
};

export default {
  quanthedgeAPI,
  portfolioAPI,
  riskAPI
};
