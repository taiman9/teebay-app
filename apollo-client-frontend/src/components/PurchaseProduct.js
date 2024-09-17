import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_PRODUCT_BY_ID } from '../mutation_product'; // Import query to fetch product by ID
import './PurchaseProduct.css'; // Import CSS for styling

function PurchaseProduct({ userId, productId }) {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [product, setProduct] = useState(null); // State to hold fetched product details

  // Fetch product details using product ID
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
    fetchPolicy: 'network-only', // Ensure fresh data is fetched from the server
  });

  // Update state when data is loaded
  useEffect(() => {
    if (data && data.product) {
      console.log('Product fetched:', data.product);  // Debugging: Log fetched product
      setProduct(data.product); // Set the fetched product details in state
    } else {
      console.log('No product data available');  // Debugging: Log if no data is available
    }
  }, [data]); // Dependency on data to ensure the state is updated correctly

  // Handle Buy Product button click
  const handleBuyProduct = () => {
    if (product) {
      // Navigate to BuyProduct component with userId and productId
      navigate('/dashboard/buy-product', { state: { userId, productId: product.id } });
    } else {
      alert('Product information is not available.');
    }
  };

  // Handle Rent Product button click (Placeholder, functionality to be implemented)
  const handleRentProduct = () => {
    alert('Rent functionality is not yet implemented.');
  };

  // Render loading, error, or no product found states
  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;

  // Check if product is fetched successfully
  if (!product) return <p>No product found.</p>;

  return (
    <div className="purchase-product-container">
      <h2>Purchase Product</h2>
      <p>
        <strong>Title:</strong> {product.title}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      {product.rentPrice && (
        <p>
          <strong>Rent Price per Day:</strong> ${product.rentPrice.toFixed(2)}
        </p>
      )}
      <div className="product-actions">
        <button onClick={handleBuyProduct} className="btn btn-buy">Buy Now</button>
        {product.rentPrice && (
          <button onClick={handleRentProduct} className="btn">Rent</button>
        )}
      </div>
    </div>
  );
}

export default PurchaseProduct;
