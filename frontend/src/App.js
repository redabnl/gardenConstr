import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Services from './components/services';
import ContactForm  from './components/contact_form';
import Hero from './components/hero';
import NavigationBar from './components/admin/navbar';
import AdminLogin from './components/admin/adminLogin';
// import AdminDashboard from './components/AdminDashboard';  // We will create this next

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={ContactForm} />
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        {/* <Route path="/admin/dashboard" component={AdminDashboard} /> */}
      </Switch>
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

