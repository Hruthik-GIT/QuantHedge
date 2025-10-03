import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Results = ({ results, isVisible }) => {
  if (!isVisible || !results) {
    return null;
  }

  // Enhanced realistic data
  const riskMetrics = {
    VaR: results.risk?.VaR || -12000,
    Beta: results.risk?.Beta || 1.45,
    exposure: results.risk?.exposure || "Overexposed to TSLA",
    sharpeRatio: 1.23,
    volatility: 0.18,
    maxDrawdown: -0.08,
    correlationSPY: 0.85
  };

  const portfolioComparison = [
    { metric: 'VaR ($)', before: -15000, after: riskMetrics.VaR, improvement: 20 },
    { metric: 'Beta', before: 1.8, after: riskMetrics.Beta, improvement: 19.4 },
    { metric: 'Volatility', before: 0.25, after: riskMetrics.volatility, improvement: 28 },
    { metric: 'Max Drawdown', before: -0.12, after: riskMetrics.maxDrawdown, improvement: 33.3 }
  ];

  const riskBreakdown = [
    { name: 'Market Risk', value: 45, color: '#ff6b6b' },
    { name: 'Sector Risk', value: 25, color: '#4ecdc4' },
    { name: 'Stock Specific', value: 20, color: '#45b7d1' },
    { name: 'Currency Risk', value: 10, color: '#96ceb4' }
  ];

  const performanceData = [
    { period: '1D', portfolio: 0.8, benchmark: 0.5, hedged: 0.6 },
    { period: '1W', portfolio: 2.1, benchmark: 1.8, hedged: 1.9 },
    { period: '1M', portfolio: 5.2, benchmark: 4.1, hedged: 4.8 },
    { period: '3M', portfolio: 12.5, benchmark: 10.2, hedged: 11.8 },
    { period: '6M', portfolio: 18.7, benchmark: 15.3, hedged: 17.2 },
    { period: '1Y', portfolio: 24.3, benchmark: 19.8, hedged: 22.1 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="results-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {typeof entry.value === 'number' ? 
                (entry.dataKey.includes('$') ? `$${Math.abs(entry.value).toLocaleString()}` : entry.value.toFixed(2)) 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="results-container">
      {/* Header */}
      <div className="results-header">
        <div className="results-title-section">
          <h2 className="results-title">Simulation Results</h2>
          <p className="results-subtitle">Analysis complete - Review your hedge recommendations</p>
        </div>
        <div className="results-status">
          <div className="status-indicator success"></div>
          <span>Analysis Complete</span>
        </div>
      </div>

      <div className="results-grid">
        {/* Risk Analysis Section */}
        <div className="results-section risk-section">
          <div className="section-header">
            <div className="section-icon risk-icon">⚠️</div>
            <h3 className="section-title">Risk Analysis Report</h3>
          </div>
          
          <div className="metrics-grid">
            <div className="metric-card critical">
              <div className="metric-header">
                <span className="metric-label">Value at Risk (VaR)</span>
                <span className="metric-period">95% confidence, 1-day</span>
              </div>
              <div className="metric-value">{formatCurrency(riskMetrics.VaR)}</div>
              <div className="metric-change negative">-20% vs unhedged</div>
            </div>
            
            <div className="metric-card warning">
              <div className="metric-header">
                <span className="metric-label">Portfolio Beta</span>
                <span className="metric-period">Market correlation</span>
              </div>
              <div className="metric-value">{riskMetrics.Beta}</div>
              <div className="metric-change negative">-19.4% vs unhedged</div>
            </div>
            
            <div className="metric-card info">
              <div className="metric-header">
                <span className="metric-label">Sharpe Ratio</span>
                <span className="metric-period">Risk-adjusted return</span>
              </div>
              <div className="metric-value">{riskMetrics.sharpeRatio}</div>
              <div className="metric-change positive">+15% improvement</div>
            </div>

            <div className="metric-card warning">
              <div className="metric-header">
                <span className="metric-label">Max Drawdown</span>
                <span className="metric-period">Historical worst case</span>
              </div>
              <div className="metric-value">{formatPercentage(riskMetrics.maxDrawdown)}</div>
              <div className="metric-change positive">+33% improvement</div>
            </div>
          </div>

          {/* Risk Breakdown Chart */}
          <div className="chart-container">
            <h4 className="chart-title">Risk Composition</h4>
            <div className="risk-chart">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={riskBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Strategy Recommendations */}
        <div className="results-section strategy-section">
          <div className="section-header">
            <div className="section-icon strategy-icon">🎯</div>
            <h3 className="section-title">Hedge Strategy Recommendations</h3>
          </div>
          
          <div className="strategy-list">
            {(results.strategy || [
              "Short 100 TSLA shares at $249.00",
              "Buy 10 SPY PUT options (Strike: $420, Exp: 30d)",
              "Reduce NVDA position by 20%",
              "Add defensive allocation: 5% TLT bonds"
            ]).map((recommendation, index) => (
              <div key={index} className="strategy-item">
                <div className="strategy-number">{index + 1}</div>
                <div className="strategy-content">
                  <div className="strategy-text">{recommendation}</div>
                  <div className="strategy-impact">
                    Expected risk reduction: {[15, 8, 12, 5][index]}%
                  </div>
                </div>
                <div className="strategy-status">
                  <div className="status-dot ready"></div>
                  <span>Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Report */}
        <div className="results-section execution-section">
          <div className="section-header">
            <div className="section-icon execution-icon">⚡</div>
            <h3 className="section-title">Execution Report</h3>
          </div>
          
          <div className="execution-status">
            <div className={`execution-badge ${results.execution?.status === 'Executed' ? 'executed' : 'pending'}`}>
              <div className="badge-dot"></div>
              {results.execution?.status || 'Executed'}
            </div>
            <div className="execution-time">
              Completed at {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          <div className="execution-details">
            {(results.execution?.details || [
              "Shorted 100 TSLA @ $249.00 - Filled",
              "Bought 10 SPY PUTs @ $2.15 - Filled", 
              "Reduced NVDA position by 30 shares @ $465.20 - Filled",
              "Added TLT position: 50 shares @ $94.80 - Filled"
            ]).map((detail, index) => (
              <div key={index} className="execution-item">
                <div className="execution-dot success"></div>
                <span className="execution-text">{detail}</span>
                <span className="execution-timestamp">
                  {new Date(Date.now() - (index * 30000)).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="results-section chart-section">
          <div className="section-header">
            <div className="section-icon chart-icon">📊</div>
            <h3 className="section-title">Portfolio Performance Comparison</h3>
          </div>
          
          <div className="performance-chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="period" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="portfolio" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Original Portfolio"
                />
                <Line 
                  type="monotone" 
                  dataKey="hedged" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Hedged Portfolio"
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  name="S&P 500"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color original"></div>
              <span>Original Portfolio</span>
            </div>
            <div className="legend-item">
              <div className="legend-color hedged"></div>
              <span>Hedged Portfolio</span>
            </div>
            <div className="legend-item">
              <div className="legend-color benchmark"></div>
              <span>S&P 500 Benchmark</span>
            </div>
          </div>
        </div>

        {/* Risk Metrics Comparison */}
        <div className="results-section comparison-section">
          <div className="section-header">
            <div className="section-icon comparison-icon">📈</div>
            <h3 className="section-title">Before vs After Hedge</h3>
          </div>
          
          <div className="comparison-chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={portfolioComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="metric" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="before" fill="#ef4444" name="Before Hedge" />
                <Bar dataKey="after" fill="#10b981" name="After Hedge" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;