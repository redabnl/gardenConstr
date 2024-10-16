import React, { useState, useEffect } from 'react';
import FilterBar from './filterBar';
import axios from 'axios'; // Assuming you're using Axios for requests
import styled from 'styled-components';

export const FilterButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;



const ServiceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  gap: 20px;
  padding: 40px;
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


const services = [
    { 
      title: "Deck Building", 
      description: "We provide custom-designed decks, perfect for outdoor living and entertaining.", 
      image: "/img/services/deckWood.jpg" 
    },
    { 
      title: "Landscaping", 
      description: "Beautifully crafted landscapes tailored to fit the needs of your home and vision.", 
      image: "/img/no_image.jpg" 
    },
    { 
      title: "Garden Construction", 
      description: "We help you create beautiful garden spaces with customized designs and efficient execution.", 
      image: "/img/services/garden.jpg" 
    },
    { 
      title: "Fence Installation", 
      description: "Secure and elegant fences to provide privacy and enhance the aesthetic of your property.", 
      image: "/img/services/deck1.png" 
    }
  ];
  
  const ServicesDisplay = () => (
    <ServiceContainer>
      {services.map((service) => (
        <ServiceCard key={service._id}>
          <ServiceImage src={service.image || 'img/services/serviceIMG.jpg'} alt={service.title} />
          <ServiceTitle>{service.title}</ServiceTitle>
          <p>{service.description}</p>
          <ServiceButton href={`/services/${service._id}`}>Learn More</ServiceButton>
        </ServiceCard>
      ))}
    </ServiceContainer>
  );
  
  export default ServicesDisplay;