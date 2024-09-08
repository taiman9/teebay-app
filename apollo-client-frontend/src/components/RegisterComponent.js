import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import CSS for styling
import { REGISTER_USER } from '../mutations';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {
          email,
          password,
          firstName,
          lastName,
          address,
          phoneNumber,
        },
      });
      if (data) {
        setRegistrationSuccess(true); // Set success state
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after 2 seconds
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="register-container">
      {/* Homepage link at the top left */}
      <a href="/" className="home-link">Homepage</a>
      
      {registrationSuccess ? (
        <div className="success-message">
          <h2>Registration Successful!</h2>
          <p>You will be redirected to the login page shortly.</p>
        </div>
      ) : (
        <form className="register-box" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <p className="error-message">{error.message}</p>}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>
      )}
      <p className="signin-text">
        Already have an account?{' '}
        <span className="signin-link" onClick={() => navigate('/login')}>
          Sign in
        </span>
      </p>
    </div>
  );
}

export default Register;
