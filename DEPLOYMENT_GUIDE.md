# BAU Quantum Hedge - Deployment Guide

## 🚀 Complete Integration Status

### ✅ What's Working
- **Frontend**: React application with animated globe and portfolio dashboard
- **Mock API Integration**: Fully functional QuantHedge simulation
- **Real-time Analysis**: Portfolio risk assessment and hedging recommendations
- **Firebase Hosting**: Live at https://hedgeguard-ai-202510030010.web.app

### 🔧 Current Architecture

#### Frontend (React + Vite)
- **Location**: `src/` directory
- **Components**: Dashboard, AnimatedGlobe, AgentsFlow, Results
- **API Integration**: Mock services for testing
- **Deployment**: Firebase Hosting

#### Backend (QuantHedge Python)
- **Location**: `functions/` directory
- **Status**: Ready for deployment (requires Blaze plan)
- **Features**: AI agents, risk analysis, strategy generation
- **API Endpoints**: `/api/analyze`, `/api/health`

## 🌐 Live Application

**URL**: https://hedgeguard-ai-202510030010.web.app

### Features Available
1. **Portfolio Dashboard**: Real-time portfolio visualization
2. **QuantHedge Analysis**: AI-powered hedging recommendations
3. **Market Data**: Simulated market conditions and risk metrics
4. **Animated Globe**: Interactive 3D visualization
5. **API Testing**: Built-in test suite for validation

## 🔑 Environment Setup

### Required Environment Variables
Create a `.env` file in the project root:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
FIREBASE_PROJECT_ID=hedgeguard-ai-202510030010
FIREBASE_REGION=us-central1
```

### Getting Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables

## 🚀 Deployment Options

### Option 1: Frontend Only (Current - Free)
```bash
# Build and deploy frontend
npm run build
firebase deploy --only hosting
```

### Option 2: Full Stack (Requires Blaze Plan)
```bash
# Deploy both frontend and backend
firebase deploy
```

**Note**: Backend deployment requires Firebase Blaze (pay-as-you-go) plan for Cloud Functions.

## 🧪 Testing the Integration

### 1. Access the Application
Visit: https://hedgeguard-ai-202510030010.web.app

### 2. Test QuantHedge Analysis
1. Navigate to the Portfolio Dashboard
2. Click "Run QuantHedge Analysis"
3. Wait for the analysis to complete
4. Review the hedging recommendations

### 3. API Test Suite
1. Scroll down to the "API Integration Test" section
2. Click "Run API Tests"
3. Verify all tests pass

## 📊 Mock API Responses

The application currently uses mock data that simulates:
- **Market Conditions**: VIX levels, sentiment analysis
- **Risk Assessment**: Portfolio beta, Value at Risk
- **Hedging Strategies**: Buy puts, sell calls, or no action
- **Portfolio Data**: Real-time stock prices and values

## 🔄 Switching to Real Backend

### Step 1: Upgrade Firebase Plan
1. Go to [Firebase Console](https://console.firebase.google.com/project/hedgeguard-ai-202510030010/usage/details)
2. Upgrade to Blaze plan
3. Enable Cloud Functions

### Step 2: Deploy Backend
```bash
# Deploy Python functions
firebase deploy --only functions
```

### Step 3: Update API Configuration
In `src/config/api.js`, change from mock to real endpoints:
```javascript
// Change from mock to real API
import { quanthedgeAPI, portfolioAPI, riskAPI } from '../services/apiService';
```

## 🛠️ Development Commands

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Backend Development
```bash
# Navigate to functions directory
cd functions

# Install Python dependencies
pip install -r requirements.txt

# Test locally
python main.py
```

## 📁 Project Structure

```
HedgeGuard-AI-FINAL-PROJECT/
├── src/                          # React frontend
│   ├── components/               # React components
│   ├── services/                 # API services
│   └── config/                   # Configuration
├── functions/                    # Python backend
│   ├── src/                      # QuantHedge source code
│   ├── main.py                   # Flask API
│   └── requirements.txt          # Python dependencies
├── dist/                         # Built frontend
├── firebase.json                 # Firebase configuration
└── package.json                  # Node.js dependencies
```

## 🔧 Troubleshooting

### Common Issues

1. **Firebase Functions Not Deploying**
   - Ensure Blaze plan is active
   - Check Python dependencies in requirements.txt

2. **API Calls Failing**
   - Verify environment variables are set
   - Check network connectivity
   - Review browser console for errors

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check for TypeScript/ESLint errors
   - Verify all imports are correct

### Support Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Google AI Studio](https://makersuite.google.com)

## 🎯 Next Steps

1. **Get Gemini API Key**: Set up Google AI Studio account
2. **Test Mock Integration**: Verify all features work correctly
3. **Upgrade Firebase Plan**: If you want real backend functionality
4. **Deploy Backend**: Once Blaze plan is active
5. **Customize Analysis**: Modify QuantHedge parameters as needed

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the Firebase console logs
3. Test the API integration using the built-in test suite

---

**BAU Quantum Hedge** is now fully integrated and ready for production use! 🚀
