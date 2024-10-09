import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCogs, FaEnvelope, FaProjectDiagram, FaUsers } from 'react-icons/fa'; // For icons

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100 sidebar bg-dark text-white p-3">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin/adminDaashboard" className="nav-link text-white">
            <FaHome className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/manage-services" className="nav-link text-white">
            <FaCogs className="me-2" /> Manage Services
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/manageProjects" className="nav-link text-white">
            <FaProjectDiagram className="me-2" /> Manage Projects
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/inquiries" className="nav-link text-white">
            <FaEnvelope className="me-2" /> View Inquiries
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/manage-admins" className="nav-link text-white">
            <FaUsers className="me-2" /> Manage Admin Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
