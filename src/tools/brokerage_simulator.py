import json
from typing import Dict, Any, Union

class BrokerageSimulator:
    """
    A simple brokerage simulator to manage a portfolio with basic trading operations.
    This tool simulates buying and selling stocks at fixed prices.
    """

    def __init__(self, initial_cash: float = 100000.0):
        """
        Initializes the BrokerageSimulator.

        Args:
            initial_cash (float): The starting cash balance for the account.
        """
        self.portfolio: Dict[str, Union[float, Dict[str, int]]] = {
            "cash": initial_cash,
            "stocks": {}  # Stores symbol: quantity
        }
        # Simulate a simple market with fixed prices for demonstration
        self.market_data = {
            "AAPL": 175.0,
            "GOOGL": 140.0,
            "MSFT": 370.0,
            "TSLA": 245.0,
            "AMZN": 145.0
        }
        print("BrokerageSimulator initialized.")
        print(f"Initial Portfolio: {json.dumps(self.get_portfolio(), indent=2)}")

    def _get_current_price(self, symbol: str) -> Union[float, None]:
        """
        Retrieves the current price of a stock symbol from the simulated market.

        Args:
            symbol (str): The stock symbol (e.g., 'AAPL').

        Returns:
            Union[float, None]: The price of the stock, or None if the symbol is not found.
        """
        return self.market_data.get(symbol.upper())

    def get_portfolio(self) -> Dict[str, Any]:
        """
        Returns the current state of the portfolio.

        Returns:
            Dict[str, Any]: A dictionary containing the cash balance and stock holdings.
        """
        return self.portfolio

    def buy_stock(self, symbol: str, quantity: int) -> Dict[str, Any]:
        """
        Simulates buying a specified quantity of a stock.

        Args:
            symbol (str): The stock symbol to buy.
            quantity (int): The number of shares to buy.

        Returns:
            Dict[str, Any]: A dictionary with the status of the transaction.
        """
        symbol = symbol.upper()
        price = self._get_current_price(symbol)

        if price is None:
            return {"status": "error", "message": f"Stock symbol '{symbol}' not found."}

        if not isinstance(quantity, int) or quantity <= 0:
            return {"status": "error", "message": "Quantity must be a positive integer."}

        total_cost = price * quantity

        if self.portfolio["cash"] < total_cost:
            return {
                "status": "error",
                "message": f"Insufficient funds. Need ${total_cost:.2f}, but only have ${self.portfolio['cash']:.2f}."
            }

        # Deduct cash and add stock to portfolio
        self.portfolio["cash"] -= total_cost
        current_quantity = self.portfolio["stocks"].get(symbol, 0)
        self.portfolio["stocks"][symbol] = current_quantity + quantity

        return {
            "status": "success",
            "message": f"Successfully bought {quantity} shares of {symbol} at ${price:.2f} each.",
            "total_cost": total_cost
        }

    def sell_stock(self, symbol: str, quantity: int) -> Dict[str, Any]:
        """
        Simulates selling a specified quantity of a stock.

        Args:
            symbol (str): The stock symbol to sell.
            quantity (int): The number of shares to sell.

        Returns:
            Dict[str, Any]: A dictionary with the status of the transaction.
        """
        symbol = symbol.upper()
        price = self._get_current_price(symbol)
        
        if price is None:
            return {"status": "error", "message": f"Stock symbol '{symbol}' not found."}
            
        if not isinstance(quantity, int) or quantity <= 0:
            return {"status": "error", "message": "Quantity must be a positive integer."}

        owned_quantity = self.portfolio["stocks"].get(symbol, 0)

        if owned_quantity < quantity:
            return {
                "status": "error",
                "message": f"Cannot sell {quantity} shares of {symbol}. You only own {owned_quantity}."
            }

        # Add cash from sale and deduct stock from portfolio
        total_sale_value = price * quantity
        self.portfolio["cash"] += total_sale_value
        self.portfolio["stocks"][symbol] -= quantity

        # If all shares are sold, remove the stock from the portfolio
        if self.portfolio["stocks"][symbol] == 0:
            del self.portfolio["stocks"][symbol]

        return {
            "status": "success",
            "message": f"Successfully sold {quantity} shares of {symbol} at ${price:.2f} each.",
            "total_value": total_sale_value
        }

if __name__ == '__main__':
    # This block demonstrates how to use the BrokerageSimulator and allows for standalone testing.
    
    # 1. Initialize the simulator with a starting cash balance.
    broker = BrokerageSimulator(initial_cash=50000.0)

    # 2. Simulate some transactions.
    print("\n--- Starting Transactions ---")

    # Successful purchase
    buy_result_1 = broker.buy_stock("AAPL", 50)
    print(f"Transaction: Buy 50 AAPL -> Status: {buy_result_1['status']}, Message: {buy_result_1['message']}")
    
    # Failed purchase (insufficient funds)
    buy_result_2 = broker.buy_stock("GOOGL", 500)
    print(f"Transaction: Buy 500 GOOGL -> Status: {buy_result_2['status']}, Message: {buy_result_2['message']}")
    
    # Successful purchase
    buy_result_3 = broker.buy_stock("TSLA", 100)
    print(f"Transaction: Buy 100 TSLA -> Status: {buy_result_3['status']}, Message: {buy_result_3['message']}")
    
    print("\n--- Portfolio after Buying ---")
    print(json.dumps(broker.get_portfolio(), indent=2))
    
    # Successful sale
    sell_result_1 = broker.sell_stock("AAPL", 20)
    print(f"Transaction: Sell 20 AAPL -> Status: {sell_result_1['status']}, Message: {sell_result_1['message']}")

    # Failed sale (not enough shares)
    sell_result_2 = broker.sell_stock("TSLA", 150)
    print(f"Transaction: Sell 150 TSLA -> Status: {sell_result_2['status']}, Message: {sell_result_2['message']}")
    
    # Successful sale of all remaining shares
    sell_result_3 = broker.sell_stock("TSLA", 100)
    print(f"Transaction: Sell 100 TSLA -> Status: {sell_result_3['status']}, Message: {sell_result_3['message']}")

    # 3. Print the final portfolio status.
    print("\n--- Final Portfolio ---")
    print(json.dumps(broker.get_portfolio(), indent=2))
