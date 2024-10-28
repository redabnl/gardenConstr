import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ContactFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const CheckboxContainer = styled.div`
  margin: 10px 0;
`;

const CheckboxLabel = styled.label`
  margin-right: 10px;
`;

const FileInput = styled.input`
  display: block;
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function ContactForm() {
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    phone_number: '',
    service_id: '',
    message: '',
    address: '',
    length_width: '',
    start_time: '',
    note: '',
    material: [],
    source: '',
    file: null,
  });

  const [services, setServices] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch services from backend
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setErrorMessage('Failed to load services');
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleMaterialChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      let updatedMaterials = prevData.material;
      if (checked) {
        updatedMaterials = [...updatedMaterials, value];
      } else {
        updatedMaterials = updatedMaterials.filter((item) => item !== value);
      }
      return { ...prevData, material: updatedMaterials };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/inquiries', formData);
      setSuccessMessage('Your inquiry was sent successfully, we will get back to you later');
      console.log('Inquiry sent:', response.data);
    } catch (error) {
      setErrorMessage('Failed to send inquiry');
    }
  };

  return (
    <ContactFormContainer>
      <form onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <InputField
          type="text"
          name="client_name"
          placeholder="Nom/Name"
          value={formData.client_name}
          onChange={handleInputChange}
          required
        />
        <InputField
          type="email"
          name="email"
          placeholder="Adresse courriel/Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <InputField
          type="text"
          name="phone_number"
          placeholder="Cellulaire/Cell Phone"
          value={formData.phone_number}
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          name="address"
          placeholder="Adresse/Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          name="length_width"
          placeholder="Quelle est la longueur et la largeur approximatives du patio?"
          value={formData.length_width}
          onChange={handleInputChange}
        />
        
          {/* <label>Type de matériaux que vous aimeriez utiliser?</label>
          <CheckboxLabel>
            <input type="checkbox" value="Composite" onChange={handleMaterialChange} /> Composite
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" value="Indécise" onChange={handleMaterialChange} /> Indécise
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" value="Bois traité" onChange={handleMaterialChange} /> Bois traité
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" value="Cèdre" onChange={handleMaterialChange} /> Cèdre
          </CheckboxLabel> */}
        
        <label htmlFor="service_id">Select a Service</label>
        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleInputChange}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.title}
            </option>
          ))}
        </select>

        
        
        <InputField
          type="text"
          name="start_time"
          placeholder="Date idéale de commencement"
          value={formData.start_time}
          onChange={handleInputChange}
        />

        <Select name="source" onChange={handleInputChange}>
          <option value="">Comment avez-vous pris connaissance de Gazon Nordic?</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="Recommendation">Recommendation</option>
          
        </Select>

        <TextArea
          name="note"
          placeholder="Note (optional)"
          value={formData.note}
          onChange={handleInputChange}
        />

        <FileInput type="file" name="file" onChange={handleFileChange} />

        <SubmitButton type="submit">Envoyer/Submit</SubmitButton>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </ContactFormContainer>
  );
}

export default ContactForm;
