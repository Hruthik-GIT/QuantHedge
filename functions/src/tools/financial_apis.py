import random
import time
from datetime import datetime
from typing import Dict, List
from .data_contracts import MarketData

# --- Configuration ---
# Publicly available APIs: Yahoo Finance, Alpha Vantage, FRED (for real implementation)

def _mock_api_call(service_name: str, latency: float = 0.05) -> None:
    """Simulates API latency and logging."""
    time.sleep(latency)
    print(f"  [Tool Call] Successfully queried {service_name} API.")

def fetch_realtime_market_data(portfolio_tickers: List[str]) -> MarketData:
    """
    Mocks the collection of real-time price feeds, VIX, and yield data.
    
    This simulation uses deterministic but volatile logic based on the current time
    to generate realistic, changing inputs for the agents.
    
    Args:
        portfolio_tickers: List of symbols (e.g., ['AAPL', 'QQQ']) to fetch data for.
        
    Returns:
        MarketData: Structured dictionary of market inputs.
    """
    _mock_api_call("Stock Prices & VIX")
    
    # Generate deterministic, slightly volatile data based on minute
    minute = datetime.now().minute
    vix_base = 14.0 + (minute % 15) * 0.15 + (random.random() * 0.5)
    yield_base = 4.20 + (minute % 10) * 0.02
    
    # 1. Price Feeds (Mocked data, can be expanded if needed)
    prices = {
        'AAPL': 175.00 + (minute % 5),
        'QQQ': 400.00 - (minute % 8),
        'TLT': 90.00 + (minute % 3)
    }
    
    # 2. VIX (Volatility Index)
    vix = round(vix_base, 2)
    
    # 3. 10Y Yield
    yield_10y = round(yield_base, 3)

    return {
        'timestamp': datetime.now().isoformat(),
        'vix': vix,
        'yield_10y': yield_10y,
        'sentiment': '', # Left empty, filled by a separate LLM call below
        'news_summary': '' # Left empty, filled by a separate LLM call below
    }

def fetch_macro_sentiment(vix: float, yield_10y: float) -> str:
    """
    Mocks the use of an LLM/NLP tool to synthesize market sentiment from news feeds.
    
    Args:
        vix: Current VIX reading.
        yield_10y: Current 10Y Yield.
        
    Returns:
        str: A sentiment rating ('Bullish', 'Neutral', or 'Bearish').
    """
    _mock_api_call("News & Sentiment Analysis")
    
    if vix > 18.0 and yield_10y > 4.5:
        return "Extreme Fear" # High risk tier signal
    elif vix > 15.5:
        return "Bearish"
    elif vix < 12.0 and yield_10y < 4.1:
        return "Bullish"
    else:
        return "Neutral"

def fetch_regulatory_context(portfolio_tickers: List[str]) -> str:
    """
    Mocks checking SEC/regulatory data for portfolio compliance or event flags.
    
    Args:
        portfolio_tickers: The list of assets currently held.
        
    Returns:
        str: Summary of any recent regulatory events (e.g., 10-K filing review).
    """
    _mock_api_call("SEC EDGAR Data Feed")
    
    if 'TSLA' in portfolio_tickers and random.random() < 0.3:
        return "TSLA: Recently flagged 8-K filing regarding executive compensation changes."
    
    if 'AAPL' in portfolio_tickers and random.random() < 0.1:
         return "AAPL: Pending EU antitrust ruling review on app store fees."

    return "No major regulatory events detected for current holdings."

# The Ingestion Agent will combine the results of these three separate tool calls.
