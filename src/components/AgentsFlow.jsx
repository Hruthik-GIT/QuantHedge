import React from 'react';

const AgentsFlow = ({ agentStatuses, simulationStep, isSimulationRunning }) => {
  const agents = [
    {
      id: 'data-ingestion',
      name: 'Data Ingestion',
      description: 'Collecting market data and portfolio information',
      icon: '📊',
      step: 1
    },
    {
      id: 'risk-analysis',
      name: 'Risk Analysis',
      description: 'Analyzing portfolio risk metrics and exposures',
      icon: '⚠️',
      step: 2
    },
    {
      id: 'strategy',
      name: 'Strategy',
      description: 'Generating hedge strategies and recommendations',
      icon: '🎯',
      step: 3
    },
    {
      id: 'execution',
      name: 'Execution',
      description: 'Executing trades and hedge positions',
      icon: '⚡',
      step: 4
    }
  ];

  const getAgentStatus = (agentStep) => {
    if (simulationStep === 0) return 'pending';
    if (simulationStep < agentStep) return 'pending';
    if (simulationStep === agentStep) {
      // If we're at the execution step (step 4) and simulation is not running, mark as complete
      if (simulationStep === 4 && agentStep === 4 && !isSimulationRunning) {
        return 'complete';
      }
      return 'running';
    }
    return 'complete';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 border-gray-300';
      case 'running':
        return 'bg-blue-100 border-blue-500 shadow-lg';
      case 'complete':
        return 'bg-green-100 border-green-500';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'running':
        return '🔄';
      case 'complete':
        return '✅';
      default:
        return '⏳';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'running':
        return 'Running';
      case 'complete':
        return 'Complete';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">AI Agents Flow</h2>
        <p className="card-subtitle">Real-time agent execution pipeline</p>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        {agents.map((agent, index) => {
          const status = getAgentStatus(agent.step);
          const isActive = status === 'running';
          
          return (
            <div key={agent.id} style={{position: 'relative'}}>
              {/* Connection Line */}
              {index < agents.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '1.5rem',
                  top: '4rem',
                  width: '2px',
                  height: '2rem',
                  backgroundColor: '#d1d5db'
                }}></div>
              )}
              
              {/* Agent Card */}
              <div className={`agent-card ${status}`}>
                <div className="agent-content">
                  {/* Agent Icon */}
                  <div className={`agent-icon ${status}`}>
                    {status === 'running' ? (
                      <div style={{color: 'white'}}>🔄</div>
                    ) : (
                      <span>{agent.icon}</span>
                    )}
                  </div>

                  {/* Agent Info */}
                  <div className="agent-info">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <h3 className="agent-name" style={{fontSize: '1.2rem', fontWeight: 700, color: '#000000'}}>{agent.name}</h3>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <span style={{fontSize: '0.875rem', fontWeight: 500, color: '#6b7280'}}>
                          {getStatusText(status)}
                        </span>
                        <span style={{fontSize: '1.125rem'}}>{getStatusIcon(status)}</span>
                      </div>
                    </div>
                    <p className="agent-description" style={{fontSize: '0.95rem', color: '#374151', lineHeight: '1.4'}}>{agent.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="progress-bar">
                      <div className={`progress-fill ${status}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{Math.max(0, simulationStep - 1)}/4 Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${(Math.max(0, simulationStep - 1) / 4) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AgentsFlow;
