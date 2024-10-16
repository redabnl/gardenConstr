import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const ServiceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
  transform: translateY(-5px);
}
`;


const ServiceImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ServiceButton = styled.a`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
`;

const ServicesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
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
    <ServicesWrapper>
      {services.map((service) => (
        <ServiceCard key={service._id}>
          <ServiceImage src={service.image || 'img/services/serviceIMG.jpg'} alt={service.title} />
          <ServiceTitle>{service.title}</ServiceTitle>
          <p>{service.description}</p>
          <ServiceButton href={`/services/${service._id}`}>Learn More</ServiceButton>
        </ServiceCard>
      ))}
    </ServicesWrapper>
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
