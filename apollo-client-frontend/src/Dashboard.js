// src/Dashboard.js
import React from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import EditProduct from './components/EditProduct';
import BrowseProducts from './components/BrowseProducts';  // Import BrowseProducts component
import { useUser } from './context/UserContext';
import './Dashboard.css';  // Import the CSS file for styling

function Dashboard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    logout();  // Clear user context
    navigate('/');  // Redirect to home page
  };

  if (!user) {
    return <p>Please log in to manage products.</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Dashboard</h1>
        {/* Logout Button */}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      <div>
        <h2>Manage Products</h2>
        
        {/* Links for Add Product, View Products, and Browse Products side by side */}
        <div className="dashboard-links">
          <Link to="/dashboard/add-product" className="link-button">Add Product</Link>
          <Link to="/dashboard/products" className="link-button">View My Products</Link>
          <Link to="/dashboard/browse-products" className="link-button">Browse Products</Link> {/* New link for Browse Products */}
        </div>

        {/* Define Routes within the Dashboard component */}
        <Routes>
          {/* Route for adding a new product */}
          <Route
            path="add-product"
            element={<AddProduct userId={user.id} onProductAdded={() => console.log('Product added!')} />} 
          />
          
          {/* Route for listing user's products */}
          <Route
            path="products"
            element={<ProductsList userId={user.id} />}
          />
          
          {/* Route for browsing products not owned by the user */}
          <Route
            path="browse-products"
            element={<BrowseProducts userId={user.id} />}  // Pass userId to BrowseProducts component
          />
          
          {/* Route for editing a product by productId */}
          <Route
            path="edit-product/:productId"
            element={<EditProductRoute />}
          />
        </Routes>
      </div>
    </div>
  );
}

// Wrapper component to handle route params and pass them to EditProduct
function EditProductRoute() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <EditProduct
      productId={productId}
      isOpen={true}
      onClose={() => navigate('/dashboard/products')}
      onProductUpdated={() => {
        console.log('Product updated!');
        navigate('/dashboard/products');
      }}
    />
  );
}

export default Dashboard;
