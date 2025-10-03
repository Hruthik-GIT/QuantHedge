import { useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AgentsFlow from './components/AgentsFlow'
import Results from './components/Results'
import AgentDecisionChain from './components/AgentDecisionChain'
import AnimatedGlobe from './components/AnimatedGlobe'
import './styles.css'

function App() {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [showDecisionChain, setShowDecisionChain] = useState(false)

  const runHedgeSimulation = async (holdings) => {
    setIsSimulationRunning(true)
    setSimulationStep(0)
    setResults(null)
    setShowResults(false)
    setShowDecisionChain(true)

    try {
      // Simulate the agent flow with delays
      const delays = [1000, 2000, 3000, 4000] // 1s, 2s, 3s, 4s delays
      
      for (let i = 1; i <= 4; i++) {
        setTimeout(() => {
          setSimulationStep(i)
        }, delays[i - 1])
      }

      // Make API call to backend
      setTimeout(async () => {
        try {
          const response = await axios.post('http://localhost:8000/run-hedge', {
            holdings: holdings
          })
          
          setResults(response.data)
          setShowResults(true)
          setSimulationStep(5)
        } catch (error) {
          console.error('API call failed:', error)
          
          // Fallback with mock data if API fails
          const mockResults = {
            risk: {
              VaR: -12000,
              Beta: 1.45,
              exposure: "Overexposed to TSLA"
            },
            strategy: [
              "Short 100 TSLA shares",
              "Buy 10 SPY PUT options"
            ],
            execution: {
              status: "Executed",
              details: [
                "Shorted 100 TSLA @ 249.0",
                "Bought 10 SPY PUTs"
              ]
            }
          }
          
          setResults(mockResults)
          setShowResults(true)
          setSimulationStep(5)
        }
        
        setIsSimulationRunning(false)
      }, 5000) // Wait for all agents to complete

    } catch (error) {
      console.error('Simulation failed:', error)
      setIsSimulationRunning(false)
      setSimulationStep(0)
    }
  }

  return (
    <div className="main-container">
      <AnimatedGlobe />
      <Navbar />
      
      <div className="content-wrapper">
        {/* Top Section - Dashboard and Agents Flow Side by Side */}
        <div className="top-section">
          <div className="dashboard-agents-grid">
            {/* Left: Portfolio Dashboard */}
            <div className="dashboard-column">
              <Dashboard 
                onRunSimulation={runHedgeSimulation}
                isSimulationRunning={isSimulationRunning}
              />
            </div>

            {/* Right: AI Agents Flow */}
            <div className="agents-column">
              <AgentsFlow 
                simulationStep={simulationStep}
              />
            </div>
          </div>
        </div>

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
      </div>
    </div>
  )
}

export default App
