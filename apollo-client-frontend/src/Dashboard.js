// src/Dashboard.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';  // Import Link, Route, and Routes for navigation
import AddProduct from './components/AddProduct';  // Import the AddProduct component
import { useUser } from './context/UserContext';  // Import the user context

function Dashboard() {
  const { user } = useUser();  // Get the user from context

  // Debugging to check if user is available
  console.log('Current user:', user);

  if (!user) {
    return <p>Please log in to manage products.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Product Management</h2>
        {/* Link to Add Product Component */}
        <section>
          <h2>Add Product Link</h2>
          <p>
            <Link to="/dashboard/add-product">Add Product</Link> {/* Use Link for navigation */}
          </p>
        </section>

        {/* Define Routes within the Dashboard component */}
        <Routes>
          <Route
            path="add-product"  // Route path for AddProduct component
            element={<AddProduct userId={user.id} onProductAdded={() => console.log('Product added!')} />} 
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
