import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="navbar-logo">
                <svg width="20" height="20" fill="white" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="navbar-title">
                BAU Quantum Hedge
              </h1>
            </Link>
          </div>
          
          <div className="navbar-nav">
            <Link 
              to="/" 
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: location.pathname === '/' ? '#ffffff' : '#9ca3af',
                backgroundColor: location.pathname === '/' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                border: location.pathname === '/' ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
            >
              📊 Dashboard
            </Link>
            
                <Link
                  to="/hitl-governance"
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    color: location.pathname === '/hitl-governance' ? '#ffffff' : '#9ca3af',
                    backgroundColor: location.pathname === '/hitl-governance' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                    border: location.pathname === '/hitl-governance' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid transparent',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  🎛️ HITL Governance
                </Link>

                <Link
                  to="/reasoning-agent"
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    color: location.pathname === '/reasoning-agent' ? '#ffffff' : '#9ca3af',
                    backgroundColor: location.pathname === '/reasoning-agent' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                    border: location.pathname === '/reasoning-agent' ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  🧠 Reasoning Agent
                </Link>
          </div>
          
          <div className="navbar-status">
            <div className="navbar-text">
              Real-time Portfolio Protection
            </div>
            <div className="status-indicator"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
