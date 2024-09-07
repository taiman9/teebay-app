// src/components/SignInComponent.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';  // Import user context
import './Login.css'; // Import CSS for styling
import { LOGIN_USER } from '../mutations';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();  // Use login function from context to store user data

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      if (data) {
        login(data.login);  // Call the login function from context after successful login
        navigate('/dashboard');  // Redirect to the dashboard
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>SIGN IN</h2>
        {error && <p className="error-message">{error.message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="signup-text">
        Don't have an account?{' '}
        <span className="signup-link" onClick={() => navigate('/register')}>
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
