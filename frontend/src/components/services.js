import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeroSection from './hero';
import { Link } from 'react-router-dom';
import Conclusion from './conclusion';



const ServicesContainer = styled.div`
  background-color: #f9f9f9;
  padding: 60px 20px;
  text-align: center;
`;

const ServiceCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);  // You can change the value to 3 to match the desired layout
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 400px;  // Adjust height based on your preference
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ServiceOverlay = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  color: #fff;
  padding: 20px;
  text-align: left;
`;

const ServiceTitle = styled.h3`
  font-size: 24px;
  margin: 0;
`;

const ServiceDescription = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const LearnMoreButton = styled.a`
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  color: #fff;
  background-color: #28a745;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

// const ServiceCard = styled.div`
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   padding: 1.5rem;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: transform 0.2s ease;

//   &:hover {
//     transform: translateY(-5px);
//   }
// `;

// const ServiceImage = styled.img`
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   border-radius: 8px 8px 0 0;
// `;

// const ServiceTitle = styled.h3`
//   margin: 1rem 0 0.5rem;
//   font-size: 1.5rem;
// `;

// const ServiceDescription = styled.p`
//   font-size: 1rem;
//   color: #666;
// `;

// const ActionButton = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   padding: 0.75rem 1.5rem;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-top: 1rem;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

const Services = () => {
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
      < HeroSection/>
    <ServicesContainer>
      <ServiceCardContainer>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <ServiceImage src={'/img/serices/serviceIMG.jpg'} alt={service.title} />
            <ServiceOverlay>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <Link to="/">Learn More</Link>
            </ServiceOverlay>
          </ServiceCard>
        ))}
      </ServiceCardContainer>
    </ServicesContainer>
    <Conclusion />
    </div>
  );
};

export default Services;



// function Services() {
//   const services = [
//     { title: "Deck Building", description: "High-quality custom decks", imageUrl: "path_to_image" },
//     { title: "Landscaping", description: "Beautiful landscaping designs", imageUrl: "path_to_image" }
//   ];

  // return (
  //   <Container id="services">
  //     <h2>Our Services</h2>
  //     <Row>
  //       {services.map((service, index) => (
  //         <Col md={4} key={index}>
  //           <Card className="mb-4">
  //             <Card.Img variant="top" src={service.imageUrl} />
  //             <Card.Body>
  //               <Card.Title>{service.title}</Card.Title>
  //               <Card.Text>{service.description}</Card.Text>
  //             </Card.Body>
  //           </Card>
  //         </Col>
  //       ))}
  //     </Row>
  //   </Container>
  // );
// }

// export default Services;
