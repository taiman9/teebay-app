// src/Login.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importing CSS for styling (create a CSS file for custom styling)

// GraphQL mutation to login the user
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      if (data) {
        navigate('/dashboard'); // Redirect to the dashboard
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
