import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  text-align: left;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  font-size: 14px;
  background-color: ${(props) => (props.delete ? '#dc3545' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #007bff;
  margin-top: 20px;
`;

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/projects', {
          headers: {
            'x-access-token': localStorage.getItem('admin_token'),
          },
        });
        setProjects(response.data);
      } catch (error) {
        setError('Failed to fetch projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (projectId) => {
    navigate(`/admin/edit-project/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: {
          'x-access-token': localStorage.getItem('admin_token'),
        },
      });
      alert('Project deleted successfully!');
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      alert('Failed to delete project. Please try again.');
    }
  };

  return (
    <div className="manage-projects">
      <h2>Manage Projects</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <LoadingMessage>Loading projects...</LoadingMessage>
      ) : projects.length === 0 ? (
        <NoDataMessage>No projects available to display.</NoDataMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Title</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Completed At</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <TableData>{project.title}</TableData>
                <TableData>{project.description}</TableData>
                <TableData>{project.location}</TableData>
                <TableData>
                  {project.completed_at
                    ? new Date(project.completed_at).toLocaleDateString()
                    : 'N/A'}
                </TableData>
                <TableData>
                  <Button onClick={() => handleEdit(project._id)}>Edit</Button>
                  <Button delete onClick={() => handleDelete(project._id)}>Delete</Button>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ManageProjects;
