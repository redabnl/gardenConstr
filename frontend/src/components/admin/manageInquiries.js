import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  background-color: #4CAF50;
  color: white;
  text-align: left;
  padding: 12px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 8px 12px;
  margin: 5px;
  color: white;
  background-color: ${props => (props.action === 'respond' ? '#28a745' : '#dc3545')};
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${props => (props.action === 'respond' ? '#218838' : '#c82333')};
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  color: white;
  background-color: ${props => (props.status === 'resolved' ? '#28a745' : '#ffc107')};
  border-radius: 12px;
`;


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

  const [filter, setFilter] = useState('all');
const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

// Filter function
const filteredInquiries = inquiries.filter(inquiry => {
  if (filter === 'all') return true;
  return inquiry.status === filter;
});

// Sorting function
const sortedInquiries = filteredInquiries.sort((a, b) => {
  if (sortOrder === 'asc') return new Date(a.created_at) - new Date(b.created_at);
  return new Date(b.created_at) - new Date(a.created_at);
});

const handleFilterChange = (e) => {
  setFilter(e.target.value);
};

const handleSortChange = (e) => {
  setSortOrder(e.target.value);
};

// In your return:
return (
  <Container>
    <Title>Manage Inquiries</Title>

    {/* Filter and Sort Options */}
    <div>
      <label htmlFor="filter">Filter by Status: </label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
      </select>

      <label htmlFor="sortOrder" style={{ marginLeft: '20px' }}>Sort by Date: </label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <Table>
      <thead>
        <tr>
          <Th>Client Name</Th>
          <Th>Service</Th>
          <Th>Message</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {sortedInquiries.map(inquiry => (
          <tr key={inquiry._id}>
            <Td>{inquiry.client_name}</Td>
            <Td>{inquiry.service_id}</Td>
            <Td>{inquiry.message}</Td>
            <Td><StatusBadge status={inquiry.status}>{inquiry.status}</StatusBadge></Td>
            <Td>
              <Button action="respond" onClick={() => handleResponse(inquiry._id)}>Respond</Button>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);

}
  
  // return (
    
    // <div>
    //   <h2>Manage Inquiries</h2>
    //   {error && <p>{error}</p>}
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Client Name</th>
    //         <th>Service</th>
    //         <th>Message</th>
    //         <th>Status</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //         {inquiries.map((inquiry, index) => (
    //             <tr key={index}>
    //             <td>{inquiry.client_name}</td>
    //             <td>{inquiry.service_id}</td>
    //             <td>{inquiry.message}</td>
    //             <td>{inquiry.status}</td>
    //             <td>
    //             {console.log("Inquiry object:", inquiry)}  {/* Log the inquiry object */}
    //             {console.log("Inquiry ID:", inquiry._id)}
    //                 {/* Log the inquiry id before calling the function */}
    //                 <button onClick={() => {
    //                 // console.log("Inquiry object:", inquiry);
    //                 handleResponse(inquiry._id);
    //                 }}>Respond</button>
    //             </td>
    //             </tr>
    //         ))}
    //     </tbody>


    //   </table>
    // </div>
  // );
// };

export default ManageInquiries;
