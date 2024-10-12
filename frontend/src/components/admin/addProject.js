import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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
      gallery_images: e.target.files  // Make sure this stores the selected files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = new FormData();
    projectData.append('title', formData.title);
    projectData.append('description', formData.description);
    projectData.append('location', formData.location);
    projectData.append('completed_at', formData.completed_at);
    
    // Add multiple images to FormData
    for (let i = 0; i < formData.gallery_images.length; i++) {
      projectData.append('gallery_images', formData.gallery_images[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/projects', projectData, {
        headers: {
        //   'x-access-token': localStorage.getItem('admin_token'),
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Project added successfully!');
      navigate('/admin/manage-projects'); // Redirect to project management page
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
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        <input type="date" name="completed_at" value={formData.completed_at} onChange={handleChange} required />
        <input type="file" name="gallery_images" onChange={handleFileChange} multiple />
        <button type="submit">Add Project</button>
     </form>
    </AddProjectWrapper>
  );
};

// Styled components for the form
const AddProjectWrapper = styled.div`
  padding: 20px;
`;

const SuccessMessage = styled.p`
  color: green;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default AddProject;
