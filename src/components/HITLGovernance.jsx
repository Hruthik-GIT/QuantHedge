import React, { useState, useEffect } from 'react';
import { mockQuanthedgeAPI } from '../services/mockApiService';

const HITLGovernance = () => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [approvalHistory, setApprovalHistory] = useState([]);
  const [riskThresholds, setRiskThresholds] = useState({
    maxTradeSizePct: 5.0,
    maxVaRThreshold: 10000,
    maxBetaThreshold: 1.5
  });
  const [loading, setLoading] = useState(false);

  // Mock pending approvals data
  const mockPendingApprovals = [
    {
      id: 'approval_001',
      timestamp: new Date().toISOString(),
      tradeTicket: {
        action: 'BUY_PUTS',
        ticker: 'SPY',
        quantity: 50,
        strikePrice: 420,
        expiration: '2024-02-16',
        estimatedCost: 25000
      },
      riskMetrics: {
        portfolioImpact: 6.2, // 6.2% of AUM
        varImpact: 15000,
        betaChange: 0.8
      },
      aiReasoning: "Market volatility spike detected with VIX at 25.3. Portfolio beta of 1.4 indicates high market sensitivity. Large position required to provide effective hedge against potential 15% market correction. This exceeds 5% AUM threshold but is justified by current risk environment.",
      status: 'PENDING_APPROVAL',
      priority: 'HIGH'
    },
    {
      id: 'approval_002',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      tradeTicket: {
        action: 'SELL_COVERED_CALLS',
        ticker: 'AAPL',
        quantity: 100,
        strikePrice: 180,
        expiration: '2024-02-09',
        estimatedPremium: 8500
      },
      riskMetrics: {
        portfolioImpact: 3.8, // 3.8% of AUM
        varImpact: 8000,
        betaChange: -0.2
      },
      aiReasoning: "Bullish sentiment with moderate volatility suggests selling covered calls on Apple position could generate income while maintaining upside exposure. Position size within acceptable limits.",
      status: 'PENDING_APPROVAL',
      priority: 'MEDIUM'
    }
  ];

  // Load mock data on component mount
  useEffect(() => {
    setPendingApprovals(mockPendingApprovals);
    loadApprovalHistory();
  }, []);

  const loadApprovalHistory = async () => {
    // Mock approval history
    const mockHistory = [
      {
        id: 'history_001',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        tradeTicket: {
          action: 'BUY_PUTS',
          ticker: 'QQQ',
          quantity: 30,
          strikePrice: 380
        },
        aiReasoning: "Hedge against tech sector volatility",
        decision: 'APPROVED',
        approvedBy: 'John Smith',
        executionResult: 'SUCCESS'
      },
      {
        id: 'history_002',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        tradeTicket: {
          action: 'SELL_PUTS',
          ticker: 'TSLA',
          quantity: 25,
          strikePrice: 200
        },
        aiReasoning: "Income generation strategy",
        decision: 'REJECTED',
        approvedBy: 'Sarah Johnson',
        rejectionReason: 'Position size too large for current market conditions'
      }
    ];
    setApprovalHistory(mockHistory);
  };

  const handleApproval = async (approvalId, decision, rejectionReason = null) => {
    setLoading(true);
    
    try {
      // Find the approval
      const approval = pendingApprovals.find(a => a.id === approvalId);
      if (!approval) return;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update approval with decision
      const updatedApproval = {
        ...approval,
        status: decision,
        decisionTimestamp: new Date().toISOString(),
        approvedBy: 'Current User',
        rejectionReason: rejectionReason
      };

      // Remove from pending and add to history
      setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
      setApprovalHistory(prev => [updatedApproval, ...prev]);

      console.log(`${decision} trade:`, updatedApproval);
      
    } catch (error) {
      console.error('Error processing approval:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING_APPROVAL': return '#f59e0b';
      case 'APPROVED': return '#10b981';
      case 'REJECTED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1rem' }}>
      {/* Left Column - Pending Approvals */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🚨 Pending Approvals</h2>
          <p className="card-subtitle">Human-in-the-Loop Governance</p>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <h4 style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Risk Thresholds</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.75rem', color: '#ffffff' }}>
              <div>Max Trade Size: {riskThresholds.maxTradeSizePct}% AUM</div>
              <div>Max VaR Impact: ${riskThresholds.maxVaRThreshold.toLocaleString()}</div>
              <div>Max Beta Change: {riskThresholds.maxBetaThreshold}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '1rem' }}>
          {pendingApprovals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <p>No pending approvals</p>
              <p style={{ fontSize: '0.875rem' }}>All trades within risk parameters</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    position: 'relative'
                  }}
                >
                  {/* Priority Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: getPriorityColor(approval.priority),
                      color: 'white',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {approval.priority}
                  </div>

                  {/* Trade Details */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {approval.tradeTicket.action.replace('_', ' ')} - {approval.tradeTicket.ticker}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.875rem', color: '#d1d5db' }}>
                      <div>Quantity: {approval.tradeTicket.quantity}</div>
                      <div>Strike: ${approval.tradeTicket.strikePrice}</div>
                      <div>Expiration: {approval.tradeTicket.expiration}</div>
                      <div>Cost: {formatCurrency(approval.tradeTicket.estimatedCost || approval.tradeTicket.estimatedPremium)}</div>
                    </div>
                  </div>

                  {/* Risk Metrics */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Risk Impact</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.75rem', color: '#ffffff' }}>
                      <div style={{ color: riskThresholds.maxTradeSizePct < approval.riskMetrics.portfolioImpact ? '#ef4444' : '#10b981' }}>
                        Portfolio: {approval.riskMetrics.portfolioImpact}%
                      </div>
                      <div style={{ color: riskThresholds.maxVaRThreshold < approval.riskMetrics.varImpact ? '#ef4444' : '#10b981' }}>
                        VaR: {formatCurrency(approval.riskMetrics.varImpact)}
                      </div>
                      <div style={{ color: riskThresholds.maxBetaThreshold < approval.riskMetrics.betaChange ? '#ef4444' : '#10b981' }}>
                        Beta: {approval.riskMetrics.betaChange}
                      </div>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Reasoning</h4>
                    <p style={{ fontSize: '0.75rem', color: '#d1d5db', lineHeight: '1.4' }}>
                      {approval.aiReasoning}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleApproval(approval.id, 'REJECTED', 'Manual rejection')}
                      disabled={loading}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.6 : 1
                      }}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproval(approval.id, 'APPROVED')}
                      disabled={loading}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.6 : 1
                      }}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Approval History */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">📋 Approval History</h2>
          <p className="card-subtitle">Recent governance decisions</p>
        </div>

        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'grid', gap: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
            {approvalHistory.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(75, 85, 99, 0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600 }}>
                      {item.tradeTicket.action.replace('_', ' ')} - {item.tradeTicket.ticker}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: getStatusColor(item.decision),
                      color: 'white',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {item.decision}
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#d1d5db', marginBottom: '0.5rem' }}>
                  <div>Quantity: {item.tradeTicket.quantity} | Strike: ${item.tradeTicket.strikePrice}</div>
                  {item.rejectionReason && (
                    <div style={{ color: '#ef4444', marginTop: '0.25rem' }}>
                      Reason: {item.rejectionReason}
                    </div>
                  )}
                </div>

                <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: '1.3' }}>
                  {item.aiReasoning}
                </p>

                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  By: {item.approvedBy} | Result: {item.executionResult || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HITLGovernance;
