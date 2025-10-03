import React, { useState, useEffect } from 'react';
import { mockQuanthedgeAPI, mockPortfolioAPI, mockRiskAPI } from '../services/mockApiService';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Dashboard = ({ portfolio, onRunSimulation, isSimulationRunning }) => {
  // State management
  const [portfolioData, setPortfolioData] = useState([
    { ticker: 'AAPL', quantity: 200, price: 175.50, value: 35100 },
    { ticker: 'TSLA', quantity: 100, price: 249.00, value: 24900 },
    { ticker: 'MSFT', quantity: 50, price: 420.80, value: 21040 },
    { ticker: 'GOOGL', quantity: 25, price: 138.40, value: 3460 },
    { ticker: 'NVDA', quantity: 30, price: 465.20, value: 13956 }
  ]);
  const [marketData, setMarketData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Fetch portfolio data on component mount
  useEffect(() => {
    fetchPortfolioData();
    fetchMarketData();
  }, []);

  // Fetch portfolio data
  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const data = await mockPortfolioAPI.getPortfolioSummary();
      setPortfolioData(data.holdings || portfolioData);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setError('Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch market data
  const fetchMarketData = async () => {
    try {
      const data = await mockPortfolioAPI.getMarketData();
      setMarketData(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
      setError('Failed to load market data');
    }
  };

  // Run QuantHedge analysis
  const runQuantHedgeAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await mockQuanthedgeAPI.analyzePortfolio('Analyze my portfolio and suggest hedging strategies');
      setAnalysisResult(result);
      console.log('QuantHedge Analysis Result:', result);
    } catch (error) {
      console.error('Error running QuantHedge analysis:', error);
      setError('Failed to run analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalValue = portfolioData.reduce((sum, stock) => sum + stock.value, 0);

  // Data for pie chart
  const pieData = portfolioData.map(stock => ({
    name: stock.ticker,
    value: stock.value,
    percentage: ((stock.value / totalValue) * 100).toFixed(1)
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-blue-600">${data.value.toLocaleString()}</p>
          <p className="text-gray-600">{data.payload.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const handleRunSimulation = () => {
    const holdings = {};
    portfolioData.forEach(stock => {
      holdings[stock.ticker] = stock.quantity;
    });
    onRunSimulation(holdings);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Portfolio Dashboard</h2>
        <p className="card-subtitle">Total Value: <span style={{fontWeight: 600, color: '#10b981'}}>${totalValue.toLocaleString()}</span></p>
        <div style={{marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <button 
            onClick={runQuantHedgeAnalysis}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Analyzing...' : 'Run QuantHedge Analysis'}
          </button>
          {error && (
            <span style={{color: '#ef4444', fontSize: '0.875rem'}}>{error}</span>
          )}
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem'}}>
        {/* Portfolio Table */}
        <div>
          <h3 style={{fontSize: '1.125rem', fontWeight: 600, color: '#ffffff', marginBottom: '1rem'}}>Holdings</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                    <th style={{color: '#ffffff', fontWeight: 600}}>Ticker</th>
                    <th style={{color: '#ffffff', fontWeight: 600}}>Quantity</th>
                    <th style={{color: '#ffffff', fontWeight: 600}}>Price</th>
                    <th style={{color: '#ffffff', fontWeight: 600}}>Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((stock, index) => (
                  <tr key={stock.ticker}>
                    <td style={{fontWeight: 700, color: '#ffffff', fontSize: '1rem'}}>{stock.ticker}</td>
                    <td style={{color: '#ffffff'}}>{stock.quantity}</td>
                    <td style={{color: '#ffffff'}}>${stock.price.toFixed(2)}</td>
                    <td style={{fontWeight: 600, color: '#10b981'}}>${stock.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Portfolio Allocation Chart */}
        <div>
          <h3 style={{fontSize: '1.125rem', fontWeight: 600, color: '#374151', marginBottom: '1rem'}}>Portfolio Allocation</h3>
          <div style={{height: '320px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

                {/* QuantHedge Analysis Results */}
        {analysisResult && (
          <div>
            <h3 style={{fontSize: '1.125rem', fontWeight: 600, color: '#ffffff', marginBottom: '1rem'}}>QuantHedge Analysis</h3>
            <div style={{backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.3)'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                {/* Box 1: Market Analysis */}
                <div style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                  padding: '1.5rem', 
                  borderRadius: '0.75rem', 
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {analysisResult.data?.market_conditions && (
                    <div>
                      <h4 style={{color: '#3b82f6', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem'}}>Market Conditions</h4>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>VIX: {analysisResult.data.market_conditions.vix_level}</p>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>Sentiment: {analysisResult.data.market_conditions.sentiment}</p>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>S&P 500: {analysisResult.data.market_conditions.sp500_performance}</p>
                    </div>
                  )}
                  {analysisResult.data?.risk_assessment && (
                    <div>
                      <h4 style={{color: '#ef4444', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem'}}>Risk Assessment</h4>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>Beta: {analysisResult.data.risk_assessment.portfolio_beta}</p>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>VaR (95%): {analysisResult.data.risk_assessment.value_at_risk_95}</p>
                    </div>
                  )}
                </div>

                {/* Box 2: Strategy & Governance */}
                <div style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  padding: '1.5rem', 
                  borderRadius: '0.75rem', 
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {analysisResult.data?.hedging_strategy && (
                    <div>
                      <h4 style={{color: '#10b981', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem'}}>Hedging Strategy</h4>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>Action: {analysisResult.data.hedging_strategy.action}</p>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>Ticker: {analysisResult.data.hedging_strategy.ticker}</p>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>Quantity: {analysisResult.data.hedging_strategy.quantity}</p>
                    </div>
                  )}
                  {analysisResult.data?.hitl_governance && (
                    <div>
                      <h4 style={{color: analysisResult.data.hitl_governance.requires_approval ? '#ef4444' : '#10b981', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem'}}>
                        HITL Governance {analysisResult.data.hitl_governance.requires_approval ? '⚠️' : '✅'}
                      </h4>
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>
                        Status: {analysisResult.data.hitl_governance.requires_approval ? 'Requires Approval' : 'Auto-Executed'}
                      </p>
                      {analysisResult.data.hitl_governance.approval_reason && (
                        <p style={{color: '#f59e0b', fontSize: '0.875rem', margin: '0.5rem 0'}}>
                          Reason: {analysisResult.data.hitl_governance.approval_reason}
                        </p>
                      )}
                      <p style={{color: '#ffffff', fontSize: '0.875rem', margin: '0.5rem 0'}}>
                        Threshold: {analysisResult.data.hitl_governance.risk_thresholds.max_trade_size_pct}% AUM
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {analysisResult.data?.hedging_strategy?.reasoning && (
                <div style={{marginTop: '1rem'}}>
                  <h4 style={{color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem'}}>Reasoning</h4>
                  <p style={{color: '#ffffff', fontSize: '0.75rem', lineHeight: '1.4'}}>{analysisResult.data.hedging_strategy.reasoning}</p>
                </div>
              )}
              
              {/* HITL Approval Alert */}
              {analysisResult.data?.hitl_governance?.requires_approval && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{fontSize: '1.5rem'}}>⚠️</div>
                  <div>
                    <h4 style={{color: '#ef4444', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem'}}>
                      Human Approval Required
                    </h4>
                    <p style={{color: '#ffffff', fontSize: '0.75rem', lineHeight: '1.3'}}>
                      This trade exceeds risk thresholds and requires manual approval. 
                      Please review the HITL Governance section for details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Run Simulation Button */}
      <div style={{marginTop: '2rem', textAlign: 'center'}}>
        <button
          onClick={handleRunSimulation}
          disabled={isSimulationRunning}
          className={isSimulationRunning ? 'btn btn-primary' : 'btn btn-primary'}
          style={isSimulationRunning ? {backgroundColor: '#9ca3af', cursor: 'not-allowed'} : {}}
        >
          {isSimulationRunning ? (
            <div className="btn-loading">
              <div className="spinner"></div>
              Running Simulation...
            </div>
          ) : (
            'Run Hedge Simulation'
          )}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
