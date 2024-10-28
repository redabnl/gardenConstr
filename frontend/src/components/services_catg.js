import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ServicesCategories = () => {
    // States for outdoor and indoor services
  const [outdoorServices, setOutdoorServices] = useState([]);
  const [indoorServices, setIndoorServices] = useState([]);

  // Fetch services from backend API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        const services = response.data;
        console.log(`services fetched ${services}`)

        // Filter services into indoor and outdoor categories
        const outdoor = services.filter(service => service.is_outdoor);
        const indoor = services.filter(service => !service.is_outdoor);

        setOutdoorServices(outdoor);
        setIndoorServices(indoor);

        console.log(`indoor services : ${indoor}`)
        console.log(`outdoor services : ${outdoor}`)
        
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);
//   // Dummy data for testing
//   const outdoorServices = [
//     {
//       title: 'Deck Building',
//       description: 'We offer high-quality custom decks.',
//       imageUrl: 'img/default.jpg', // Replace with an actual image path or URL
//       link: '/services'
//     }
//   ];

//   const indoorServices = [
//     {
//       title: 'Indoor Renovations',
//       description: 'Transform your interiors with our renovation services.',
//       imageUrl: 'img/default.jpg', // Replace with an actual image path or URL
//       link: '/services'
//     }
//   ];

  return (
    <Container>
      <Title>Our Services</Title>
      <MainSection>
        {/* Outdoor Services Card */}
        {outdoorServices.length > 0 && (
          <ServiceCard>
            <CardTitle>{outdoorServices[0].title}</CardTitle>
            <CardImage src={'img/outdoor_sketch.jpg'} alt="Outdoor Service" />
            <CardDescription>{outdoorServices[0].description}</CardDescription>
            <CardButton to={`/services/${outdoorServices[0]._id}`}>Explore Outdoor</CardButton>
          </ServiceCard>
        )}
        
        {/* Indoor Services Card */}
        {indoorServices.length > 0 && (
          <ServiceCard>
            <CardTitle>{indoorServices[0].title}</CardTitle>
            <CardImage src={ 'img/indoor_sketch.png'} alt="Indoor Service" />
            <CardDescription>{indoorServices[0].description}</CardDescription>
            <CardButton to={`/services/${indoorServices[0]._id}`}>Explore Indoor</CardButton>
          </ServiceCard>
        )}
      </MainSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 40px;
  margin-top: 40px;
`;

const ServiceCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 20px;
`;

const CardButton = styled(Link)`
  background-color: #6c757d;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  font-size: 1rem;
`;

// Export the component
export default ServicesCategories;
