import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnimatedGlobe from '../components/AnimatedGlobe';

const ReasoningAgentPage = () => {
  const [selectedScenario, setSelectedScenario] = useState('2008-crisis');
  const [stressTestResults, setStressTestResults] = useState(null);
  const [causalExplanations, setCausalExplanations] = useState(null);
  const [isRunningStressTest, setIsRunningStressTest] = useState(false);
  const [isGeneratingExplanations, setIsGeneratingExplanations] = useState(false);

  // Mock stress test scenarios
  const stressScenarios = [
    {
      id: '2008-crisis',
      name: '2008 Financial Crisis',
      description: 'Simulate the 2008 financial crisis conditions',
      date: 'September 2008 - March 2009',
      marketConditions: {
        vix: 80.06,
        sp500Drop: -56.8,
        sentiment: 'Extreme Fear',
        duration: '6 months'
      },
      keyEvents: [
        'Lehman Brothers collapse',
        'Banking system crisis',
        'Credit market freeze',
        'Government bailouts'
      ]
    },
    {
      id: '2020-pandemic',
      name: '2020 Pandemic Crash',
      description: 'Simulate the COVID-19 market crash',
      date: 'February - April 2020',
      marketConditions: {
        vix: 82.69,
        sp500Drop: -33.9,
        sentiment: 'Panic',
        duration: '2 months'
      },
      keyEvents: [
        'Global lockdowns',
        'Economic shutdown',
        'Oil price crash',
        'Federal Reserve intervention'
      ]
    },
    {
      id: 'dot-com-bubble',
      name: 'Dot-Com Bubble Burst',
      description: 'Simulate the 2000-2002 tech bubble burst',
      date: 'March 2000 - October 2002',
      marketConditions: {
        vix: 45.74,
        sp500Drop: -49.1,
        sentiment: 'Tech Crash',
        duration: '30 months'
      },
      keyEvents: [
        'Tech stock overvaluation',
        'Internet company failures',
        'NASDAQ crash',
        'Economic recession'
      ]
    },
    {
      id: '2010-flash-crash',
      name: '2010 Flash Crash',
      description: 'Simulate the May 6, 2010 flash crash',
      date: 'May 6, 2010',
      marketConditions: {
        vix: 40.95,
        sp500Drop: -9.1,
        sentiment: 'Algorithmic Panic',
        duration: '36 minutes'
      },
      keyEvents: [
        'Algorithmic trading malfunction',
        'High-frequency trading issues',
        'Market circuit breakers triggered',
        'Rapid recovery'
      ]
    }
  ];

  // Mock causal explanations
  const mockCausalExplanations = {
    tradeDecision: {
      action: 'BUY_PUTS',
      ticker: 'SPY',
      quantity: 50,
      reasoning: [
        'VIX exceeded 25.0 threshold, indicating elevated market volatility',
        'Sentiment analysis showed Bearish trend with 73% negative sentiment',
        'Risk model predicted 8.2% VaR breach within 30-day horizon',
        'Portfolio beta of 1.4 indicates high market sensitivity',
        'Historical correlation analysis showed 85% correlation with SPY during similar volatility periods'
      ],
      marketDrivers: [
        'Federal Reserve policy uncertainty',
        'Geopolitical tensions escalating',
        'Earnings season volatility',
        'Options expiration week effects',
        'Institutional rebalancing activities'
      ],
      confidence: 87.3,
      timestamp: new Date().toISOString()
    }
  };

  // Run stress test
  const runStressTest = async (scenarioId) => {
    setIsRunningStressTest(true);
    setStressTestResults(null);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    const scenario = stressScenarios.find(s => s.id === scenarioId);
    const mockResults = {
      scenario: scenario,
      portfolioImpact: {
        currentValue: 98456,
        stressedValue: Math.round(98456 * (1 + scenario.marketConditions.sp500Drop / 100)),
        lossAmount: Math.round(98456 * Math.abs(scenario.marketConditions.sp500Drop) / 100),
        lossPercentage: Math.abs(scenario.marketConditions.sp500Drop)
      },
      riskMetrics: {
        currentVar: 8500,
        stressedVar: Math.round(8500 * 2.5),
        currentBeta: 1.2,
        stressedBeta: 1.8,
        correlationIncrease: 0.35
      },
      hedgingEffectiveness: {
        withoutHedge: Math.round(98456 * Math.abs(scenario.marketConditions.sp500Drop) / 100),
        withHedge: Math.round(98456 * Math.abs(scenario.marketConditions.sp500Drop) * 0.3 / 100),
        protectionLevel: '70%',
        costBenefit: '3.2x'
      },
      recommendations: [
        'Increase SPY put options position by 25%',
        'Add VIX call options for volatility hedge',
        'Reduce high-beta positions by 15%',
        'Implement dynamic hedging strategy'
      ],
      timestamp: new Date().toISOString()
    };

    setStressTestResults(mockResults);
    setIsRunningStressTest(false);
  };

  // Generate causal explanations
  const generateCausalExplanations = async () => {
    setIsGeneratingExplanations(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCausalExplanations(mockCausalExplanations);
    setIsGeneratingExplanations(false);
  };

  // Load initial data
  useEffect(() => {
    generateCausalExplanations();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="main-container">
      {/* Animated Globe Background */}
      <AnimatedGlobe />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Page Content */}
      <div className="content-wrapper">
        <div style={{ padding: '2rem 1rem' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>🧠</div>
              <div>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  Dynamic Reasoning Agent
                </h1>
                <p style={{ 
                  fontSize: '1.125rem', 
                  color: '#d1d5db', 
                  marginBottom: '0'
                }}>
                  Advanced AI Reflection & Causal Analysis
                </p>
              </div>
            </div>
            
            {/* Navigation Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              <Link 
                to="/" 
                style={{ 
                  color: '#8b5cf6', 
                  textDecoration: 'none', 
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                Dashboard
              </Link>
              <span style={{ color: '#6b7280' }}>→</span>
              <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 500 }}>
                Reasoning Agent
              </span>
            </div>
            
            {/* Feature Description */}
            <div style={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              padding: '1.5rem', 
              backgroundColor: 'rgba(139, 92, 246, 0.1)', 
              borderRadius: '1rem', 
              border: '1px solid rgba(139, 92, 246, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Stress Testing</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Historical scenario simulation</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Causal Analysis</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Auditable decision explanations</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Loss Expectancy</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Quantified risk impact analysis</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Learning System</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Self-improving decision making</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Left Column - Stress Testing */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">🎯 Simulated Stress Testing</h2>
                <p className="card-subtitle">Historical scenario analysis</p>
              </div>
              
              <div style={{ padding: '1rem' }}>
                {/* Scenario Selection */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Select Historical Scenario</h3>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {stressScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => setSelectedScenario(scenario.id)}
                        style={{
                          padding: '1rem',
                          backgroundColor: selectedScenario === scenario.id ? 'rgba(139, 92, 246, 0.2)' : 'rgba(31, 41, 55, 0.5)',
                          border: selectedScenario === scenario.id ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid rgba(75, 85, 99, 0.3)',
                          borderRadius: '0.5rem',
                          color: '#ffffff',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                          {scenario.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          {scenario.date} • VIX: {scenario.marketConditions.vix} • S&P 500: {scenario.marketConditions.sp500Drop}%
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Run Stress Test Button */}
                <button
                  onClick={() => runStressTest(selectedScenario)}
                  disabled={isRunningStressTest}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: isRunningStressTest ? '#6b7280' : '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: isRunningStressTest ? 'not-allowed' : 'pointer',
                    marginBottom: '1.5rem'
                  }}
                >
                  {isRunningStressTest ? 'Running Stress Test...' : 'Run Stress Test'}
                </button>

                {/* Stress Test Results */}
                {stressTestResults && (
                  <div style={{ 
                    padding: '1.5rem', 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                    borderRadius: '0.75rem', 
                    border: '1px solid rgba(239, 68, 68, 0.3)' 
                  }}>
                    <h4 style={{ color: '#ef4444', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                      Loss Expectancy Report
                    </h4>
                    
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <div>
                        <h5 style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Portfolio Impact</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                          <div style={{ color: '#d1d5db' }}>Current Value: {formatCurrency(stressTestResults.portfolioImpact.currentValue)}</div>
                          <div style={{ color: '#ef4444' }}>Stressed Value: {formatCurrency(stressTestResults.portfolioImpact.stressedValue)}</div>
                          <div style={{ color: '#ef4444' }}>Loss Amount: {formatCurrency(stressTestResults.portfolioImpact.lossAmount)}</div>
                          <div style={{ color: '#ef4444' }}>Loss %: {stressTestResults.portfolioImpact.lossPercentage}%</div>
                        </div>
                      </div>

                      <div>
                        <h5 style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Hedging Effectiveness</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                          <div style={{ color: '#ef4444' }}>Without Hedge: {formatCurrency(stressTestResults.hedgingEffectiveness.withoutHedge)}</div>
                          <div style={{ color: '#10b981' }}>With Hedge: {formatCurrency(stressTestResults.hedgingEffectiveness.withHedge)}</div>
                          <div style={{ color: '#10b981' }}>Protection: {stressTestResults.hedgingEffectiveness.protectionLevel}</div>
                          <div style={{ color: '#10b981' }}>Cost/Benefit: {stressTestResults.hedgingEffectiveness.costBenefit}</div>
                        </div>
                      </div>

                      <div>
                        <h5 style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Recommendations</h5>
                        <div style={{ fontSize: '0.75rem', color: '#d1d5db' }}>
                          {stressTestResults.recommendations.map((rec, index) => (
                            <div key={index} style={{ marginBottom: '0.25rem' }}>
                              • {rec}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Causal Explanations */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">🔍 Causal Explanation & Auditability</h2>
                <p className="card-subtitle">AI decision reasoning</p>
              </div>
              
              <div style={{ padding: '1rem' }}>
                {/* Generate Explanations Button */}
                <button
                  onClick={generateCausalExplanations}
                  disabled={isGeneratingExplanations}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: isGeneratingExplanations ? '#6b7280' : '#ec4899',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: isGeneratingExplanations ? 'not-allowed' : 'pointer',
                    marginBottom: '1.5rem'
                  }}
                >
                  {isGeneratingExplanations ? 'Generating Explanations...' : 'Generate Causal Explanations'}
                </button>

                {/* Causal Explanations Results */}
                {causalExplanations && (
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {/* Trade Decision */}
                    <div style={{ 
                      padding: '1.5rem', 
                      backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                      borderRadius: '0.75rem', 
                      border: '1px solid rgba(16, 185, 129, 0.3)' 
                    }}>
                      <h4 style={{ color: '#10b981', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                        Trade Decision Analysis
                      </h4>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                          <strong>Action:</strong> {causalExplanations.tradeDecision.action} {causalExplanations.tradeDecision.quantity} {causalExplanations.tradeDecision.ticker}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '0.5rem' }}>
                          Confidence: {causalExplanations.tradeDecision.confidence}%
                        </div>
                      </div>

                      <div>
                        <h5 style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Five-Point Reasoning Summary</h5>
                        <div style={{ fontSize: '0.75rem', color: '#d1d5db' }}>
                          {causalExplanations.tradeDecision.reasoning.map((reason, index) => (
                            <div key={index} style={{ marginBottom: '0.5rem', paddingLeft: '1rem', position: 'relative' }}>
                              <span style={{ 
                                position: 'absolute', 
                                left: '0', 
                                color: '#10b981', 
                                fontWeight: 'bold' 
                              }}>
                                {index + 1}.
                              </span>
                              {reason}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Market Drivers */}
                    <div style={{ 
                      padding: '1.5rem', 
                      backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                      borderRadius: '0.75rem', 
                      border: '1px solid rgba(59, 130, 246, 0.3)' 
                    }}>
                      <h4 style={{ color: '#3b82f6', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                        Market Drivers Analysis
                      </h4>
                      
                      <div style={{ fontSize: '0.75rem', color: '#d1d5db' }}>
                        {causalExplanations.tradeDecision.marketDrivers.map((driver, index) => (
                          <div key={index} style={{ 
                            marginBottom: '0.5rem', 
                            padding: '0.5rem', 
                            backgroundColor: 'rgba(31, 41, 55, 0.5)', 
                            borderRadius: '0.25rem',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                          }}>
                            <span style={{ color: '#3b82f6', fontWeight: '600' }}>
                              Driver {index + 1}:
                            </span> {driver}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Audit Trail */}
                    <div style={{ 
                      padding: '1.5rem', 
                      backgroundColor: 'rgba(107, 114, 128, 0.1)', 
                      borderRadius: '0.75rem', 
                      border: '1px solid rgba(107, 114, 128, 0.3)' 
                    }}>
                      <h4 style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                        Audit Trail
                      </h4>
                      
                      <div style={{ fontSize: '0.75rem', color: '#d1d5db' }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Generated:</strong> {new Date(causalExplanations.tradeDecision.timestamp).toLocaleString()}
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Model Version:</strong> Reasoning Agent v2.1.3
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Data Sources:</strong> Market Data, Risk Metrics, Historical Analysis
                        </div>
                        <div>
                          <strong>Compliance:</strong> SOX, MiFID II, Basel III
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasoningAgentPage;
