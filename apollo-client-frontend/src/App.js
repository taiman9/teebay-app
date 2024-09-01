// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/SignInComponent';
import Register from './components/RegisterComponent';
import Dashboard from './dashboard';

function App() {
  return (
    <div>
      <Routes>
        {/* Homepage with multiple elements */}
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to Teebay!</h1>
              <p>This is the homepage with multiple sections.</p>
              <section>
                <h2>Section 1</h2>
                <p>This is the first section of the homepage.</p>
              </section>
              <section>
                <h2>Section 2</h2>
                <p>This is the second section of the homepage.</p>
              </section>
              <section>
                <h2>Login and Register Links</h2>
                <p>
                  <a href="/login">Login</a> | <a href="/register">Register</a>
                </p>
              </section>
            </div>
          }
        />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
