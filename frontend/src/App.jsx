// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'


import NavbarLoggedIn from './components/NavbarLoggedIn';
import NavbarLoggedOut from './components/NavbarLoggedOut';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
    </div>
  );
}

export default App
