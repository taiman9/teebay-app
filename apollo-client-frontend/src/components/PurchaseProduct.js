import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_PRODUCT_BY_ID } from '../mutation_product'; // Query to fetch product by ID
import { GET_USER } from '../mutation_user'; // Query to fetch user by ID
import './PurchaseProduct.css'; // Import CSS for styling

function PurchaseProduct({ userId, productId }) {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [product, setProduct] = useState(null); // State to hold fetched product details
  const [seller, setSeller] = useState(null); // State to hold fetched seller details

  // Fetch product details using product ID
  const { loading: productLoading, error: productError, data: productData } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
    fetchPolicy: 'network-only', // Ensure fresh data is fetched from the server
  });

  // Fetch seller details using product's userId
  const { loading: sellerLoading, error: sellerError, data: sellerData } = useQuery(GET_USER, {
    variables: { id: product?.userId }, // Pass product's userId to fetch seller
    skip: !product?.userId, // Skip query if product's userId is not available
    fetchPolicy: 'network-only',
  });

  // Update product state when data is loaded
  useEffect(() => {
    if (productData && productData.product) {
      setProduct(productData.product); // Set the fetched product details in state
    }
  }, [productData]);

  // Update seller state when seller data is loaded
  useEffect(() => {
    if (sellerData && sellerData.getUser) {
      setSeller(sellerData.getUser); // Set the fetched seller details in state
    }
  }, [sellerData]);

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
  if (productLoading) return <p>Loading product details...</p>;
  if (productError) return <p>Error loading product: {productError.message}</p>;
  if (!product) return <p>No product found.</p>;

  // Render loading or error for seller info
  if (sellerLoading) return <p>Loading seller information...</p>;
  if (sellerError) return <p>Error loading seller information: {sellerError.message}</p>;

  return (
    <div className="purchase-product-container">
      {/* Return to Browse Products Button */}
      <button onClick={() => navigate('/dashboard/browse-products')} className="return-to-browse-button">
        Return to Browse
      </button>

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

      {/* Display Seller Information */}
      {seller && (
        <div className="seller-info">
          <p><strong>Seller Name:</strong> {seller.firstName} {seller.lastName}</p>
          <p><strong>Seller Email:</strong> {seller.email}</p>
        </div>
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
