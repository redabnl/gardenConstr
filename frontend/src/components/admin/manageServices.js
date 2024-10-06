import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch services when the component loads
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services', {
          headers: {
            'x-access-token': localStorage.getItem('admin_token')
          }
        });
        setServices(response.data);
      } catch (error) {
        setError('Error fetching services');
      }
    };
    
    fetchServices();
  }, []);

  return (
    <div className="manage-services">
      <h2>Manage Services</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price Range</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service._id}>
              <td>{service.title}</td>
              <td>{service.description}</td>
              <td>{service.price_range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageServices;
