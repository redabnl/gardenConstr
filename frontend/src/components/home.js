import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeroSection from './hero';
import ServicesCategories from './services_catg';
import FeaturedProjects from './featured_projects';
import Conclusion from './conclusion';
import Testimonials from './testimonials';
import Footer from './footer';
import Banner from './banner';
// import FeaturedProjects from './featured_projects';


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

// const ButtonSecondary = styled.a`
//   display: inline-block;
//   margin-top: 40px;
//   padding: 10px 30px;
//   background-color: #343a40;
//   color: white;
//   text-decoration: none;
//   border-radius: 5px;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #495057;
//   }
// `;
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

const ButtonSecondary = styled(Link)`
  background-color: #6c757d;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  margin-top: 20px;
  display: inline-block;
`;

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

const FeaturedProjectsSection = styled.div`
  margin: 2rem 0;
  text-align: center;

  h2 {
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }

  .project-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .project-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 300px;
    text-align: left;
  }

  .project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .project-content {
    padding: 1rem;
  }

  .project-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .project-description {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .learn-more {
    background-color: #6c757d;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    width: 100%;
  }
`;

const GridItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Makes the grid responsive */
  gap: 20px;
`;

// const ProjectGrid = styled.div`
//   position: relative;
//   overflow: hidden;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
//   &:hover {
//     transform: scale(1.05);
//     transition: 0.3s ease;
//   }
  
// `;
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 0 auto;
    jsutify-content: center
`;

// const ProjectGrid = styled.div`
//     position: relative; 
//     overflow: hidden;
//     border-radius: 8px;
//     box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.1);
//     cursor: pointer;
//     &:hover {
//         transform: scale(1.05);
//         transition: 0.3s ease;
//     }
// `;
const ProjectGrid = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: 0.3s ease;
  }
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 280px;
    object-fit: cover;
    transition: all 0.3s ease-in-out;
`;

const ProjectHover = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    transition: opacity 0.3s ease-in-out;
    ${ProjectGrid}:hover & {
        opacity: 1;
    }
`;


const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
`;

// const ProjectImage = styled.img`
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   transition: all 0.3s ease-in-out;
// `;

// const ProjectHover = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.6);
//   color: white;
//   opacity: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 10px;
//   transition: opacity 0.3s ease-in-out;
//   ${ProjectGrid}:hover & {
//     opacity: 1;
//   }
// `;


  // const [services, setServices] = useState([]);

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/services');
  //       setServices(response.data);
  //     } catch (error) {
  //       console.error('Error fetching services:', error);
  //     }
  //   };
  //   fetchServices();
  // }, []);

const Home = () => {



  return (
    <div>
      <div >
        <HeroSection />
      </div>
      
      <ServicesCategories />

      <Title>Our Featured Projects</Title>


      <FeaturedProjects />
      
      





      <Conclusion />
            

      <Testimonials />
      {/* CTA Section */}
      <CTASection>
        <Container>
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today to get a free consultation on your next garden or deck construction project.</p>
          <ButtonPrimary href="/contact">Contact Us</ButtonPrimary>
        </Container>
      </CTASection>
      
      <Banner />
      <Footer/>



    </div>
        );
      };

 export default Home;



      {/* <FeaturedProjectsSection>
      <h2>Our Featured Projects</h2>
      <div className="project-grid">
        {projects.slice(0, 3).map((project, index) => (
          <div className="project-card" key={index}>
            <img
              src={project.gallery_images[0] || "/img/no_image.jpg"}
              alt={project.title}
              className="project-image"
            />
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <a href={`/projects/${project._id}`} className="learn-more">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </FeaturedProjectsSection> */}






       {/* Featured Services Section */}
       {/* <section className="featured-services">
        <div className="container">
          <h2>Our Featured Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Deck Building</h3>
              <p>Custom-designed decks that are perfect for outdoor living.</p>
            </div>
            <div className="service-item">
              <h3>Landscaping</h3>
              <p>Beautiful landscapes designed and built to fit your home.</p>
            </div>
            <div className="service-item">
              <h3>Garden Construction</h3>
              <p>We create custom gardens tailored to your vision.</p>
            </div>
          </div>
          <Link to="/services" className="btn btn-secondary">Explore All Services</Link>
        </div>
      </section> */}
      {/* <FeaturedProjectsSection>
      <Container>
                <h2>Our Featured Projects</h2>
                <Row>
                    {projects.slice(0, 3).map((project, index) => (
                        <Col key={index} md={4}>
                            <div className="service-card">
                                <img
                                    src={project.gallery_images[0] || "/img/no_image.jpg"}
                                    alt={project.title}
                                />
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <a href={`/projects/${project._id}`} className="btn btn-primary">Learn More</a>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
      </FeaturedProjectsSection> */}



      // PROJECT MAPPING WITH PICTURE HOVER ### STYLE ALREADY IN CODE PORTFOLIO.JS

      // <GridItem>
        
      //   {projects.map((project, index) => (
      //     <ProjectGrid key={index} onClick={() => setSelectedProject(project)}>
      //       <ProjectImage
      //         src={project.gallery_images[0]} /* Ensure the image path is correct */
      //         alt={project.title}
      //       />
      //       <ProjectHover>
      //         <h3>{project.title}</h3>
      //         <p>{project.brief}</p>
      //       </ProjectHover>
      //     </ProjectGrid>
      //   ))}
      // </GridItem>





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
      // <section className="featured-services">
      //   <div className="container">
      //     <h2>Our Featured Services</h2>
      //     <div className="services-grid">
      //       <div className="service-item">
      //         <h3>Deck Building</h3>
      //         <p>Custom-designed decks that are perfect for outdoor living.</p>
      //       </div>
      //       <div className="service-item">
      //         <h3>Landscaping</h3>
      //         <p>Beautiful landscapes designed and built to fit your home.</p>
      //       </div>
      //       <div className="service-item">
      //         <h3>Garden Construction</h3>
      //         <p>We create custom gardens tailored to your vision.</p>
      //       </div>
      //     </div>
      //     <Link to="/services" className="btn btn-secondary">Explore All Services</Link>
      //   </div>
      // </section>

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
