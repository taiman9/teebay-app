// src/components/BrowseProducts.js
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BROWSE_PRODUCTS } from '../mutations';  // Import the query to fetch products
import './BrowseProducts.css';  // Import CSS for styling

// Helper function to format date
const formatDate = (timestamp) => {
  if (!timestamp) return 'Invalid Date';  // Check for null or undefined values

  const date = new Date(parseInt(timestamp, 10));  // Convert timestamp to a Date object
  if (isNaN(date.getTime())) return 'Invalid Date';  // Check if the date is valid

  const options = { year: 'numeric', month: 'long', day: 'numeric' };  // e.g., January 1, 2024
  return date.toLocaleDateString(undefined, options);  // Format the date
};

function BrowseProducts({ userId }) {
  // Fetch products not owned by the given userId
  const { loading, error, data, refetch } = useQuery(BROWSE_PRODUCTS, {
    variables: { userId },  // Pass userId to filter out the products owned by the user
    fetchPolicy: 'network-only',  // Always fetch from the network to ensure fresh data
  });

  // Refetch products when the component is mounted or when userId changes
  useEffect(() => {
    refetch();  // Refetch products from the server
  }, [refetch, userId]);  // Run the effect when refetch function or userId changes

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="browse-products">
      <h2>Browse Products</h2>

      {/* Render Products */}
      <div className="products-container">
        {data.browseProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Categories:</strong> {product.categories.map(category => category.name).join(', ')}</p>
            <p><strong>Date Posted:</strong> {formatDate(product.createdAt)}</p>  {/* Display the formatted date */}
            <div className="product-actions">
              {/* Buy button */}
              <button className="action-btn buy-btn">
                Buy
              </button>
              {/* Rent button */}
              <button className="action-btn rent-btn">
                Rent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseProducts;
