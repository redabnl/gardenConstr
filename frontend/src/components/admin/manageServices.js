import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Alert, Spinner } from 'react-bootstrap';

function ManageServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services when the component loads
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services', {
          headers: {
            'x-access-token': localStorage.getItem('admin_token'),
          },
        });
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Manage Services</h2>
      
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table responsive bordered hover className="text-center">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price Range</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map(service => (
                <tr key={service._id}>
                  <td>{service.title}</td>
                  <td>{service.description}</td>
                  <td>{service.price_range}</td>
                  <td>
                    <Button variant="warning" className="me-2">Edit</Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No services found</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ManageServices;
