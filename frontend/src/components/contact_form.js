import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

// Styled components
const StyledFormWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
`;

const FormControl = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #28a745;
  }

  &[as='textarea'] {
    resize: vertical;
    min-height: 120px;
  }

  &[as='select'] {
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;



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
    <StyledFormWrapper>
      <h2>Contact Us</h2>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="client_name">Name</label>
          <FormControl
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">Email</label>
          <FormControl
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="phone_number">Phone Number</label>
          <FormControl
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="service_id">Select a Service</label>
          <FormControl as="select" name="service_id" value={formData.service_id} onChange={handleChange} required>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.title}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup>
          <label htmlFor="message">Message</label>
          <FormControl
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    </StyledFormWrapper>
  );
};

export default ContactForm;