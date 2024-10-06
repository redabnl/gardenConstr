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


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>  {/* Use Routes instead of Switch */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/contact" element={<ContactForm />} />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-services" element={<ManageServices />} />
        <Route path="/admin/add-service" element={<AddService />} />
      </Routes>
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

