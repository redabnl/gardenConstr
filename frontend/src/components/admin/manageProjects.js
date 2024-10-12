import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    location: '',
    completed_at: '',
    gallery_images: [],
  });
  const [editProjectId, setEditProjectId] = useState(null);

  // Fetch all projects when component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/projects', {
          headers: {
            'x-access-token': localStorage.getItem('admin_token')
          }
        });
        setProjects(response.data.projects);
      } catch (error) {
        setError('Error fetching projects: ', error);
      }
    };
    fetchProjects();
  }, []);

  // Handle input change for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Trigger edit mode and pre-fill the form with the project's data
  const handleEdit = (project) => {
    setEditMode(true);
    setEditProjectId(project._id);
    setEditData({
      title: project.title,
      description: project.description,
      location: project.location,
      completed_at: project.completed_at.split('T')[0], // For date input formatting
      gallery_images: project.gallery_images || [],
    });
  };

  // Handle project update submission
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/projects/${editProjectId}`, editData, {
        headers: {
          'x-access-token': localStorage.getItem('admin_token'),
        },
      });
      if (response.status === 200) {
        alert('Project updated successfully');
        setEditMode(false);
        // Re-fetch projects to update the list after editing
        const updatedProjects = await axios.get('http://localhost:5000/api/admin/projects', {
          headers: {
            'x-access-token': localStorage.getItem('admin_token')
          }
        });
        setProjects(updatedProjects.data.projects);
      }
    } catch (error) {
      alert('Error updating project');
    }
  };

  // Handle project deletion
  const handleDelete = async (projectId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/projects/${projectId}`, {
        headers: {
          'x-access-token': localStorage.getItem('admin_token')
        }
      });
      if (response.status === 200) {
        alert('Project deleted successfully!');
        // Re-fetch the projects to update the list
        setProjects(projects.filter(project => project._id !== projectId));
      }
    } catch (error) {
      alert('Error deleting project');
    }
  };

  return (
    <div className="manage-projects">
      <h2>Manage Projects</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {editMode ? (
        <div>
          <h3>Edit Project</h3>
          <form onSubmit={handleUpdateProject}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Completed At:</label>
              <input
                type="date"
                name="completed_at"
                value={editData.completed_at}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Gallery Images:</label>
              <input
                type="text"
                name="gallery_images"
                value={editData.gallery_images}
                onChange={handleInputChange}
                placeholder="Comma-separated image paths"
              />
            </div>
            <button type="submit">Update Project</button>
          </form>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Completed At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.location}</td>
                <td>{new Date(project.completed_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(project)}>Edit</button>
                  <button onClick={() => handleDelete(project._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageProjects;
