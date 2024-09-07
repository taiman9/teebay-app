// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const UserContext = createContext();

// Export the custom hook to use the user context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from sessionStorage when the component mounts
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');  // Check sessionStorage for user info
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // If user info exists, set it to state
    }
  }, []);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));  // Store user info in sessionStorage
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');  // Remove user info from sessionStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
