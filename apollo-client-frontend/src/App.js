// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import user context provider
import Login from './components/SignInComponent'; // Import SignInComponent
import Register from './components/RegisterComponent';
import Dashboard from './Dashboard'; // Assume Dashboard has AddProductComponent
import Transactions from './components/Transactions';
import UserInfo from './components/UserInfo';
import './App.css'; // Import the CSS file for styling

function App() {

  return (
    // Wrap the entire app with UserProvider
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="homepage-container">
                <h1 className="homepage-title">Welcome to Teebay!</h1>
                <p className="homepage-subtitle">
                  Your one-stop shop for buying, renting, and selling products
                </p>
                <section className="homepage-section">
                  <p>
                    <a href="/login" className="link-button">Sign In</a> |{' '}
                    <a href="/register" className="link-button">Register</a>
                  </p>
                </section>
              </div>
            }
          />
          <Route path="/login" element={<Login />} /> {/* Correct usage of SignInComponent */}
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} /> {/* Show Dashboard after login */}
          {/* Add other routes as needed */}
          <Route path="/transactions" element={<Transactions />} />  {/* Transactions page */}
          <Route path="/personal-info" element={<UserInfo />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
