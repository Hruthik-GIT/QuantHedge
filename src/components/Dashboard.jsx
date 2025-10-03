import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Dashboard = ({ portfolio, onRunSimulation, isSimulationRunning }) => {
  // Sample portfolio data
  const portfolioData = [
    { ticker: 'AAPL', quantity: 200, price: 175.50, value: 35100 },
    { ticker: 'TSLA', quantity: 100, price: 249.00, value: 24900 },
    { ticker: 'MSFT', quantity: 50, price: 420.80, value: 21040 },
    { ticker: 'GOOGL', quantity: 25, price: 138.40, value: 3460 },
    { ticker: 'NVDA', quantity: 30, price: 465.20, value: 13956 }
  ];

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
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem'}}>
        {/* Portfolio Table */}
        <div>
          <h3 style={{fontSize: '1.125rem', fontWeight: 600, color: '#374151', marginBottom: '1rem'}}>Holdings</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((stock, index) => (
                  <tr key={stock.ticker}>
                    <td style={{fontWeight: 600, color: '#111827'}}>{stock.ticker}</td>
                    <td>{stock.quantity}</td>
                    <td>${stock.price.toFixed(2)}</td>
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
