import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';
import Navbar from '@components/layout/Navbar'
import HomePage from '@pages/HomePage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
