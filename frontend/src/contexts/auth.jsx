import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Define the initial context value
const initialAuthContext = {
  user: null,
  signin: () => {},
  signout: () => {}
};

// Create the AuthContext
const AuthContext = createContext(initialAuthContext);

// AuthProvider component
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking for Logged User");
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);

    if (storedUser) {
      setUser(user);
      console.log("Logged the User:", user);
    }
  }, []);

  const signin = (newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    navigate('/', { replace: true });
  };

  const signout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to access the context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };