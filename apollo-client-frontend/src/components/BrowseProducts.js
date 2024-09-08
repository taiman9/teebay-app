import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
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
  const navigate = useNavigate();  // Hook to navigate programmatically

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

  // Handle Product Card Click
  const handleProductClick = (productId) => {
    navigate(`/dashboard/purchase-product/${productId}`);  // Navigate to the purchase product page with productId
  };

  return (
    <div className="browse-products">
      <h2>Browse Products</h2>

      {/* Render Products */}
      <div className="products-container">
        {data.browseProducts.map((product) => (
          <div 
            key={product.id} 
            className="product-card" 
            onClick={() => handleProductClick(product.id)}  // Navigate to purchase page on click
            style={{ cursor: 'pointer' }}  // Add cursor pointer for better UX
          >
            <h3>{product.title}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            {product.rentPrice !== null && (  // Display rent price only if it's not null
              <p><strong>Rent/Day:</strong> ${product.rentPrice.toFixed(2)}</p>
            )}
            <p><strong>Categories:</strong> {product.categories.map(category => category.name).join(', ')}</p>
            <p><strong>Date Posted:</strong> {formatDate(product.createdAt)}</p>  {/* Display the formatted date */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseProducts;
