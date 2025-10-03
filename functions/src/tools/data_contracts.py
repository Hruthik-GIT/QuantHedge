from pydantic import BaseModel, Field
from typing import List, Literal

class MarketData(BaseModel):
    """
    Defines the structure for market data snapshots.
    """
    vix: float = Field(..., description="CBOE Volatility Index (VIX)")
    sentiment: Literal['positive', 'negative', 'neutral'] = Field(..., description="Overall market sentiment")
    sp500_performance: float = Field(..., description="S&P 500 performance as a percentage (e.g., -0.01 for -1%)")

class RiskReport(BaseModel):
    """
    Defines the structure for the portfolio risk analysis report.
    """
    beta: float = Field(..., description="Portfolio beta, measuring volatility relative to the market")
    var_95: float = Field(..., description="Value at Risk at 95% confidence level")
    exposed_assets: List[str] = Field(..., description="List of stock tickers most vulnerable to a downturn")

class HedgingInstruction(BaseModel):
    """
    Defines the structure for a single, actionable hedging trade.
    """
    action: Literal['BUY', 'SELL', 'HOLD', 'NONE', 'NO ACTION NEEDED'] = Field(..., description="The trade action to take")
    ticker: str = Field(..., description="The stock or ETF ticker for the action (e.g., 'SPY' or 'NONE')")
    quantity: int = Field(..., description="The number of shares to trade")
    reasoning: str = Field(..., description="A brief justification for the strategic decision")
