"""
QuantHedge Firebase Functions
Autonomous Hedging System Backend API
"""

import os
import json
import traceback
from datetime import datetime
from flask import Flask, request, jsonify
from firebase_admin import initialize_app, credentials
import google.generativeai as genai
from dotenv import load_dotenv

# Import our QuantHedge components
import sys
sys.path.append('/workspace')
from src.agents.ingestion_agent import IngestionAgent
from src.agents.risk_agent import RiskAgent
from src.agents.strategy_agent import StrategyAgent
from src.agents.execution_agent import ExecutionAgent
from src.tools.brokerage_simulator import BrokerageSimulator

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase Admin (if not already initialized)
try:
    if not initialize_app():
        # Use default credentials in Firebase environment
        cred = credentials.ApplicationDefault()
        initialize_app(cred)
except ValueError:
    # Already initialized
    pass

# Load environment variables
load_dotenv()

# Configure Gemini API
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    # Try to get from Firebase environment
    api_key = os.environ.get("GEMINI_API_KEY")
    
if api_key:
    genai.configure(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY not found. Some features may not work.")

class QuantHedgeAPI:
    """QuantHedge API handler for Firebase Functions"""
    
    def __init__(self):
        self.brokerage = None
        self.ingestion_agent = None
        self.risk_agent = None
        self.strategy_agent = None
        self.execution_agent = None
        
    def initialize_agents(self):
        """Initialize all agents"""
        if not self.brokerage:
            self.brokerage = BrokerageSimulator(initial_cash=100000.0)
            self.ingestion_agent = IngestionAgent()
            self.risk_agent = RiskAgent()
            self.strategy_agent = StrategyAgent()
            self.execution_agent = ExecutionAgent(brokerage=self.brokerage)
            print("QuantHedge agents initialized")
    
    def execute_hedging_cycle(self, prompt: str) -> dict:
        """Execute the complete autonomous hedging cycle"""
        try:
            self.initialize_agents()
            
            print(f"[QuantHedge API] Processing request: '{prompt}'")
            
            # Get current portfolio
            portfolio_data = self.brokerage.get_portfolio()
            
            # Run the autonomous hedging cycle
            print("[QuantHedge API] Starting autonomous hedging cycle...")
            
            # Step 1: Market data ingestion
            market_data = self.ingestion_agent.ingest_market_data()
            print(f"[QuantHedge API] Market data: VIX={market_data.get('vix')}, Sentiment={market_data.get('sentiment')}")
            
            # Step 2: Risk analysis
            risk_report = self.risk_agent.calculate_portfolio_risk(
                market_data=market_data, portfolio=portfolio_data
            )
            print(f"[QuantHedge API] Risk analysis: Beta={risk_report.get('beta')}, VaR=${risk_report.get('var_95'):,.0f}")
            
            # Step 3: Strategy generation
            strategy_command = self.strategy_agent.generate_hedging_plan(
                risk_report=risk_report, market_data=market_data
            )
            action = strategy_command.get('action', 'NONE').upper()
            print(f"[QuantHedge API] Strategy: {action} {strategy_command.get('quantity', '')} of {strategy_command.get('ticker', '')}")
            
            # Step 4: Trade execution (if needed)
            trade_report = {"status": "NO_TRADE_NEEDED"}
            if action not in ['NONE', 'NO ACTION NEEDED', 'HOLD']:
                trade_report = self.execution_agent.execute_trade(strategy_command)
                print(f"[QuantHedge API] Trade execution: {trade_report.get('status')}")
            
            # Prepare comprehensive response
            final_portfolio = self.brokerage.get_portfolio()
            
            response = {
                "status": "success",
                "message": "QuantHedge Autonomous Hedging Analysis Complete",
                "data": {
                    "market_conditions": {
                        "vix_level": market_data.get('vix', 'N/A'),
                        "sentiment": market_data.get('sentiment', 'N/A').title(),
                        "sp500_performance": f"{market_data.get('sp500_performance', 0)*100:.2f}%"
                    },
                    "risk_assessment": {
                        "portfolio_beta": risk_report.get('beta', 'N/A'),
                        "value_at_risk_95": f"${risk_report.get('var_95', 0):,.2f}",
                        "exposed_assets": risk_report.get('exposed_assets', [])
                    },
                    "hedging_strategy": {
                        "action": strategy_command.get('action', 'NONE'),
                        "ticker": strategy_command.get('ticker', 'N/A'),
                        "quantity": strategy_command.get('quantity', 'N/A'),
                        "reasoning": strategy_command.get('reasoning', 'N/A')
                    },
                    "trade_execution": {
                        "status": trade_report.get('status', 'NO_TRADE_NEEDED')
                    },
                    "portfolio_summary": {
                        "initial_cash": f"${portfolio_data.get('cash', 0):,.2f}",
                        "final_cash": f"${final_portfolio.get('cash', 0):,.2f}",
                        "total_holdings": len(final_portfolio.get('holdings', {})),
                        "portfolio_value": f"${final_portfolio.get('total_value', 0):,.2f}"
                    }
                },
                "timestamp": str(datetime.now().isoformat())
            }
            
            print("[QuantHedge API] Autonomous hedging cycle completed successfully")
            return response
            
        except Exception as e:
            error_msg = f"Error in hedging cycle: {str(e)}"
            print(f"[QuantHedge API] ERROR: {error_msg}")
            error_trace = traceback.format_exc()
            print(f"[QuantHedge API] Traceback: {error_trace}")
            
            return {
                "status": "error",
                "message": "QuantHedge Error",
                "error": error_msg,
                "timestamp": str(datetime.now().isoformat())
            }

# Initialize the API handler
quanthedge_api = QuantHedgeAPI()

@app.route('/api/analyze', methods=['POST'])
def analyze_portfolio():
    """Analyze portfolio endpoint"""
    try:
        data = request.get_json()
        prompt = data.get('prompt', 'analyze my portfolio')
        
        result = quanthedge_api.execute_hedging_cycle(prompt)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Internal server error",
            "error": str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "QuantHedge API is running",
        "timestamp": str(datetime.now().isoformat())
    })

@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        "message": "QuantHedge Autonomous Hedging API",
        "version": "1.0.0",
        "endpoints": {
            "analyze": "/api/analyze",
            "health": "/api/health"
        }
    })

# Firebase Functions entry point
def quanthedge_api(request):
    """Firebase Functions entry point"""
    return app(request.environ, lambda *args: None)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
