import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';
import Navbar from '@components/layout/Navbar'
import HomePage from '@pages/HomePage'
import SubsawPage from '@pages/SubsawPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/s" > 
            <Route path=':name' element={<SubsawPage />}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
