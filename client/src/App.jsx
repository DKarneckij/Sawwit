import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
      </Router>
    </AuthProvider>
  )
}

export default App
