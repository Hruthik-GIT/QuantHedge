import React from 'react';
import { Link } from 'react-router-dom';
import HITLGovernance from '../components/HITLGovernance';
import Navbar from '../components/Navbar';
import AnimatedGlobe from '../components/AnimatedGlobe';

const HITLPage = () => {
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
              <div style={{ fontSize: '3rem' }}>🎛️</div>
              <div>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  HITL Governance
                </h1>
                <p style={{ 
                  fontSize: '1.125rem', 
                  color: '#d1d5db', 
                  marginBottom: '0'
                }}>
                  Human-in-the-Loop Control Center
                </p>
              </div>
            </div>
            
            {/* Navigation Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              <Link 
                to="/" 
                style={{ 
                  color: '#3b82f6', 
                  textDecoration: 'none', 
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                Dashboard
              </Link>
              <span style={{ color: '#6b7280' }}>→</span>
              <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 500 }}>
                HITL Governance
              </span>
            </div>
            
            {/* Feature Description */}
            <div style={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              padding: '1.5rem', 
              backgroundColor: 'rgba(31, 41, 55, 0.5)', 
              borderRadius: '1rem', 
              border: '1px solid rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>AI Analysis</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Automated risk assessment and strategy generation</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚖️</div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Risk Assessment</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Threshold-based evaluation and approval requirements</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Human Control</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Manual approval for high-risk trading decisions</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                  <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Audit Trail</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Complete decision history and compliance tracking</p>
                </div>
              </div>
              
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                borderRadius: '0.5rem', 
                border: '1px solid rgba(59, 130, 246, 0.3)',
                marginTop: '1rem'
              }}>
                <h4 style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  🎯 How It Works
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', fontSize: '0.75rem', color: '#d1d5db' }}>
                  <div>1. AI generates trading strategy</div>
                  <div>2. Risk metrics calculated</div>
                  <div>3. Threshold evaluation</div>
                  <div>4. Human approval if needed</div>
                  <div>5. Trade execution</div>
                  <div>6. Audit trail updated</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* HITL Governance Component */}
          <HITLGovernance />
          
          {/* Footer */}
          <div style={{ 
            marginTop: '2rem', 
            textAlign: 'center', 
            padding: '2rem', 
            backgroundColor: 'rgba(31, 41, 55, 0.3)', 
            borderRadius: '1rem', 
            border: '1px solid rgba(75, 85, 99, 0.2)'
          }}>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Risk Thresholds
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ color: '#ef4444' }}>
                <strong>Max Trade Size:</strong> 5% of AUM
              </div>
              <div style={{ color: '#f59e0b' }}>
                <strong>Max VaR Impact:</strong> $10,000
              </div>
              <div style={{ color: '#10b981' }}>
                <strong>Max Beta Change:</strong> 1.5
              </div>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '1rem' }}>
              Trades exceeding these thresholds require human approval for execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HITLPage;
