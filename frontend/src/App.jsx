import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import ChatbotPage from './pages/Chatbotpages'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatbotPage />} />
      </Routes>
    </Router>
  )
}

export default App