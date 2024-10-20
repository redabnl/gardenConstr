import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeroSection from './hero';


// Styled Components
const FeaturedServicesSection = styled.section`
  padding: 80px 0;
  text-align: center;
  background-color: #f8f9fa;
`;

const ServiceCard = styled.div`
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 20px;
  }

  p {
    color: #6c757d;
  }
`;

const ButtonSecondary = styled.a`
  display: inline-block;
  margin-top: 40px;
  padding: 10px 30px;
  background-color: #343a40;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #495057;
  }
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// const HeroSection = styled.section`
//   text-align: center;
//   margin-bottom: 50px;
  
// //   h1 {
// //     font-size: 3rem;
// //     margin-bottom: 20px;
// //   }

// //   p {
// //     font-size: 1.2rem;
// //     color: #555;
// //   }
// // `;

// const FeaturedServicesSection = styled.section`
//   text-align: center;
//   margin-bottom: 50px;

//   h2 {
//     font-size: 2.5rem;
//     margin-bottom: 30px;
//   }
// `;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  flex: 0 0 30%;
  max-width: 30%;
  margin-bottom: 20px;
`;

// const Card = styled.div`
//   background-color: #f9f9f9;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   padding: 20px;
//   text-align: center;

//   h3 {
//     font-size: 1.5rem;
//     margin-bottom: 10px;
//   }

//   p {
//     color: #777;
//   }
// `;

const ButtonPrimary = styled(Link)`
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
`;

// const ButtonSecondary = styled(Link)`
//   background-color: #6c757d;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   color: #fff;
//   font-size: 1rem;
//   text-decoration: none;
//   margin-top: 20px;
//   display: inline-block;
// `;

const CTASection = styled.section`
  text-align: center;
  margin-top: 50px;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <div>
      <HeroSection />
      {/* Your existing Featured Services and CTA Section */}
      </div>
      

       {/* Featured Services Section */}
      <FeaturedServicesSection>
      <Container>
        <h2>Our Featured Services</h2>
        <Row>
          {services.slice(0, 3).map((service, index) => (
            <Col key={index} md={4}>
              <ServiceCard>
                <img src={service.images || "/img/no_image.jpg"} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </ServiceCard>
            </Col>
          ))}
        </Row>
        <ButtonSecondary href="/services">Explore All Services</ButtonSecondary>
      </Container>
      </FeaturedServicesSection>

      {/* CTA Section */}
      <CTASection>
      <Container>
        <h2>Ready to Start Your Project?</h2>
        <p>Contact us today to get a free consultation on your next garden or deck construction project.</p>
        <ButtonPrimary href="/contact">Contact Us</ButtonPrimary>
      </Container>
    </CTASection>
    </div>
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
