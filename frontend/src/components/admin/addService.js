import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';  // Importing Bootstrap components


function AddService() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_range: '', 
    tags : ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const serviceData = {
      title: formData.title,
      description: formData.description,
      tags : formData.tags.split(',').map(tag => tag.trim()),
      price_range: formData.price_range
    };
    
      const response = await axios.post('http://localhost:5000/api/admin/services',serviceData,
      {
        headers: {
          'Content-Type': 'application/json'
          // 'x-access-token': localStorage.getItem('admin_token')
        }
      
      });

      setSuccess('Service added successfully!');
      setFormData({ title: '', description: '', price_range: '', tags: ''});  // Clear form
    } catch (error) {
      setError('Error adding service : ', console.error( error));

     
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">Add a New Service</h2>

          {message && (
            <div className="alert alert-success text-center">
              {message}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="serviceTitle" className="mb-3">
              <Form.Label>Service Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                placeholder="Enter service title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="serviceDescription" className="mb-3">
              <Form.Label>Service Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description" 
                placeholder="Enter service description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="serviceTags" className="mb-3">
              <Form.Label>Tags (comma-separated)</Form.Label>
              <Form.Control 
                type="text" 
                name="tags" 
                placeholder="Enter tags for service"
                value={formData.tags}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="servicePriceRange" className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <Form.Control 
                type="text" 
                name="price_range" 
                placeholder="Enter price range"
                value={formData.price_range}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Add Service
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddService;