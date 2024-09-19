import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../mutations/mutation_user';  // Import the GraphQL query to get user info
import { useUser } from '../context/UserContext';  // Import the custom hook to access the user context
import { useNavigate } from 'react-router-dom';  // Import useNavigate to handle navigation
import './UserInfo.css';  // Import custom CSS for styling

function UserInfo() {
  const { user } = useUser();  // Get user ID from context
  const navigate = useNavigate();  // Use navigate for redirection

  // Use the GET_USER query to fetch user information
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id: user?.id },  // Pass user ID from the context to the query
    skip: !user?.id,  // Skip the query if user ID is not available
    fetchPolicy: 'network-only',  // Ensure fresh data is fetched from the server
  });

  // Refetch user information if user ID changes
  useEffect(() => {
    if (user?.id) {
      refetch();  // Refetch data when the user ID is available or changes
    }
  }, [user?.id, refetch]);

  // Display loading state
  if (loading) return <p>Loading user information...</p>;

  // Display error state
  if (error) return <p>Error fetching user information: {error.message}</p>;

  // Display the user's information when available
  return (
    <div className="user-info-container">
      {/* Back to Dashboard Button */}
      <button onClick={() => navigate('/dashboard')} className="back-to-dashboard-button">
        Back to Dashboard
      </button>

      <h2>User Information</h2>
      {data && data.getUser ? (
        <div className="user-info-card">
          <p><strong>First Name:</strong> {data.getUser.firstName}</p>
          <p><strong>Last Name:</strong> {data.getUser.lastName}</p>
          <p><strong>Email:</strong> {data.getUser.email}</p>
          <p><strong>Address:</strong> {data.getUser.address}</p>
          <p><strong>Phone Number:</strong> {data.getUser.phoneNumber}</p>
        </div>
      ) : (
        <p>No user information found.</p>
      )}
    </div>
  );
}

export default UserInfo;
