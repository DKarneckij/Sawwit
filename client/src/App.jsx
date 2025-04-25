import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';
import Navbar from '@components/layout/Navbar'
import HomePage from '@pages/HomePage'
import SubsawPage from '@pages/SubsawPage';
import SubmitPage from '@pages/SubmitPage';
import SubsawLayout from '@components/layout/SubsawLayout';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>}/>

          {/* Global /submit route */}
          <Route path="/submit" element={<SubmitPage />} /> 

          {/* Subreddit layout + nested pages */}
          <Route path="/s" element={<SubsawLayout/>} > 
            <Route path=':name' element={<SubsawPage />}/>
            <Route path=":name/submit" element={<SubmitPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
