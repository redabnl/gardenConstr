import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    opacity: 0.9;
  }
`;

const EditProject = ({ match }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    completed_at: '',
    gallery_images: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${match.params.id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProject();
  }, [match.params.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/projects/${match.params.id}`, formData, {
        headers: {
          'x-access-token': localStorage.getItem('admin_token'),
        },
      });
      alert('Project updated successfully');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Edit Project</FormTitle>
      <form onSubmit={handleSubmit}>
        <Label>Title:</Label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <Label>Description:</Label>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <Label>Location:</Label>
        <Input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <Label>Completed At:</Label>
        <Input
          type="date"
          name="completed_at"
          value={formData.completed_at}
          onChange={handleChange}
        />

        <Label>Gallery Images:</Label>
        <Input
          type="text"
          name="gallery_images"
          value={formData.gallery_images}
          onChange={handleChange}
        />

        <Button type="submit">Update Project</Button>
      </form>
    </FormWrapper>
  );
};

export default EditProject;
