import { useApolloClient } from '@apollo/client';
import { GET_ALL_PRODUCTS } from './mutations';  // Replace with your actual query

function getProductsFromCache() {
  const client = useApolloClient();  // Get the Apollo Client instance

  try {
    const data = client.readQuery({
      query: GET_ALL_PRODUCTS,
    });
    console.log('Cached data:', data);
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
}
