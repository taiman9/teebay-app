import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PRODUCT_BUYER } from '../mutation_product'; // Import the mutation to update product buyer info
import { GET_PRODUCT_BY_ID } from '../mutation_product'; // Import necessary queries

function BuyProduct({ userId, productId }) {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [product, setProduct] = useState(null); // State to store product details

  // Mutation hook for updating the product's buyerId and buyDate
  const [updateProductBuyer] = useMutation(UPDATE_PRODUCT_BUYER);

  // Fetch product details using product ID
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
    fetchPolicy: 'network-only', // Ensure fresh data is fetched from the server
  });

  // Update state when data is loaded
  useEffect(() => {
    if (data && data.product) {
      setProduct(data.product); // Set the fetched product details in state
    }
  }, [data]); // Dependency on data to ensure the state is updated correctly

  const handleBuyProduct = async () => {
    if (!product) {
      alert('Product information is not available.');
      return;
    }

    try {
      // Update the product's buyerId and buyDate in the Products table
      const updateResponse = await updateProductBuyer({
        variables: {
          id: product.id,
          buyerId: userId,
          buyDate: new Date().toISOString(), // Current date as buyDate
        },
      });

      if (updateResponse.errors) {
        console.error('Error updating product buyer information:', updateResponse.errors);
        alert('Failed to update product buyer information. Please try again.');
        return;
      }

      alert('Product bought successfully!');
      navigate('/dashboard/browse-products'); // Redirect to the browse products page after a successful operation
    } catch (error) {
      console.error('Error buying product:', error.message || error);
      alert('Failed to buy the product. Please try again.');
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;

  return (
    <div className="buy-product-container">
      <h2>Confirm Purchase</h2>
      {product ? (
        <>
          <p>Do you want to buy the following product?</p>
          <p>
            <strong>Title:</strong> {product.title}
          </p>
          <p>
            <strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}
          </p>
          <div className="confirmation-buttons">
            {/* Render buttons for confirmation */}
            <button onClick={handleBuyProduct} className="btn btn-confirm">Yes</button>
            <button onClick={() => navigate(`/dashboard/purchase-product/${product.id}`)} className="btn btn-cancel">No</button>
          </div>
        </>
      ) : (
        <p>Product information is not available.</p>
      )}
    </div>
  );
}

export default BuyProduct;
