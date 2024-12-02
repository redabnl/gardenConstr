import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use 'Routes' instead of 'Switch'
import Services from './components/services';
import ContactForm from './components/contact_form';
import Hero from './components/hero';
import NavigationBar from './components/navbar';
import AdminLogin from './components/admin/adminLogin';
import AdminDashboard from './components/admin/adminDashboard';
import Home from './components/home';  // Import Home Component
import ManageServices from './components/admin/manageServices';
import AddService from './components/admin/addService';
import AddProject from './components/admin/addProject';
import ManageProjects from './components/admin/manageProjects';
import ManageInquiries from './components/admin/manageInquiries';
import PortfolioPage from './components/portfolio';
import ProjectSlider from './components/projectSlider';
import ProjectDetails from './components/projectDetails';
import ServicesDisplay from './components/servicesDisplay';
import NewProject from './components/admin/newProject'


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectGallery from './components/projects_gallery';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef /* Light grey shade */
    color: #333; /* Text color for better readability */
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
`;



function App() {
  return (
    <Router>
      <>
        <GlobalStyle />
        <NavigationBar />
        
        
        <Routes>  {/* Use Routes instead of Switch */}
          
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects/portfolio"  element={<PortfolioPage />} />
          <Route path="/projects/gallery"  element={<ProjectGallery />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/contact" element={<ContactForm />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* PROJECTS MANAGEMENT  */}
          <Route path="/admin/add-project" element={<AddProject />} />
          <Route path="/admin/new-project" element={<NewProject />} />

          <Route path="/admin/manage-projects" element={<ManageProjects />} />
          <Route path="/admin/manage-inquiries" element={<ManageInquiries />} />

          {/* INQUIRIES MANAGEMENT */}
          <Route path="/admin/manage-inquiries" element={<ManageInquiries />} />
          
          {/* SERVICES MANAGEMENT  */}

          <Route path="/admin/manage-services" element={<ManageServices />} />
          <Route path="/admin/add-service" element={<AddService />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;





// import React from 'react';
// import NavigationBar from './components/navbar';
// import Hero from './components/hero';
// import Services from './components/services';

// function App() {
//   return (
//     <div className="App">
//       <NavigationBar />
//       <Hero />
//       <Services />
//     </div>
//   );
// }

// export default App;


// function App() {
//   return (
//     <div className="App">
//       <NavigationBar />
//       <h1>Welcome to Your Client’s Construction Website</h1>
//       <p>This will be the main entry point for the frontend.</p>
//     </div>
//   );
// }

