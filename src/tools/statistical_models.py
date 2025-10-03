import random
import time
import numpy as np
import pandas as pd
from typing import Dict, List
from .data_contracts import PortfolioRisk # Import required for type hinting

# --- Configuration ---

def _mock_calculation_call(model_name: str, complexity: float = 0.1) -> None:
    """Simulates calculation time and logging for complex models."""
    time.sleep(complexity)
    print(f"  [Model Run] Executing {model_name} model...")

def calculate_portfolio_beta(
    portfolio_weights: Dict[str, float],
    asset_data: Dict[str, pd.Series],
    market_benchmark: pd.Series
) -> float:
    """
    Mocks the calculation of the Portfolio Beta.
    
    In a real system, this would use historical data (asset_data and benchmark)
    to compute a covariance matrix and find the weighted average Beta.
    
    Args:
        portfolio_weights: The current allocation (e.g., {'AAPL': 0.6, 'QQQ': 0.4}).
        asset_data: Historical return data for assets. (Mocked input)
        market_benchmark: Historical return data for benchmark (e.g., S&P 500). (Mocked input)
        
    Returns:
        float: The portfolio's calculated Beta value.
    """
    _mock_calculation_call("Portfolio Beta Model", complexity=0.2)
    
    # --- MOCK LOGIC ---
    # We simulate a slightly high beta (e.g., > 1.2) if market is trending up
    # This keeps the scenario interesting for the hedging agent.
    
    # Simulate high volatility = higher risk perception
    simulated_beta = 1.15 + (random.random() * 0.3)
    
    return round(simulated_beta, 3)


def calculate_portfolio_var(
    portfolio_value: float,
    confidence_level: float = 0.99
) -> Dict[str, float]:
    """
    Mocks the calculation of Value-at-Risk (VaR) for the portfolio.
    
    VaR is a measure of potential loss in value of a portfolio over a defined period.
    
    Args:
        portfolio_value: The total current USD value of the portfolio.
        confidence_level: The statistical confidence level (e.g., 0.99 for 99% VaR).
        
    Returns:
        Dict[str, float]: VaR results, including the maximum dollar loss.
    """
    _mock_calculation_call("Historical/Parametric VaR Model", complexity=0.3)
    
    # --- MOCK LOGIC ---
    # Simulate a daily volatility (sigma) based on a high-risk scenario
    simulated_volatility = 0.015 + (random.random() * 0.005) # 1.5% - 2.0% daily sigma
    
    # Z-score for 99% confidence level (approx 2.33 for one-tailed)
    z_score = 2.33 
    
    # VaR formula (simplified): Portfolio Value * Volatility * Z-score
    var_dollar_loss = portfolio_value * simulated_volatility * z_score
    
    return {
        "confidence_level": confidence_level,
        "max_loss_usd": round(var_dollar_loss, 0),
        "daily_volatility": round(simulated_volatility, 4)
    }

def identify_exposed_assets(
    market_data_vix: float,
    portfolio_tickers: List[str]
) -> List[str]:
    """
    Mocks identifying assets that are most exposed to the current systemic risk factors.
    
    Args:
        market_data_vix: The current VIX reading (proxy for market fear).
        portfolio_tickers: The tickers currently held.
        
    Returns:
        List[str]: Tickers identified as highly exposed (e.g., high-beta tech stocks).
    """
    _mock_calculation_call("Correlation/Exposure Model", complexity=0.1)
    
    exposed_list = []
    
    if market_data_vix > 15.0:
        # If VIX is elevated, high-beta tech assets are the most exposed.
        if 'AAPL' in portfolio_tickers:
            exposed_list.append('AAPL')
        if 'TSLA' in portfolio_tickers:
            exposed_list.append('TSLA')
    
    if 'QQQ' in portfolio_tickers and market_data_vix > 18.0:
        # If VIX is high (above 18), flag the benchmark ETF itself.
        exposed_list.append('QQQ (Index ETF)')
        
    return list(set(exposed_list)) # Return unique assets
