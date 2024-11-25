import React from 'react';
import AdminSidebar from './SideBar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminDashboard = () => {
  return (
    <DashboardWrapper>
      <Header>Admin Dashboard</Header>
      <IntroText>
        Welcome to the admin panel. Here you can manage services, projects, inquiries, and users.
      </IntroText>

      {/* Services Section */}
      <SectionHeading>Services Management</SectionHeading>
      <NavigationLinks>
        <StyledLink to="/admin/manage-services">Manage Services</StyledLink>
        <StyledLink to="/admin/add-service">Add New Service</StyledLink>
      </NavigationLinks>

      {/* Projects Section */}
      <SectionHeading>Project Management</SectionHeading>
      <NavigationLinks>
        <StyledLink to="/admin/new-project">Add New Projects</StyledLink>
        <StyledLink to="/admin/manage-projects">Project Management</StyledLink>
      </NavigationLinks>

      {/* Inquiries Section */}
      <SectionHeading>Inquiries Management</SectionHeading>
      <NavigationLinks>
        <StyledLink to="/admin/manage-inquiries">Manage Inquiries</StyledLink>
      </NavigationLinks>
    </DashboardWrapper>
  );
};

export default AdminDashboard;

const DashboardWrapper = styled.div`
  padding: 2rem;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const IntroText = styled.p`
  text-align: center;
  margin-bottom: 2rem;
`;

const SectionHeading = styled.h2`
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
`;

const NavigationLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StyledLink = styled(Link)`
  background-color: #28a745;
  color: white;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  text-decoration: none;
  width: 200px;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;


// const AdminDashboard = () => {
//   return (
//     <DashboardWrapper>
//       <Header>Admin Dashboard</Header>
//       <IntroText>Welcome to the admin panel. Here you can manage services, projects, inquiries, and users.</IntroText>
//       <NavigationLinks>
//         <StyledLink to="/admin/manage-services">Manage Services</StyledLink>
//         <StyledLink to="/admin/add-service">Add New Service</StyledLink>
//         <StyledLink to="/admin/add-project">Add New Projects</StyledLink>
//         <StyledLink to="/admin/manage-projects">Project Management</StyledLink>
//         <StyledLink to="/admin/manage-inquiries">Manage Inquiries</StyledLink>



//         {/* Add more navigation links as needed */}
//       </NavigationLinks>
//     </DashboardWrapper>
//   );
// };

// export default AdminDashboard;

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



