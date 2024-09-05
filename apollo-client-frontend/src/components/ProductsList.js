// src/components/ProductsList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch all products
const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      title
      description
      price
      categories {
        id
        name
      }
      owner {
        id
      }
    }
  }
`;

function ProductsList() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Products List</h2>
      {data.products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Owner ID: {product.owner.id}</p>
          <p>Categories: {product.categories.map((category) => category.name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
