import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../mutation_product';  // Import the query to fetch products
import { useNavigate } from 'react-router-dom';  // Import Link and useNavigate for navigation
import DeleteProduct from './DeleteProduct';  // Import DeleteProduct component
import './ProductsList.css';  // Import CSS for styling

// Helper function to format date
const formatDate = (timestamp) => {
  if (!timestamp) return 'Invalid Date';  // Check for null or undefined values

  const date = new Date(parseInt(timestamp, 10));  // Convert timestamp to a Date object
  if (isNaN(date.getTime())) return 'Invalid Date';  // Check if the date is valid

  const options = { year: 'numeric', month: 'long', day: 'numeric' };  // e.g., January 1, 2024
  return date.toLocaleDateString(undefined, options);  // Format the date
};

// ProductsList component
function ProductsList({ userId }) {  // Accept userId as a prop
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Fetch products from the server with userId filter
  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS, {
    variables: { userId },  // Filter products by userId
    fetchPolicy: 'network-only',  // Always fetch from the network to ensure fresh data
  });

  // Refetch products when the component is mounted or when userId changes
  useEffect(() => {
    refetch();  // Refetch products from the server
  }, [refetch, userId]);  // Run the effect when refetch function or userId changes

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  // Filter products where buyerId and buyDate are null
  const filteredProducts = data.products.filter(
    (product) => product.buyerId === null && product.buyDate === null
  );

  return (
    <div className="products-list">
      <h2>My Products</h2>

      {/* Render Products */}
      <div className="products-container">
        {filteredProducts.map((product) => (  // Use filteredProducts here
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            {product.rentPrice !== null && (  // Display rent price only if it's not null
              <p><strong>Rent/Day:</strong> ${product.rentPrice}</p>
            )}
            <p><strong>Categories:</strong> {product.categories.map(category => category.name).join(', ')}</p>
            <p><strong>Date Posted:</strong> {formatDate(product.createdAt)}</p>  {/* Display the formatted date */}
            <div className="product-actions">
              {/* Smaller Edit button */}
              <button
                className="small-btn"
                onClick={() => navigate(`/dashboard/edit-product/${product.id}`)}
              >
                Edit
              </button>
              {/* Delete button */}
              <DeleteProduct productId={product.id} onProductDeleted={refetch} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
