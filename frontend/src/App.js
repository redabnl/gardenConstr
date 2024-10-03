import React from 'react';
import NavigationBar from './components/navbar';
import Hero from './components/hero';
import Services from './components/services';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Hero />
      <Services />
    </div>
  );
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <NavigationBar />
//       <h1>Welcome to Your Client’s Construction Website</h1>
//       <p>This will be the main entry point for the frontend.</p>
//     </div>
//   );
// }

