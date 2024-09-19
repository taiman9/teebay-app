import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';  // useLazyQuery to fetch user info on demand
import { GET_TRANSACTION } from '../mutation_product';  // Import the GraphQL query
import { GET_USER } from '../mutation_user';  // Import the GraphQL query to get user info
import { useUser } from '../context/UserContext';  // Import the custom hook to access the user context
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation
import './Transactions.css';  // Import the CSS for styling

function Transactions() {
  const { user } = useUser();  // Get user from context
  const [transactionType, setTransactionType] = useState(null);
  const navigate = useNavigate();  // Hook to navigate programmatically
  const [selectedProduct, setSelectedProduct] = useState(null);  // To store selected product for fetching user info
  const [userInfo, setUserInfo] = useState(null);  // To store fetched user info

  // Fetch products based on the transaction type ('bought' or 'sold')
  const { data, loading, error, refetch } = useQuery(GET_TRANSACTION, {
    variables: { userId: user?.id, transactionType },  // Pass user.id from context
    skip: !transactionType || ['borrowed', 'lent', null].includes(transactionType),  // Skip if invalid type
    fetchPolicy: 'network-only',  // Ensure fresh data is fetched from the server
  });

  // Lazy query to fetch user info (seller or buyer) by ID
  const [getUser, { loading: userLoading, error: userError }] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      setUserInfo(data.getUser);  // Store the fetched user info
    },
  });

  // Refetch data when transactionType changes and is either 'bought' or 'sold'
  useEffect(() => {
    if ((transactionType === 'bought' || transactionType === 'sold') && user?.id) {
      refetch();  // Refetch data when transactionType is either 'bought' or 'sold'
    }
  }, [transactionType, refetch, user?.id]);

  // Handle transaction button click
  const handleTransactionClick = (type) => {
    setTransactionType(type);
    setUserInfo(null);  // Reset user info when changing transaction type
  };

  // Fetch seller or buyer info based on the transaction type
  const handleGetUserInfo = (product) => {
    const userIdToFetch = transactionType === 'bought' ? product.userId : product.buyerId;
    if (userIdToFetch) {
      setSelectedProduct(product);  // Store the selected product
      getUser({ variables: { id: userIdToFetch }, fetchPolicy: 'network-only' });  // Fetch the user info by userId or buyerId
    }
  };

  if (!user) {
    return <p>Please log in to view your transactions.</p>;  // Ensure user is logged in
  }

  return (
    <div className="transactions-container">
      {/* Back to Dashboard Button */}
      <button onClick={() => navigate('/dashboard')} className="back-to-dashboard-button">
        Back to Dashboard
      </button>

      <h2>Choose Transaction Type</h2>
      <div className="transaction-buttons">
        <button onClick={() => handleTransactionClick('bought')}>Bought</button>
        <button onClick={() => handleTransactionClick('sold')}>Sold</button>
        <button onClick={() => handleTransactionClick('borrowed')}>Borrowed</button>
        <button onClick={() => handleTransactionClick('lent')}>Lent</button>
      </div>

      {/* Show loading state */}
      {loading && <p>Loading transactions...</p>}

      {/* Show error state */}
      {error && <p>Error loading transactions: {error.message}</p>}

      {/* Show error for user info fetching */}
      {userError && <p>Error loading user info: {userError.message}</p>}

      {/* Handle transaction results */}
      {transactionType === 'bought' || transactionType === 'sold' ? (
        <div className="transaction-list">
          {data && data.getTransaction && data.getTransaction.length > 0 ? (
            data.getTransaction.map((product) => (
              <div key={product.id} className="transaction-item">
                <h3>{product.title}</h3>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                {/* Convert buyDate to a human-readable string */}
                <p><strong>Transaction Date:</strong> {product.buyDate ? new Date(parseInt(product.buyDate)).toLocaleDateString() : 'N/A'}</p>

                {/* Button to fetch seller/buyer info */}
                <button className="get-user-info-btn" onClick={() => handleGetUserInfo(product)}>
                  {transactionType === 'bought' ? 'Get Seller Info' : 'Get Buyer Info'}
                </button>

                {/* Display seller or buyer info if available */}
                {userInfo && selectedProduct?.id === product.id && (
                  <div className="user-info">
                    <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No {transactionType} transactions found.</p>
          )}
        </div>
      ) : (
        (transactionType === 'borrowed' || transactionType === 'lent') && (
          <p>Rent features have not yet been implemented.</p>
        )
      )}
    </div>
  );
}

export default Transactions;
