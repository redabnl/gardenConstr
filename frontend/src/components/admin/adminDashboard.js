import React from 'react';
import AdminSidebar from './SideBar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const AdminDashboard = () => {
  return (
    <DashboardWrapper>
      <Header>Admin Dashboard</Header>
      <IntroText>Welcome to the admin panel. Here you can manage services, projects, inquiries, and users.</IntroText>
      <NavigationLinks>
        <StyledLink to="/admin/manage-services">Manage Services</StyledLink>
        <StyledLink to="/admin/add-service">Add New Service</StyledLink>
        <StyledLink to="/admin/add-project">Add New Projects</StyledLink>
        <StyledLink to="/admin/manage-projects">Project Management</StyledLink>


        {/* Add more navigation links as needed */}
      </NavigationLinks>
    </DashboardWrapper>
  );
};

export default AdminDashboard;

// function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       <AdminSidebar />
//       <div className="content">
//         <h2>Welcome to the Admin Panel</h2>
//         <p>Here you can manage services, projects, inquiries, and users.</p>
//         <div className="admin-actions">
//           {/* Add actions or cards for quick access to sections */}
//           <div className="card">
//             <h3>Services</h3>
//             <p>Manage the services offered by the company.</p>
//             <Link to="/admin/manage-services">Manage Services</Link>
//           </div>
//           <div className="card">
//             <h3>Projects</h3>
//             <p>Manage completed and ongoing projects.</p>
//             <Link to="/admin/manage-projects">Manage Projects</Link>
//           </div>
//           <div className="card">
//             <h3>Inquiries</h3>
//             <p>View and respond to client inquiries.</p>
//             <Link to="/admin/manage-inquiries">Manage Inquiries</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const NavigationLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #4caf50;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  font-size: 1.1rem;

  &:hover {
    background-color: #45a049;
  }
`;