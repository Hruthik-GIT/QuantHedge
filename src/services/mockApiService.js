// Mock API Service for BAU Quantum Hedge
// This simulates the QuantHedge backend responses for testing

const mockAnalysisResponse = {
  "status": "success",
  "message": "QuantHedge Autonomous Hedging Analysis Complete",
  "data": {
    "market_conditions": {
      "vix_level": "18.5",
      "sentiment": "Bullish",
      "sp500_performance": "2.50%"
    },
    "risk_assessment": {
      "portfolio_beta": "1.2",
      "value_at_risk_95": "$5,000.00",
      "exposed_assets": ["AAPL", "TSLA"]
    },
    "hedging_strategy": {
      "action": "BUY_PUTS",
      "ticker": "SPY",
      "quantity": "10",
      "reasoning": "Market volatility is elevated with VIX at 18.5. Portfolio beta of 1.2 indicates higher market sensitivity. Recommend buying SPY puts to hedge against potential downside risk. Current bullish sentiment suggests protective positioning is prudent."
    },
    "trade_execution": {
      "status": "SIMULATED_TRADE_EXECUTED"
    },
    "portfolio_summary": {
      "initial_cash": "$98,456.00",
      "final_cash": "$93,456.00",
      "total_holdings": "5",
      "portfolio_value": "$98,456.00"
    },
    "hitl_governance": {
      "requires_approval": false,
      "approval_reason": null,
      "risk_thresholds": {
        "max_trade_size_pct": 5.0,
        "max_var_threshold": 10000,
        "max_beta_threshold": 1.5
      }
    }
  },
  "timestamp": new Date().toISOString()
};

const mockMarketData = {
  vix: 18.5,
  sentiment: 'bullish',
  sp500_performance: 0.025,
  timestamp: new Date().toISOString()
};

const mockPortfolioData = {
  totalValue: 98456,
  totalReturn: 8456,
  totalReturnPercent: 9.4,
  holdings: [
    { ticker: 'AAPL', quantity: 200, price: 175.50, value: 35100 },
    { ticker: 'TSLA', quantity: 100, price: 249.00, value: 24900 },
    { ticker: 'MSFT', quantity: 50, price: 420.80, value: 21040 },
    { ticker: 'GOOGL', quantity: 25, price: 138.40, value: 3460 },
    { ticker: 'NVDA', quantity: 30, price: 465.20, value: 13956 }
  ],
  timestamp: new Date().toISOString()
};

const mockRiskData = {
  beta: 1.2,
  var_95: 5000,
  exposed_assets: ['AAPL', 'TSLA'],
  risk_score: 'medium',
  timestamp: new Date().toISOString()
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock QuantHedge API Service
export const mockQuanthedgeAPI = {
  // Analyze portfolio
  analyzePortfolio: async (prompt = 'analyze my portfolio') => {
    console.log('[Mock API] Analyzing portfolio with prompt:', prompt);
    await delay(2000); // Simulate processing time
    
    // Add some randomness to make it feel more realistic
    const variations = [
      {
        ...mockAnalysisResponse,
        data: {
          ...mockAnalysisResponse.data,
          hedging_strategy: {
            ...mockAnalysisResponse.data.hedging_strategy,
            action: "BUY_PUTS",
            quantity: "10",
            reasoning: "Market volatility is elevated with VIX at 18.5. Portfolio beta of 1.2 indicates higher market sensitivity. Recommend buying SPY puts to hedge against potential downside risk."
          },
          hitl_governance: {
            requires_approval: false,
            approval_reason: null,
            risk_thresholds: {
              max_trade_size_pct: 5.0,
              max_var_threshold: 10000,
              max_beta_threshold: 1.5
            }
          }
        }
      },
      {
        ...mockAnalysisResponse,
        data: {
          ...mockAnalysisResponse.data,
          hedging_strategy: {
            ...mockAnalysisResponse.data.hedging_strategy,
            action: "SELL_CALLS",
            quantity: "25",
            reasoning: "Bullish market sentiment with moderate volatility suggests selling covered calls could generate additional income while maintaining upside exposure."
          },
          hitl_governance: {
            requires_approval: false,
            approval_reason: null,
            risk_thresholds: {
              max_trade_size_pct: 5.0,
              max_var_threshold: 10000,
              max_beta_threshold: 1.5
            }
          }
        }
      },
      {
        ...mockAnalysisResponse,
        data: {
          ...mockAnalysisResponse.data,
          hedging_strategy: {
            ...mockAnalysisResponse.data.hedging_strategy,
            action: "NO_ACTION_NEEDED",
            quantity: "0",
            reasoning: "Portfolio risk is within acceptable parameters. Current market conditions do not warrant immediate hedging action. Continue monitoring for changes."
          },
          hitl_governance: {
            requires_approval: false,
            approval_reason: "Trade size within acceptable limits",
            risk_thresholds: {
              max_trade_size_pct: 5.0,
              max_var_threshold: 10000,
              max_beta_threshold: 1.5
            }
          }
        }
      },
      // High-risk scenario requiring approval
      {
        ...mockAnalysisResponse,
        data: {
          ...mockAnalysisResponse.data,
          hedging_strategy: {
            ...mockAnalysisResponse.data.hedging_strategy,
            action: "BUY_PUTS",
            quantity: "50",
            reasoning: "CRITICAL: Market volatility spike detected with VIX at 25.3. Portfolio beta of 1.4 indicates high market sensitivity. Large position required to provide effective hedge against potential 15% market correction. This exceeds 5% AUM threshold but is justified by current risk environment."
          },
          trade_execution: {
            status: "PENDING_APPROVAL"
          },
          hitl_governance: {
            requires_approval: true,
            approval_reason: "Trade size exceeds 5% AUM threshold (6.2% impact)",
            risk_thresholds: {
              max_trade_size_pct: 5.0,
              max_var_threshold: 10000,
              max_beta_threshold: 1.5
            }
          }
        }
      }
    ];
    
    return variations[Math.floor(Math.random() * variations.length)];
  },

  // Health check
  healthCheck: async () => {
    await delay(500);
    return {
      "status": "healthy",
      "message": "QuantHedge API is running (Mock Mode)",
      "timestamp": new Date().toISOString()
    };
  },

  // Get API info
  getApiInfo: async () => {
    await delay(300);
    return {
      "message": "QuantHedge Autonomous Hedging API (Mock Mode)",
      "version": "1.0.0",
      "mode": "mock",
      "endpoints": {
        "analyze": "/api/analyze",
        "health": "/api/health"
      }
    };
  }
};

// Mock Portfolio API Service
export const mockPortfolioAPI = {
  // Get market data
  getMarketData: async () => {
    await delay(800);
    return {
      ...mockMarketData,
      vix: mockMarketData.vix + (Math.random() - 0.5) * 2, // Add some variation
      sp500_performance: mockMarketData.sp500_performance + (Math.random() - 0.5) * 0.01
    };
  },

  // Get portfolio summary
  getPortfolioSummary: async () => {
    await delay(600);
    return {
      ...mockPortfolioData,
      totalValue: mockPortfolioData.totalValue + Math.floor((Math.random() - 0.5) * 1000),
      holdings: mockPortfolioData.holdings.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 10,
        value: stock.quantity * (stock.price + (Math.random() - 0.5) * 10)
      }))
    };
  }
};

// Mock Risk API Service
export const mockRiskAPI = {
  // Calculate portfolio risk
  calculateRisk: async (portfolioData) => {
    await delay(1000);
    return {
      ...mockRiskData,
      beta: mockRiskData.beta + (Math.random() - 0.5) * 0.2,
      var_95: mockRiskData.var_95 + Math.floor((Math.random() - 0.5) * 500)
    };
  }
};

// HITL Governance API Service
export const mockHITLAPI = {
  // Get pending approvals
  getPendingApprovals: async () => {
    await delay(500);
    return [
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
          portfolioImpact: 6.2,
          varImpact: 15000,
          betaChange: 0.8
        },
        aiReasoning: "Market volatility spike detected with VIX at 25.3. Portfolio beta of 1.4 indicates high market sensitivity. Large position required to provide effective hedge against potential 15% market correction. This exceeds 5% AUM threshold but is justified by current risk environment.",
        status: 'PENDING_APPROVAL',
        priority: 'HIGH'
      }
    ];
  },

  // Approve or reject trade
  processApproval: async (approvalId, decision, rejectionReason = null) => {
    await delay(1000);
    return {
      success: true,
      approvalId,
      decision,
      rejectionReason,
      timestamp: new Date().toISOString()
    };
  },

  // Get approval history
  getApprovalHistory: async () => {
    await delay(300);
    return [
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
      }
    ];
  },

  // Get risk thresholds
  getRiskThresholds: async () => {
    await delay(200);
    return {
      maxTradeSizePct: 5.0,
      maxVaRThreshold: 10000,
      maxBetaThreshold: 1.5
    };
  }
};

export default {
  mockQuanthedgeAPI,
  mockPortfolioAPI,
  mockRiskAPI,
  mockHITLAPI
};
