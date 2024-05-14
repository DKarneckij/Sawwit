// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';

import { AuthProvider} from './contexts/auth';
import MainLayout from './components/layout/MainLayout'
import TestLayout from './components/layout/TestLayout'

const App = () => {

  useEffect(() => {
    console.log("A")
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route 
          path="/" 
          element={<TestLayout />}>     
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App
