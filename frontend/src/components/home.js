import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Styled Components
const HomeWrapper = styled.div`
  font-family: 'Arial', sans-serif;
`;

const Section = styled.section`
  padding: 3rem 0;
  text-align: center;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ServiceItem = styled.div`
  flex: 1;
  margin: 1rem;
  min-width: 250px;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  color: white;
  background-color: #007bff;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    background-color: #0056b3;
  }
`;


const Home = () => {
  return (
    <HomeWrapper>
      <Section className="welcome-section">
        <Container>
          <h1>Welcome to Our Website</h1>
          <p>
            We provide top-quality services in garden and deck construction. Explore our services and let us help you transform your outdoor spaces.
          </p>
          <StyledLink className="btn btn-primary" href="/services">
            View Our Services
          </StyledLink>
        </Container>
      </Section>

      <Section className="featured-services">
        <Container>
          <h2>Our Featured Services</h2>
          <ServiceGrid>
            <ServiceItem>
              <h3>Deck Building</h3>
              <p>Custom-designed decks that are perfect for outdoor living.</p>
            </ServiceItem>
            <ServiceItem>
              <h3>Landscaping</h3>
              <p>Beautiful landscapes designed and built to fit your home.</p>
            </ServiceItem>
            <ServiceItem>
              <h3>Garden Construction</h3>
              <p>We create custom gardens tailored to your vision.</p>
            </ServiceItem>
          </ServiceGrid>
          <StyledLink className="btn btn-secondary" href="/services">
            Explore All Services
          </StyledLink>
        </Container>
      </Section>

      <Section className="cta-section">
        <Container>
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today to get a free consultation on your next garden or deck construction project.</p>
          <StyledLink className="btn btn-primary" href="/contact">
            Contact Us
          </StyledLink>
        </Container>
      </Section>
    </HomeWrapper>
  );
};

export default Home;






// import React from 'react';
// import { Link } from 'react-router-dom';
// import Hero from './hero';  // Your existing Hero component

// function Home() {
//   return (
//     <div className="home">
//       {/* Hero Section */}
//       {/* <Hero /> */}
      
//       {/* Welcome Message */}
//       <section className="welcome-section">
//         <div className="container">
//           <h1>Welcome to Our Website</h1>
//           <p>We provide top-quality services in garden and deck construction. Explore our services and let us help you transform your outdoor spaces.</p>
//           <Link to="/services" className="btn btn-primary">View Our Services</Link>
//         </div>
//       </section>

//       {/* Featured Services */}
//       <section className="featured-services">
//         <div className="container">
//           <h2>Our Featured Services</h2>
//           <div className="services-grid">
//             <div className="service-item">
//               <h3>Deck Building</h3>
//               <p>Custom-designed decks that are perfect for outdoor living.</p>
//             </div>
//             <div className="service-item">
//               <h3>Landscaping</h3>
//               <p>Beautiful landscapes designed and built to fit your home.</p>
//             </div>
//             <div className="service-item">
//               <h3>Garden Construction</h3>
//               <p>We create custom gardens tailored to your vision.</p>
//             </div>
//           </div>
//           <Link to="/services" className="btn btn-secondary">Explore All Services</Link>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section">
//         <div className="container">
//           <h2>Ready to Start Your Project?</h2>
//           <p>Contact us today to get a free consultation on your next garden or deck construction project.</p>
//           <Link to="/contact" className="btn btn-primary">Contact Us</Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;
