import React, { useState, useEffect } from 'react';
import Select from 'react-select';  // Import React Select
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES, EDIT_PRODUCT, GET_PRODUCT_BY_ID } from '../mutations/mutation_product';  // Import necessary GraphQL queries and mutations
import './EditProduct.css';  // Import custom CSS for styling

function EditProduct({ productId, onClose, onProductUpdated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');  // New state for rentPrice
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // New state for success message

  // Fetch product details to edit
  const { loading: productLoading, data: productData, error: productError } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
    skip: !productId,
  });

  // Fetch all categories
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_ALL_CATEGORIES);

  // Update product mutation
  const [editProduct, { loading: editProductLoading }] = useMutation(EDIT_PRODUCT, {
    onCompleted: (data) => {
      setSuccessMessage('Product has been edited');  // Set success message on successful update
      
      setTimeout(() => {
        setSuccessMessage('');  // Clear success message after 2 seconds
        onProductUpdated();  // Notify parent component about the update after delay
        onClose();  // Close modal after 2-second delay
      }, 2000);  // Delay of 2 seconds
    },
    onError: (error) => {
      setError(error.message);  // Show error message on update failure
    },
  });

  // Update state when product data is fetched
  useEffect(() => {
    if (productData && productData.product) {
      const { title, description, price, rentPrice, categories } = productData.product;  // Include rentPrice
      setTitle(title);
      setDescription(description);
      setPrice(price);
      setRentPrice(rentPrice !== null ? rentPrice : '');  // Handle null rentPrice by setting an empty string
      setSelectedCategories(
        categories.map((category) => ({ value: category.id.toString(), label: category.name }))
      );  // Use objects for React Select
    }
  }, [productData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || price <= 0 || selectedCategories.length === 0) {
      setError('All fields are required and must be correctly filled.');
      return;
    }

    // Convert selected categories back to an array of integers
    const categoryIds = selectedCategories.map((category) => parseInt(category.value, 10));

    // Execute the mutation to update the product
    editProduct({
      variables: {
        id: productId,
        title,
        description,
        price: parseFloat(price),
        rentPrice: rentPrice ? parseFloat(rentPrice) : null,  // Allow null for rentPrice
        categoryIds,  // Send as an array of integers
      },
    });
  };

  if (productLoading || categoriesLoading) return <p>Loading...</p>;  // Display loading state

  if (productError) return <p>Error loading product: {productError.message}</p>;
  if (categoriesError) return <p>Error loading categories: {categoriesError.message}</p>;

  // Prepare options for React Select
  const categoryOptions = categoriesData.categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return (
    <div className="edit-product-container"> {/* Modal styling using custom CSS */}
      <div className="edit-product-content">
        {/* Close button in the top right corner */}
        <button className="close-btn small-close-btn" onClick={onClose}>&times;</button>
        <h2>Edit Product</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}  {/* Display success message */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rentPrice">Rent Price (optional)</label>
            <input
              type="number"
              id="rentPrice"
              value={rentPrice}
              onChange={(e) => setRentPrice(e.target.value)}
              step="0.01"
              min="0"
              placeholder="Leave empty if not applicable"
            />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <Select
              id="categories"
              isMulti
              options={categoryOptions}
              value={selectedCategories}
              onChange={(selectedOptions) => setSelectedCategories(selectedOptions)}  // Update state with selected options
              placeholder="Select categories..."
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          {/* Make the button smaller */}
          <button type="submit" className="small-btn" disabled={editProductLoading}>Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
