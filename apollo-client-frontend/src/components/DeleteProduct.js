// src/components/DeleteProduct.js
import React, { useState }  from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from '../mutation_product';  // Import the delete product mutation and the query to fetch all products
import './DeleteProduct.css';  // Import custom CSS for styling

function DeleteProduct({ productId, onProductDeleted }) {
  const [message, setMessage] = useState('');  // State to store success or error message
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    update(cache, { data: { deleteProduct } }) {
      if (deleteProduct) {  // Only update the cache if deletion was successful
        // Remove the deleted product from the Apollo Client cache
        cache.modify({
          fields: {
            products(existingProductsRefs, { readField }) {
              return existingProductsRefs.filter(
                productRef => readField('id', productRef) !== productId
              );
            },
          },
        });
      }
    },
    onCompleted: () => {
        setMessage('Product deleted successfully.');  // Set success message
        setTimeout(() => {
          onProductDeleted();  // Refresh the product list after deletion
          setMessage('');  // Clear message after delay
        }, 2000);  // Delay of 2 seconds
    },
    onError: (error) => {
        console.error('Error deleting product:', error);
        setMessage(`Error deleting product: ${error.message}`);  // Set error message
        setTimeout(() => setMessage(''), 2000);  // Clear message after delay
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct({ variables: { id: productId } });  // Call the mutation with the product ID
    }
  };

  return (
    <div>
      {message && <p className="message">{message}</p>}  {/* Display success or error message */}
      <button className="delete-button" onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default DeleteProduct;
