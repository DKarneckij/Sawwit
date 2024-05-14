import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import userService from "../services/userService"

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
    console.log("B");
    // Local storage has token of the logged in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Gets live user data and gives it to the context
      const loggedUser = JSON.parse(storedUser);
      userService.setToken(loggedUser.token)
      userService.getLoggedUser().then(live => {
        setUser(live)})
    }
    
  }, []);

  const login = (newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    navigate('/', { replace: true });
  };

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/', { replace: true })
  };

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to access the context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };