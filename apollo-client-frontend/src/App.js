// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { MantineProvider } from '@mantine/core';  // Import MantineProvider
import { UserProvider } from './context/UserContext';  // Import user context provider
import Login from './components/SignInComponent';  // Import SignInComponent
import Register from './components/RegisterComponent';
import Dashboard from './Dashboard';  // Assume Dashboard has AddProductComponent

function App() {
  return (
    // Wrap the entire app with MantineProvider
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome to Teebay!</h1>
                <section>
                  <h2>Section 1</h2>
                  <p>This is the first section of the homepage.</p>
                </section>
                <section>
                  <h2>Sign in and Register Links</h2>
                  <p>
                    <a href="/login">Login</a> | <a href="/register">Register</a>
                  </p>
                </section>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />  {/* Correct usage of SignInComponent */}
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />  {/* Show Dashboard after login */}
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
