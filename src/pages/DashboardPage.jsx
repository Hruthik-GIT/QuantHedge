import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../components/Dashboard';
import AgentsFlow from '../components/AgentsFlow';
import Results from '../components/Results';
import AgentDecisionChain from '../components/AgentDecisionChain';
import ApiTest from '../components/ApiTest';
import Navbar from '../components/Navbar';
import AnimatedGlobe from '../components/AnimatedGlobe';

const DashboardPage = () => {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showDecisionChain, setShowDecisionChain] = useState(false);

  const runHedgeSimulation = async (holdings) => {
    setIsSimulationRunning(true);
    setSimulationStep(0);
    setResults(null);
    setShowResults(false);
    setShowDecisionChain(true);

    try {
      // Simulate the agent flow with delays
      const delays = [1000, 2000, 3000, 4000]; // 1s, 2s, 3s, 4s delays
      
      for (let i = 1; i <= 4; i++) {
        setTimeout(() => {
          setSimulationStep(i);
          if (i === 4) {
            setIsSimulationRunning(false);
            setShowDecisionChain(false);
            setShowResults(true);
            
            // Generate mock results
            setResults({
              initialValue: 98456,
              finalValue: 101234,
              totalReturn: 2778,
              returnPercentage: 2.82,
              hedgingCost: 1200,
              riskReduction: 15.3,
              tradesExecuted: [
                {
                  type: 'BUY_PUTS',
                  ticker: 'SPY',
                  quantity: 10,
                  strikePrice: 420,
                  premium: 1200,
                  expiration: '2024-02-16'
                }
              ],
              riskMetrics: {
                initialVar: 8500,
                finalVar: 7200,
                betaChange: -0.15,
                sharpeRatio: 1.42
              }
            });
          }
        }, delays[i-1]);
      }
    } catch (error) {
      console.error('Simulation error:', error);
      setIsSimulationRunning(false);
      setShowDecisionChain(false);
    }
  };

  return (
    <div className="main-container">
      {/* Animated Globe Background */}
      <AnimatedGlobe />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Page Content */}
      <div className="content-wrapper">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1rem' }}>
          {/* Left Column */}
          <div>
            <Dashboard 
              onRunSimulation={runHedgeSimulation}
              isSimulationRunning={isSimulationRunning}
            />
          </div>

          {/* Right Column */}
          <div>
            <AgentsFlow 
              simulationStep={simulationStep}
              isSimulationRunning={isSimulationRunning}
            />
          </div>
        </div>

        {/* Full Width Components */}
        <div style={{ padding: '1rem' }}>
          {/* Agent Decision Chain - Full Width Horizontal */}
          {showDecisionChain && (
            <div className="decision-chain-section">
              <AgentDecisionChain 
                isVisible={showDecisionChain}
                currentStep={simulationStep}
              />
            </div>
          )}

          {/* Results - Full Width Horizontal */}
          {showResults && (
            <div className="results-section">
              <Results 
                results={results}
                isVisible={showResults}
              />
            </div>
          )}

          {/* API Test Component */}
          <ApiTest />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
