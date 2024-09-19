// src/components/AddProduct.js
import React, { useState } from 'react';
import Select from 'react-select';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_CATEGORIES, ADD_PRODUCT } from '../mutations/mutation_product';
import './AddProduct.css';  // Import the CSS file for styling

// AddProduct component
function AddProduct({ userId, onProductAdded }) {
  const [step, setStep] = useState(1);  // Track the current step
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');  // State to hold the rent price, allow empty string for null
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errors, setErrors] = useState({});  // State to hold error messages
  const [successMessage, setSuccessMessage] = useState('');  // State to hold success message

  const navigate = useNavigate();  // Initialize navigate for routing

  // Fetch categories from the server
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_ALL_CATEGORIES);

  // Set up the mutation with the useMutation hook
  const [addProduct, { loading: addProductLoading, error: addProductError }] = useMutation(ADD_PRODUCT, {
    onCompleted: (data) => {
      console.log('Product added successfully:', data.addProduct);
      setSuccessMessage('Product added successfully!');
      setTimeout(() => {
        navigate('/dashboard');  // Navigate back to Dashboard after 2 seconds
      }, 2000);
      setTitle('');
      setDescription('');
      setPrice('');
      setRentPrice('');  // Reset rent price
      setSelectedCategories([]);
      setStep(1);  // Reset to the first step
      if (onProductAdded) onProductAdded();  // Callback to refresh the product list or show a success message
    },
    onError: (error) => {
      console.error('Error adding product:', error);
    },
  });

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map(option => parseInt(option.value, 10)));  // Convert to integers
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1 && !title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (step === 2 && selectedCategories.length === 0) {
      newErrors.categories = 'Please select at least one category.';
    }
    if (step === 3 && !description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (step === 4) {
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        newErrors.price = 'Invalid price. Price must be a positive number.';
      }
      // rentPrice can be empty or a valid positive number
      if (rentPrice && (isNaN(parseFloat(rentPrice)) || parseFloat(rentPrice) <= 0)) {
        newErrors.rentPrice = 'Invalid rent price. Rent price must be a positive number or left empty.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;  // Prevent submission if validation fails

    const parsedPrice = parseFloat(price);
    const parsedRentPrice = rentPrice !== '' ? parseFloat(rentPrice) : null;  // Handle null value for rentPrice

    addProduct({
      variables: {
        title,
        description,
        price: parsedPrice,
        rentPrice: parsedRentPrice,  // Include rent price in variables
        userId,
        categoryIds: selectedCategories,
      },
    });
  };

  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Error loading categories: {categoriesError.message}</p>;

  const categoryOptions = categoriesData.categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  const nextStep = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
      setErrors({});  // Clear errors on successful validation
    }
  };

  const prevStep = () => setStep(prevStep => prevStep - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Select Title for Your Product</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
            <div className="button-container">
              <button type="button" className="btn" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>Select Categories</h2>
            <Select
              isMulti
              name="categories"
              options={categoryOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCategoryChange}
              value={categoryOptions.filter(option => selectedCategories.includes(parseInt(option.value, 10)))}
              placeholder="Type to search categories..."
            />
            {errors.categories && <p className="error-message">{errors.categories}</p>}
            <div className="button-container">
              <button type="button" className="btn" onClick={prevStep}>Back</button>
              <button type="button" className="btn" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>Select Description</h2>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-input"
              rows="4"
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
            <div className="button-container">
              <button type="button" className="btn" onClick={prevStep}>Back</button>
              <button type="button" className="btn" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h2>Select Price and Rent Price</h2>
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="form-input"
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
            <input
              type="number"
              step="0.01"
              placeholder="Rent Price per Day (Optional)"
              value={rentPrice}
              onChange={(e) => setRentPrice(e.target.value)}
              className="form-input"
            />
            {errors.rentPrice && <p className="error-message">{errors.rentPrice}</p>}
            <div className="button-container">
              <button type="button" className="btn" onClick={prevStep}>Back</button>
              <button type="button" className="btn" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-step">
            <h2>Summary</h2>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Categories:</strong> {selectedCategories.map(id => categoryOptions.find(option => option.value === id.toString())?.label).join(', ')}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Rent Price per Day:</strong> {rentPrice ? `$${rentPrice}` : 'N/A'}</p> {/* Display N/A if rentPrice is null */}
            <div className="button-container">
              <button type="button" className="btn" onClick={prevStep}>Back</button>
              <button type="button" className="btn" onClick={handleSubmit} disabled={addProductLoading}>Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      {addProductError && <p className="error-message">Error: {addProductError.message}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {renderStep()}
    </div>
  );
}

export default AddProduct;
