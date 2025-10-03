import json
import google.generativeai as genai  # CORRECTED IMPORT
from src.tools.data_contracts import MarketData

class IngestionAgent:
    """
    Simulates fetching and parsing real-time market data using an LLM.
    """

    def __init__(self):
        self.model = genai.GenerativeModel(model_name='gemini-1.5-flash')
        self.system_prompt = (
            "You are a Market Data Provider API. Return a JSON object representing "
            "market conditions. The JSON must strictly adhere to this structure: "
            "{'vix': <float>, 'sentiment': <'positive'|'negative'|'neutral'>, "
            "'sp500_performance': <float_percentage>}. Do not add explanations or markdown."
        )
        print("IngestionAgent initialized.")

    def ingest_market_data(self) -> dict:
        """
        Generates a simulated market data snapshot using the LLM.
        """
        print("  [IngestionAgent] Simulating call to market data provider...")
        try:
            prompt = (
                "Simulate a volatile market where tech stocks are down and sentiment is negative. "
                "The VIX should be elevated. Provide the data as a raw JSON object."
            )
            
            response = self.model.generate_content([self.system_prompt, prompt])
            response_text = response.text.strip().replace("```json", "").replace("```", "").strip()
            market_data_json = json.loads(response_text)
            validated_data = MarketData(**market_data_json)
            print("  [IngestionAgent] Market data successfully ingested.")
            return validated_data.dict()

        except Exception as e:
            print(f"  [IngestionAgent] ERROR: Could not parse LLM response: {e}. Using fallback data.")
            return {"vix": 40.0, "sentiment": "negative", "sp500_performance": -0.02}

