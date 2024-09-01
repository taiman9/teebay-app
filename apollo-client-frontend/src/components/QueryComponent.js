// src/components/QueryComponent.js
import React from 'react';
import { gql, useQuery } from '@apollo/client';

// Define your GraphQL query
const GET_DATA = gql`
  query GetData {
    data {
      id
      name
      email
    }
  }
`;

const QueryComponent = () => {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {data.data.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryComponent;
