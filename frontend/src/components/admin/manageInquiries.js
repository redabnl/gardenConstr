import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inquiries', {
          headers: {
            'x-access-token': localStorage.getItem('admin_token')
          }
        });
        setInquiries(response.data.message);
      } catch (error) {
        setError('Error fetching inquiries');
      }
    };

    fetchInquiries();
  }, []);

  const handleResponse = async (inquiryId) => {
    console.log("received inquiry ID in handle responde : ", inquiryId)
    const responseMessage = prompt('Enter your response:');
    if (!responseMessage) return;
  
    try {
      const url = `http://localhost:5000/api/inquiries/${inquiryId}/respond`;
      console.log(`Sending request to: ${url}`);
      
      await axios.put(url, {
        response_message: responseMessage,
      }, {
        headers: {
          'x-access-token': localStorage.getItem('admin_token'),
        },
      });
  
      alert('Response sent successfully');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error responding to the inquiry');
    }
  };
  
  return (
    <div>
      <h2>Manage Inquiries</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Service</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {inquiries.map((inquiry, index) => (
                <tr key={index}>
                <td>{inquiry.client_name}</td>
                <td>{inquiry.service_id}</td>
                <td>{inquiry.message}</td>
                <td>{inquiry.status}</td>
                <td>
                {console.log("Inquiry object:", inquiry)}  {/* Log the inquiry object */}
                {console.log("Inquiry ID:", inquiry._id)}
                    {/* Log the inquiry id before calling the function */}
                    <button onClick={() => {
                    // console.log("Inquiry object:", inquiry);
                    handleResponse(inquiry._id);
                    }}>Respond</button>
                </td>
                </tr>
            ))}
        </tbody>


      </table>
    </div>
  );
};

export default ManageInquiries;
