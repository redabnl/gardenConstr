import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

function ContactForm() {
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    phone_number: '',
    service_id: '',  // Now we store the service ID
    message: ''
  });

  const [services, setServices] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');  // For success messages
  const [errorMessage, setErrorMessage] = useState('');      // For error messages

  // Fetch services when component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);  // Assuming the backend returns an array of services
        
      } catch (error) {
        console.error('Error fetching services:', error);
        setErrorMessage('');
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/inquiries', formData);
      console.log('Inquiry sent:', response.data);
      setSuccessMessage('your inquiry was sent succesfully, we will get back to you later');
      setErrorMessage('');
    } catch (error) {
      console.error('Error sending inquiry:', error);
      setErrorMessage('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Select a Service</Form.Label>
        <Form.Control
          as="select"
          name="service_id"  // We now store the service ID
          value={formData.service_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a service</option>
          {services.map(service => (
            <option key={service._id} value={service._id}>{service.title}</option>  // Store service_id as value
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <button type="submit">Submit</button>
    </Form>
  );
}

export default ContactForm;
