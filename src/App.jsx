import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import HITLPage from './pages/HITLPage'
import ReasoningAgentPage from './pages/ReasoningAgentPage'
import './styles.css'
import AnimatedGlobe from './components/AnimatedGlobe' // Keep globe as a background

function App() {
  return (
    <Router>
      <div className="main-container">
        <AnimatedGlobe /> {/* Render globe as a background for all pages */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/hitl-governance" element={<HITLPage />} />
          <Route path="/reasoning-agent" element={<ReasoningAgentPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App