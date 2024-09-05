// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext(null);

// Create a custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
