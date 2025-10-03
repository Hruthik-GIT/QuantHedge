import json
import google.generativeai as genai  # CORRECTED IMPORT
from src.tools.data_contracts import RiskReport

class RiskAgent:
    """
    Performs risk analysis on a portfolio using an LLM.
    """

    def __init__(self):
        self.model = genai.GenerativeModel(model_name='gemini-2.0-flash')
        self.system_prompt = (
            "You are a Quantitative Risk Analyst. Given market and portfolio data, return a JSON object "
            "with the structure: {'beta': <float>, 'var_95': <float>, 'exposed_assets': [<list_of_tickers>]}. "
            "'exposed_assets' are stocks most vulnerable in the given market. Provide only the raw JSON."
        )
        print("RiskAgent initialized.")

    def calculate_portfolio_risk(self, market_data: dict, portfolio: dict) -> dict:
        """
        Calculates risk metrics for a given portfolio and market conditions.
        """
        print("  [RiskAgent] Performing risk analysis...")
        try:
            prompt = (
                f"Analyze this portfolio: {json.dumps(portfolio)}. "
                f"Current market conditions: {json.dumps(market_data)}. "
                "Identify high-beta stocks, calculate portfolio beta, and estimate 95% VaR. "
                "Return the analysis as a raw JSON object."
            )
            
            response = self.model.generate_content([self.system_prompt, prompt])
            response_text = response.text.strip().replace("```json", "").replace("```", "").strip()
            risk_data_json = json.loads(response_text)
            validated_data = RiskReport(**risk_data_json)
            print("  [RiskAgent] Risk analysis complete.")
            return validated_data.dict()

        except Exception as e:
            print(f"  [RiskAgent] ERROR: Could not perform risk analysis: {e}. Using fallback data.")
            return {"beta": 1.5, "var_95": 50000.0, "exposed_assets": ["TSLA", "GOOGL"]}

