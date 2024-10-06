import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. Here you can manage services, projects, inquiries, and users.</p>

      {/* Links to various management sections */}
      <ul>
        <li><Link to="/admin/manage-services">Manage Services</Link></li>
        <li><Link to="/admin/add-service">Add New Service</Link></li>
        {/* You can add links for other sections like managing inquiries, projects, etc. */}
      </ul>
    </div>
  );
}

export default AdminDashboard;
