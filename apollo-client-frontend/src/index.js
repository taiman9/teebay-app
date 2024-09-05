// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // For React 18
import App from './App';
import { MultiApolloProvider } from './ApolloClients';  // Import the multi-subgraph Apollo Provider

const root = ReactDOM.createRoot(document.getElementById('root'));  // Using React 18's createRoot

root.render(
  <React.StrictMode>
    <MultiApolloProvider>
      <App />
    </MultiApolloProvider>
  </React.StrictMode>
);
