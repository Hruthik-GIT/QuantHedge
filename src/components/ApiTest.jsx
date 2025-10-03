import React, { useState } from 'react';
import { mockQuanthedgeAPI, mockPortfolioAPI } from '../services/mockApiService';

const ApiTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    const tests = [
      {
        name: 'Health Check',
        test: async () => {
          const result = await mockQuanthedgeAPI.healthCheck();
          return result.status === 'healthy' ? 'PASS' : 'FAIL';
        }
      },
      {
        name: 'Portfolio Analysis',
        test: async () => {
          const result = await mockQuanthedgeAPI.analyzePortfolio();
          return result.status === 'success' ? 'PASS' : 'FAIL';
        }
      },
      {
        name: 'Market Data',
        test: async () => {
          const result = await mockPortfolioAPI.getMarketData();
          return result.vix ? 'PASS' : 'FAIL';
        }
      },
      {
        name: 'Portfolio Summary',
        test: async () => {
          const result = await mockPortfolioAPI.getPortfolioSummary();
          return result.holdings?.length > 0 ? 'PASS' : 'FAIL';
        }
      }
    ];

    const results = [];
    for (const test of tests) {
      try {
        const result = await test.test();
        results.push({ name: test.name, status: result, error: null });
      } catch (error) {
        results.push({ name: test.name, status: 'FAIL', error: error.message });
      }
    }
    
    setTestResults(results);
    setLoading(false);
  };

  return (
    <div className="card" style={{ margin: '1rem' }}>
      <div className="card-header">
        <h2 className="card-title">API Integration Test</h2>
        <p className="card-subtitle">Testing mock API services</p>
      </div>
      
      <div style={{ padding: '1rem' }}>
        <button
          onClick={runTests}
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: loading ? '#6b7280' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {loading ? 'Running Tests...' : 'Run API Tests'}
        </button>

        {testResults.length > 0 && (
          <div>
            <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>Test Results:</h3>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor: result.status === 'PASS' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${result.status === 'PASS' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    color: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>{result.name}</span>
                    <span
                      style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: result.status === 'PASS' ? '#10b981' : '#ef4444',
                        color: 'white'
                      }}
                    >
                      {result.status}
                    </span>
                  </div>
                  {result.error && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#ef4444' }}>
                      Error: {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;
