// src/components/MutationComponent.js
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// Define your GraphQL mutation
const ADD_DATA = gql`
  mutation AddData($name: String!, $description: String!) {
    addData(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const MutationComponent = () => {
  const [name, setName] = useState('');
  const [email, setDescription] = useState('');

  const [addData, { data, loading, error }] = useMutation(ADD_DATA, {
    refetchQueries: ["GetData"], // Refetch the GET_DATA query after mutation
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addData({ variables: { name, email } });
    setName('');
    setDescription('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Data</button>
      </form>

      {data && (
        <div>
          <p>New data added:</p>
          <p>{data.addData.name}</p>
        </div>
      )}
    </div>
  );
};

export default MutationComponent;
