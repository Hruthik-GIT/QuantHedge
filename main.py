import os
import json
import google.generativeai as genai
from src.root_agent import OrchestratorAgent
from src.tools.brokerage_simulator import BrokerageSimulator

# --- CONFIGURATION & INITIALIZATION ---
if "GEMINI_API_KEY" not in os.environ:
    raise ValueError("GEMINI_API_KEY environment variable not set.")
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# --- SHARED DATA LAYER (Simulated Brokerage) ---
PORTFOLIO_MANAGER = BrokerageSimulator(initial_cash=100000.0)
print("BrokerageSimulator initialized.")
print(f"Initial Portfolio: {json.dumps(PORTFOLIO_MANAGER.get_portfolio(), indent=2)}")

def run_full_cycle():
    """
    Initializes the agents and runs the complete hedging workflow.
    """
    print("="*50)
    print("🚀 INITIALIZING ARGUS - AUTONOMOUS HEDGING SYSTEM 🚀")
    print("="*50)

    # CORRECTED LINE: Pass the brokerage simulator to the orchestrator
    orchestrator = OrchestratorAgent(brokerage=PORTFOLIO_MANAGER)

    current_portfolio = PORTFOLIO_MANAGER.get_portfolio()
    print("\n--- Current Portfolio State ---")
    print(json.dumps(current_portfolio, indent=2))
    print("-" * 30)

    print("\n[MAIN] Handing control to Orchestrator Agent...")
    final_report = orchestrator.run_hedging_cycle(portfolio_data=current_portfolio)
    print("[MAIN]...Orchestrator Agent has completed its cycle.")

    print("\n--- Final Hedging Cycle Report ---")
    print(json.dumps(final_report, indent=2))
    print("-" * 30)
    
    print("\n--- Portfolio State After Hedging Cycle ---")
    print(json.dumps(PORTFOLIO_MANAGER.get_portfolio(), indent=2))
    print("="*50)
    print("✅ ARGUS HEDGING CYCLE COMPLETE")
    print("="*50)

if __name__ == "__main__":
    run_full_cycle()

