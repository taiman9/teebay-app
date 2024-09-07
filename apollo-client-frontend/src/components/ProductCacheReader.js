// src/components/ProductCacheReader.js
import React, { useEffect, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../mutations';  // Replace with your actual query

function ProductCacheReader() {
  const client = useApolloClient();  // Get the Apollo Client instance

  // Memoized function to read products from cache
  const getProductsFromCache = useCallback(() => {
    try {
      const data = client.readQuery({
        query: GET_ALL_PRODUCTS,
      });
      console.log('Cached data:', data);  // Log cached data to console
    } catch (error) {
      console.error('Error reading from cache:', error);  // Log any errors
    }
  }, [client]);  // Include client in dependencies to avoid stale closure

  // Call the function when the component renders
  useEffect(() => {
    getProductsFromCache();
  }, [getProductsFromCache]);  // Include the memoized function in the dependency array

  return (
    <div>
      <h2>Check the console for cached product data.</h2>
      <button onClick={getProductsFromCache}>Read Products from Cache</button>
    </div>
  );
}

export default ProductCacheReader;
