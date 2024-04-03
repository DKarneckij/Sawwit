// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/auth';
import NavbarLoggedIn from './components/NavbarLoggedIn';
import NavbarLoggedOut from './components/NavbarLoggedOut';

const App = () => {

  const { user } = useAuth();

  return (
      <Routes>
        <Route 
          path="/" 
          element={ !!user ? <NavbarLoggedIn /> : <NavbarLoggedOut />}>     
        </Route>
      </Routes>
  );
}

export default App
