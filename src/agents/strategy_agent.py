import json
import google.generativeai as genai  # CORRECTED IMPORT
from src.tools.data_contracts import HedgingInstruction

class StrategyAgent:
    """
    Decides on a hedging strategy based on risk analysis and market data.
    """

    def __init__(self):
        self.model = genai.GenerativeModel(model_name='gemini-2.0-flash')
        self.system_prompt = (
            "You are a Hedge Fund Strategist. Your goal is to protect the portfolio from downside risk. "
            "Based on the provided data, decide on a single, clear action. Your output must be a raw JSON object "
            "with this structure: {'action': <'BUY'|'SELL'|'HOLD'>, 'ticker': <'SPY'|stock_symbol|'NONE'>, "
            "'quantity': <int>, 'reasoning': <str>}. 'ticker' should be 'SPY' for broad market hedges."
        )
        print("StrategyAgent initialized.")

    def generate_hedging_plan(self, risk_report: dict, market_data: dict) -> dict:
        """
        Generates a specific hedging instruction based on the current risk and market.
        """
        print("  [StrategyAgent] Formulating hedging strategy...")
        try:
            prompt = (
                f"Market conditions: {json.dumps(market_data)}. Portfolio risk profile: {json.dumps(risk_report)}. "
                "The portfolio beta is high. A common hedge is to short the broader market (simulated by selling SPY). "
                "Formulate a plan to reduce market exposure. Provide the output as a raw JSON object."
            )
            
            response = self.model.generate_content([self.system_prompt, prompt])
            response_text = response.text.strip().replace("```json", "").replace("```", "").strip()
            instruction_json = json.loads(response_text)
            validated_data = HedgingInstruction(**instruction_json)
            print(f"  [StrategyAgent] Strategy decided: {validated_data.action} {validated_data.quantity} of {validated_data.ticker}.")
            return validated_data.dict()

        except Exception as e:
            print(f"  [StrategyAgent] ERROR: Could not generate strategy: {e}. Using fallback data.")
            return {"action": "SELL", "ticker": "SPY", "quantity": 100, "reasoning": "Fallback due to error."}

