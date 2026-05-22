import React, { useState } from 'react';
import { createItem, uploadImage } from '../services/api';
import '../styles/ItemForm.css';

function ItemForm({ onItemAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Create item
      const newItem = await createItem(formData);

      // Upload image if provided
      if (image) {
        await uploadImage(newItem.id, image);
      }

      // Reset form
      setFormData({ title: '', description: '', price: '' });
      setImage(null);

      onItemAdded();
    } catch (err) {
      setError('Failed to create item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Enter item title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter item description"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          step="0.01"
          placeholder="Enter item price"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Item'}
      </button>
    </form>
  );
}

export default ItemForm;
