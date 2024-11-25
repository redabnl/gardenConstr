import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    location: '',
    completed_at: '',
    gallery_images: []
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      gallery_images: e.target.files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = new FormData();
    projectData.append('title', formData.title);
    projectData.append('description', formData.description);
    projectData.append('category', formData.category);
    projectData.append('duration', formData.duration);
    projectData.append('location', formData.location);
    projectData.append('completed_at', formData.completed_at);

    for (let i = 0; i < formData.gallery_images.length; i++) {
      projectData.append('gallery_images', formData.gallery_images[i]);
    }

    try {
      await axios.post('http://localhost:5000/api/admin/project', projectData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Project added successfully!');
      navigate('/admin/manage-projects');
    } catch (error) {
      setError('Error adding project');
    }
  };

  return (
    <AddProjectWrapper>
      <h2>Add a New Project</h2>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="E.g., Landscaping, Construction"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="E.g., 3 weeks, 1 month"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter project location"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="completed_at">Completion Date</label>
          <input
            type="date"
            name="completed_at"
            id="completed_at"
            value={formData.completed_at}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gallery_images">Upload Images</label>
          <input
            type="file"
            name="gallery_images"
            id="gallery_images"
            onChange={handleFileChange}
            multiple
            required
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </AddProjectWrapper>
  );
};

const AddProjectWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input,
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    input[type='file'] {
      border: none;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export default NewProject;
