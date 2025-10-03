# Human-in-the-Loop (HITL) Governance - BAU Quantum Hedge

## 🎯 Overview

The Human-in-the-Loop Governance system provides institutional clients with control over high-risk trading decisions. The AI system automatically executes trades within defined risk parameters, but requires human approval when trades exceed critical thresholds.

## 🚨 Key Features

### **Automatic Risk Assessment**
- **Trade Size Threshold**: 5% of Assets Under Management (AUM)
- **Value at Risk (VaR) Threshold**: $10,000 maximum impact
- **Beta Change Threshold**: 1.5 maximum portfolio beta change

### **Conditional Workflow**
1. **Strategy Agent** generates hedging recommendations
2. **Risk Assessment** evaluates trade impact against thresholds
3. **Conditional Execution**:
   - ✅ **Within Limits**: Auto-execute trade
   - ⚠️ **Exceeds Limits**: Require human approval
4. **Human Decision**:
   - **Approve**: Execute the trade
   - **Reject**: Cancel the trade with reasoning

## 🖥️ User Interface

### **Dashboard Integration**
- **HITL Governance Status**: Shows approval requirements
- **Risk Threshold Display**: Current risk parameters
- **Approval Alerts**: Visual indicators for pending approvals

### **HITL Governance Panel**
- **Pending Approvals**: List of trades requiring human decision
- **Approval History**: Complete audit trail of decisions
- **Risk Metrics**: Detailed impact analysis for each trade

## 📊 Risk Metrics Display

### **Trade Impact Analysis**
- **Portfolio Impact**: Percentage of AUM affected
- **VaR Impact**: Value at Risk change
- **Beta Change**: Portfolio sensitivity modification

### **Visual Indicators**
- 🟢 **Green**: Within acceptable limits
- 🟡 **Yellow**: Approaching limits
- 🔴 **Red**: Exceeds limits (requires approval)

## 🔄 Workflow Example

### **Scenario 1: Auto-Execution**
```
AI Analysis: "Buy 10 SPY puts for $2,500"
Risk Assessment: 2.5% AUM impact ✅
Decision: Auto-execute
Result: Trade completed immediately
```

### **Scenario 2: Human Approval Required**
```
AI Analysis: "Buy 50 SPY puts for $12,500"
Risk Assessment: 6.2% AUM impact ⚠️
Decision: Require human approval
Status: Pending in HITL Governance panel
```

## 🎛️ Governance Controls

### **Risk Threshold Configuration**
- **Max Trade Size**: Configurable percentage of AUM
- **Max VaR Impact**: Dollar amount threshold
- **Max Beta Change**: Portfolio sensitivity limit

### **Approval Process**
1. **Review Trade Details**: Action, ticker, quantity, strike price
2. **Analyze Risk Impact**: Portfolio, VaR, and beta changes
3. **Read AI Reasoning**: Detailed explanation of recommendation
4. **Make Decision**: Approve or reject with optional reasoning

## 📈 Real-Time Monitoring

### **Live Updates**
- **Pending Approvals**: Real-time list updates
- **Execution Status**: Immediate feedback on decisions
- **Portfolio Impact**: Live risk metric calculations

### **Audit Trail**
- **Decision History**: Complete record of all approvals/rejections
- **Reasoning Capture**: AI and human reasoning preserved
- **Execution Results**: Trade outcome tracking

## 🔧 Technical Implementation

### **Backend Logic**
```python
def evaluate_trade_approval(trade_ticket, portfolio_data):
    # Calculate risk metrics
    portfolio_impact = calculate_portfolio_impact(trade_ticket, portfolio_data)
    var_impact = calculate_var_impact(trade_ticket, portfolio_data)
    beta_change = calculate_beta_change(trade_ticket, portfolio_data)
    
    # Check against thresholds
    if (portfolio_impact > MAX_TRADE_SIZE_PCT or 
        var_impact > MAX_VAR_THRESHOLD or 
        abs(beta_change) > MAX_BETA_THRESHOLD):
        return {
            "requires_approval": True,
            "approval_reason": f"Trade exceeds {threshold_type} threshold",
            "status": "PENDING_APPROVAL"
        }
    else:
        return {
            "requires_approval": False,
            "status": "AUTO_EXECUTED"
        }
```

### **Frontend Integration**
- **React Components**: HITLGovernance.jsx
- **State Management**: Pending approvals and history
- **API Integration**: Mock services for testing

## 🧪 Testing the HITL System

### **Test Scenarios**
1. **Run QuantHedge Analysis** multiple times
2. **Look for "Requires Approval"** status in results
3. **Check HITL Governance Panel** for pending approvals
4. **Test Approve/Reject** functionality
5. **Verify Audit Trail** updates

### **Mock Data Included**
- **High-Risk Trades**: Exceed 5% AUM threshold
- **Medium-Risk Trades**: Within limits but significant
- **Low-Risk Trades**: Small impact, auto-executed

## 🎨 UI/UX Features

### **Visual Design**
- **Color-Coded Status**: Red (needs approval), Green (auto-executed)
- **Priority Badges**: HIGH, MEDIUM, LOW priority levels
- **Responsive Layout**: Two-column design for approvals and history
- **Interactive Elements**: Hover effects and smooth transitions

### **Information Architecture**
- **Left Panel**: Pending approvals requiring action
- **Right Panel**: Approval history and audit trail
- **Risk Thresholds**: Always visible for reference
- **AI Reasoning**: Detailed explanations for each trade

## 🚀 Live Application

**URL**: https://hedgeguard-ai-202510030010.web.app

### **How to Test**
1. Navigate to the **Portfolio Dashboard**
2. Click **"Run QuantHedge Analysis"**
3. Look for **HITL Governance** status in results
4. Scroll down to **HITL Governance** panel
5. Test **approve/reject** functionality

## 📋 Compliance Features

### **Audit Requirements**
- **Complete Decision Trail**: Every approval/rejection recorded
- **Reasoning Preservation**: Both AI and human reasoning captured
- **Timestamp Tracking**: Precise timing of all decisions
- **User Attribution**: Who made each decision

### **Risk Management**
- **Threshold Enforcement**: Automatic risk limit checking
- **Escalation Procedures**: Clear approval workflows
- **Override Capabilities**: Human decision authority
- **Monitoring Alerts**: Real-time risk status updates

## 🔮 Future Enhancements

### **Planned Features**
- **Multi-User Approvals**: Role-based approval hierarchies
- **Scheduled Reviews**: Automated risk assessment reports
- **Machine Learning**: Approval pattern analysis
- **Integration APIs**: Connect with existing risk systems

### **Advanced Controls**
- **Dynamic Thresholds**: Market condition-based limits
- **Portfolio-Specific Rules**: Custom risk parameters per client
- **Time-Based Approvals**: Expiring approval windows
- **Bulk Operations**: Approve multiple trades simultaneously

---

**BAU Quantum Hedge HITL Governance** provides institutional-grade control over AI trading decisions while maintaining operational efficiency through automated risk assessment and conditional execution workflows.
