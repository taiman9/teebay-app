import React from 'react';
import { Link, Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import EditProduct from './components/EditProduct';
import BrowseProducts from './components/BrowseProducts';
import PurchaseProduct from './components/PurchaseProduct';
import BuyProduct from './components/BuyProduct';
import { useUser } from './context/UserContext';
import './Dashboard.css';

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
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Wrapper for My Information and Manage Products */}
      <div className="dashboard-sections-wrapper">
        {/* My Information Section */}
        <div className="dashboard-section my-information-section">
          <h2>My Information</h2>
          <div className="dashboard-links-vertical">
            {/* Update the link to redirect to /transactions */}
            <Link to="/transactions" className="link-button my-info-button">View Transactions</Link>
            <Link to="/personal-info" className="link-button my-info-button">Personal Information</Link>
          </div>
        </div>

        {/* Manage Products Section */}
        <div className="dashboard-section manage-products-section">
          <h2>Manage Products</h2>
          <div className="dashboard-links">
            <Link to="/dashboard/add-product" className="link-button product-button">Add Product</Link>
            <Link to="/dashboard/products" className="link-button product-button">View My Products</Link>
            <Link to="/dashboard/browse-products" className="link-button product-button">Browse Products</Link>
          </div>
        </div>
      </div>

      {/* Define Routes within the Dashboard component */}
      <Routes>
        <Route path="add-product" element={<AddProduct userId={user.id} onProductAdded={() => console.log('Product added!')} />} />
        <Route path="products" element={<ProductsList userId={user.id} />} />
        <Route path="browse-products" element={<BrowseProducts userId={user.id} />} />
        <Route path="purchase-product/:productId" element={<PurchaseProductRoute />} />
        <Route path="buy-product" element={<BuyProductRoute />} />
        <Route path="edit-product/:productId" element={<EditProductRoute />} />
      </Routes>
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

// Wrapper component to handle route params and pass them to PurchaseProduct
function PurchaseProductRoute() {
  const { productId } = useParams();
  const { user } = useUser();

  if (!user) {
    return <p>Please log in to purchase products.</p>;
  }

  return (
    <PurchaseProduct userId={user.id} productId={productId} />
  );
}

// Wrapper component to handle state passed from PurchaseProduct to BuyProduct
function BuyProductRoute() {
  const location = useLocation();
  const { userId, productId } = location.state || {};

  if (!userId || !productId) {
    return <p>Invalid product or user information.</p>;
  }

  return (
    <BuyProduct userId={userId} productId={productId} />
  );
}

export default Dashboard;
