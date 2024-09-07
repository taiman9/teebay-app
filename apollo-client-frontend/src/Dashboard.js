// src/Dashboard.js
import React from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import EditProduct from './components/EditProduct';
//import ProductCacheReader from './components/ProductCacheReader';
import { useUser } from './context/UserContext';

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
    <div>
      <h1>Dashboard</h1>
      
      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          width: '80px',  // Set a fixed width to reduce the button size
          textAlign: 'center'
        }}
      >
        Logout
      </button>
      
      <div>
        <h2>Product Management</h2>
        
        {/* Link to Add Product Component */}
        <section>
          <h2>Add Product Link</h2>
          <p>
            <Link to="/dashboard/add-product">Add Product</Link>
          </p>
        </section>

        {/* Link to View Products */}
        <section>
          <h2>View Products</h2>
          <p>
            <Link to="/dashboard/products">View My Products</Link>
          </p>
        </section>

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
