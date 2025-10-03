import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="navbar-logo">
              <svg width="20" height="20" fill="white" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="navbar-title">
              HedgeGuard AI
            </h1>
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
