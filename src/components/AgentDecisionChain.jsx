import React from 'react';

const AgentDecisionChain = ({ decisions, isVisible, currentStep }) => {
  if (!isVisible) {
    return null;
  }

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getLogEntries = () => {
    const baseTime = new Date();
    const entries = [];
    
    // Orchestrator Agent - New Hedging Cycle Started
    if (currentStep >= 1) {
      entries.push({
        time: new Date(baseTime.getTime() - 4000).toLocaleTimeString('en-US', { hour12: false }),
        agent: 'Orchestrator Agent',
        message: '--- New Hedging Cycle Started ---',
        type: 'info'
      });
    }

    // Data Ingestion Agent
    if (currentStep >= 1) {
      entries.push({
        time: new Date(baseTime.getTime() - 3500).toLocaleTimeString('en-US', { hour12: false }),
        agent: 'Orchestrator Agent',
        message: 'Delegating to Data Ingestion Agent: Market perception...',
        type: 'delegation'
      });
      
      entries.push({
        time: new Date(baseTime.getTime() - 3000).toLocaleTimeString('en-US', { hour12: false }),
        agent: 'Data Ingestion Agent',
        message: 'Perception Complete: VIX=14.25, Sentiment=Neutral.',
        type: 'success'
      });
    }

    // Risk Analysis Agent
    if (currentStep >= 2) {
      entries.push({
        time: new Date(baseTime.getTime() - 2500).toLocaleTimeString('en-US', { hour12: false }),
        agent: 'Orchestrator Agent',
        message: 'Delegating to Risk Analysis Agent: Calculating exposure...',
        type: 'delegation'
      });
      
      entries.push({
        time: new Date(baseTime.getTime() - 2000).toLocaleTimeString('en-US', { hour12: false }),
        agent: 'Risk Analysis Agent',
        message: 'Analysis Complete: Risk Score=49.63, Exposure=Balanced.',
        type: 'success'
      });
    }

    // Strategy Agent
    if (currentStep >= 3) {
      entries.push({
        time: new Date(baseTime.getTime() - 1500).toLocaleTimeString('en-US', { hour12: false }),
        agent: 'Orchestrator Agent',
        message: 'Delegating to Strategy Agent: Generating hedging plan...',
        type: 'delegation'
      });
      
      entries.push({
        time: new Date(baseTime.getTime() - 1000).toLocaleTimeString('en-US', { hour12: false }),
        agent: 'Strategy Agent',
        message: 'Hedging Decision: Action=NONE. Reason: Market conditions are stable or within acceptable risk parameters. NO ACTION NEEDED.',
        type: 'warning'
      });
    }

    // Execution Agent
    if (currentStep >= 4) {
      entries.push({
        time: new Date(baseTime.getTime() - 500).toLocaleTimeString('en-US', { hour12: false }),
        agent: 'Orchestrator Agent',
        message: 'Delegating to Execution Agent: Processing recommendations...',
        type: 'delegation'
      });
      
      entries.push({
        time: getCurrentTime(),
        agent: 'Execution Agent',
        message: 'Execution Complete: No trades executed. Portfolio remains unchanged.',
        type: 'success'
      });
    }

    return entries;
  };

  const getMessageStyle = (type) => {
    switch (type) {
      case 'success':
        return 'terminal-success';
      case 'warning':
        return 'terminal-warning';
      case 'delegation':
        return 'terminal-delegation';
      case 'info':
        return 'terminal-info';
      default:
        return 'terminal-default';
    }
  };

  const logEntries = getLogEntries();

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">Agent Decision Chain (Traceability)</div>
      </div>
      
      <div className="terminal-body">
        {logEntries.map((entry, index) => (
          <div key={index} className={`terminal-line ${getMessageStyle(entry.type)}`}>
            <span className="terminal-timestamp">[{entry.time}]</span>
            <span className="terminal-agent">{entry.agent}:</span>
            <span className="terminal-message">{entry.message}</span>
          </div>
        ))}
        
        {currentStep > 0 && currentStep <= 4 && (
          <div className="terminal-line terminal-cursor">
            <span className="terminal-prompt">$</span>
            <span className="blinking-cursor">_</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDecisionChain;