import subprocess
import os
from src.tools.brokerage_simulator import BrokerageSimulator

class ExecutionAgent:
    """
    An agent for executing tasks. It can run shell commands and now,
    it can also execute trades directly on the brokerage simulator.
    """

    def __init__(self, brokerage: BrokerageSimulator, work_dir: str = './workspace'):
        """
        Initializes the ExecutionAgent.

        Args:
            brokerage (BrokerageSimulator): A reference to the brokerage simulator.
            work_dir (str): The working directory for shell commands.
        """
        self.brokerage = brokerage
        self.work_dir = work_dir
        if not os.path.exists(self.work_dir):
            os.makedirs(self.work_dir, exist_ok=True)
        print(f"ExecutionAgent initialized. Working directory: '{os.path.abspath(self.work_dir)}'")

    def execute_trade(self, instruction: dict) -> dict:
        """
        Executes a trade instruction on the provided brokerage simulator.

        Args:
            instruction (dict): A dictionary containing action, ticker, and quantity.

        Returns:
            dict: A dictionary with the execution status.
        """
        action = instruction.get('action', '').upper()
        ticker = instruction.get('ticker')
        quantity = instruction.get('quantity')

        if not all([action, ticker, quantity]):
            return {"status": "ERROR", "reason": "Missing action, ticker, or quantity."}
        
        print(f"  [ExecutionAgent] Executing trade: {action} {quantity} of {ticker}")

        try:
            if action == 'BUY':
                self.brokerage.buy_stock(ticker, quantity)
            elif action == 'SELL':
                self.brokerage.sell_stock(ticker, quantity)
            else:
                return {"status": "ERROR", "reason": f"Invalid trade action: {action}"}
            
            return {"status": "SUCCESS", "details": f"Successfully executed {action} for {quantity} shares of {ticker}."}

        except Exception as e:
            print(f"  [ExecutionAgent] Trade execution failed: {e}")
            return {"status": "FAILED", "reason": str(e)}

    def execute_shell_command(self, command: str) -> dict:
        """
        Executes a shell command. (This function remains for extensibility)
        """
        try:
            process = subprocess.run(
                command, shell=True, check=True, stdout=subprocess.PIPE,
                stderr=subprocess.PIPE, text=True, cwd=self.work_dir
            )
            return {"status": "success", "output": process.stdout}
        except subprocess.CalledProcessError as e:
            return {"status": "error", "output": e.stderr}
