import os
import json
import traceback
import google.generativeai as genai
from dotenv import load_dotenv

# --- RESILIENT IMPORT BLOCK ---
# Import the correct ADK Agent class
from google.adk import Agent as ADKAgentBase
from google.adk.events import Event
print("INFO: Imported Agent from 'google.adk'.")

# Use relative imports because this file is inside the 'src' package
from .agents.ingestion_agent import IngestionAgent
from .agents.risk_agent import RiskAgent
from .agents.strategy_agent import StrategyAgent
from .agents.execution_agent import ExecutionAgent
from .tools.brokerage_simulator import BrokerageSimulator

# --- ADK Agent instance approach ---
class QuantHedgeAgent(ADKAgentBase):
    """
    QuantHedge Autonomous Hedging Agent for ADK
    """
    
    def __init__(self):
        super().__init__(
            name="QuantHedgeAgent",
            description="Autonomous hedging system for portfolio risk management",
            model="gemini-2.0-flash"
        )
        print("QuantHedgeAgent initialized for ADK")

    async def run_async(self, ctx):
        """
        Execute the autonomous hedging cycle
        """
        # Extract user message from context
        user_message = ""
        if hasattr(ctx, 'user_content') and ctx.user_content:
            user_message = ctx.user_content.parts[0].text if ctx.user_content.parts else ""
        
        print(f"[QuantHedge] Processing request: '{user_message}'")
        
        try:
            # Initialize components
            brokerage = BrokerageSimulator(initial_cash=100000.0)
            ingestion_agent = IngestionAgent()
            risk_agent = RiskAgent()
            strategy_agent = StrategyAgent()
            execution_agent = ExecutionAgent(brokerage=brokerage)
            
            # Get current portfolio
            portfolio_data = brokerage.get_portfolio()
            
            # Run the autonomous hedging cycle
            print("[QuantHedge] Starting autonomous hedging cycle...")
            
            # Step 1: Market data ingestion
            market_data = ingestion_agent.ingest_market_data()
            print(f"[QuantHedge] Market data: VIX={market_data.get('vix')}, Sentiment={market_data.get('sentiment')}")
            
            # Step 2: Risk analysis
            risk_report = risk_agent.calculate_portfolio_risk(
                market_data=market_data, portfolio=portfolio_data
            )
            print(f"[QuantHedge] Risk analysis: Beta={risk_report.get('beta')}, VaR=${risk_report.get('var_95'):,.0f}")
            
            # Step 3: Strategy generation
            strategy_command = strategy_agent.generate_hedging_plan(
                risk_report=risk_report, market_data=market_data
            )
            action = strategy_command.get('action', 'NONE').upper()
            print(f"[QuantHedge] Strategy: {action} {strategy_command.get('quantity', '')} of {strategy_command.get('ticker', '')}")
            
            # Step 4: Trade execution (if needed)
            trade_report = {"status": "NO_TRADE_NEEDED"}
            if action not in ['NONE', 'NO ACTION NEEDED', 'HOLD']:
                trade_report = execution_agent.execute_trade(strategy_command)
                print(f"[QuantHedge] Trade execution: {trade_report.get('status')}")
            
            # Prepare comprehensive response
            final_portfolio = brokerage.get_portfolio()
            
            # Format response for user
            response_text = f"""
🤖 **QuantHedge Autonomous Hedging Analysis Complete**

📊 **Market Conditions:**
- VIX Level: {market_data.get('vix', 'N/A')}
- Market Sentiment: {market_data.get('sentiment', 'N/A').title()}
- S&P 500 Performance: {market_data.get('sp500_performance', 0)*100:.2f}%

🔍 **Portfolio Risk Assessment:**
- Portfolio Beta: {risk_report.get('beta', 'N/A')}
- Value at Risk (95%): ${risk_report.get('var_95', 0):,.2f}
- Exposed Assets: {', '.join(risk_report.get('exposed_assets', []))}

🎯 **Hedging Strategy:**
- Action: {strategy_command.get('action', 'NONE')}
- Ticker: {strategy_command.get('ticker', 'N/A')}
- Quantity: {strategy_command.get('quantity', 'N/A')}
- Reasoning: {strategy_command.get('reasoning', 'N/A')}

💼 **Trade Execution:**
- Status: {trade_report.get('status', 'NO_TRADE_NEEDED')}

💰 **Portfolio Summary:**
- Initial Cash: ${portfolio_data.get('cash', 0):,.2f}
- Final Cash: ${final_portfolio.get('cash', 0):,.2f}
- Total Holdings: {len(final_portfolio.get('holdings', {}))} positions
- Portfolio Value: ${final_portfolio.get('total_value', 0):,.2f}

✅ **Hedging cycle completed successfully!**
"""
            
            print("[QuantHedge] Autonomous hedging cycle completed successfully")
            
            # Create proper Event object for ADK
            from google.adk.events import Event
            from google.genai.types import Content, Part
            
            yield Event(
                content=Content(
                    parts=[Part(text=response_text)],
                    role="assistant"
                ),
                partial=False,
                author="assistant"
            )
            
        except Exception as e:
            error_msg = f"Error in hedging cycle: {str(e)}"
            print(f"[QuantHedge] ERROR: {error_msg}")
            error_trace = traceback.format_exc()
            print(f"[QuantHedge] Traceback: {error_trace}")
            
            error_response = f"""
❌ **QuantHedge Error**

Error: {error_msg}

The autonomous hedging system encountered an issue. Please check the logs for details.
"""
            
            # Create proper Event object for error response
            from google.adk.events import Event
            from google.genai.types import Content, Part
            
            yield Event(
                content=Content(
                    parts=[Part(text=error_response)],
                    role="assistant"
                ),
                partial=False,
                author="assistant"
            )


# --- EXPOSE THE ROOT AGENT FOR THE ADK ---
try:
    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key: 
        raise ValueError("GEMINI_API_KEY not found.")
    genai.configure(api_key=api_key)
    
    # Create the root agent instance
    root_agent = QuantHedgeAgent()
    print("QuantHedge agent instance created successfully for ADK.")
except Exception as e:
    print(f"FATAL: Failed to configure QuantHedge agent.")
    traceback.print_exc()
    root_agent = None

