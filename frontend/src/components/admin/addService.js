import React, { useState } from 'react';
import axios from 'axios';

function AddService() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_range: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/services', formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('admin_token')
        }
      });

      setSuccess('Service added successfully!');
      setFormData({ title: '', description: '', price_range: '' });  // Clear form
    } catch (error) {
      setError('Error adding service');
    }
  };

  return (
    <div className="add-service">
      <h2>Add a New Service</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price Range</label>
          <input
            type="text"
            name="price_range"
            value={formData.price_range}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
}

export default AddService;
