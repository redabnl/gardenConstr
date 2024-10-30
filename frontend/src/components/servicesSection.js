import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {Carousel} from 'react-responsive-carousel'; // Ensure you have this installed

const ServicesSection = ({ services }) => {
    const [filteredServices, setFilteredServices] = useState([]);
    const [activeFilter, setActiveFilter] = useState('outdoor');
    const [serviceImages, setServiceImages] = useState({});
    const [selectedService, setSelectedService] = useState(null);

    const fetchImages = async (galleryPath, serviceId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/service_images/${galleryPath}`);
            const images = await response.json();
            const fullImagePaths = images.map(image => `http://localhost:5000${image}`);
            setServiceImages(prev => ({ ...prev, [serviceId]: fullImagePaths }));
        } catch (error) {
            console.error("Error fetching service images:", error);
        }
    };

    useEffect(() => {
        const filtered = services.filter(service =>
            activeFilter === 'indoor' ? !service.is_outdoor : service.is_outdoor
        );
        setFilteredServices(filtered);
        filtered.forEach(service => {
            if (service.gallery_path && !serviceImages[service._id]) {
                fetchImages(service.gallery_path, service._id);
            }
        });
    }, [services, activeFilter]);

    return (
        <ServicesContainer>
            {/* Left section for selected service details */}
            <ServiceDetailsSect>
                {selectedService ? (
                    <div>
                        <ServiceTitle>{selectedService.title}</ServiceTitle>
                        <ServiceDescription>{selectedService.description}</ServiceDescription>
                        {serviceImages[selectedService._id] && (
                            <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
                                {serviceImages[selectedService._id].map((image, idx) => (
                                    <div key={idx}>
                                        <img src={image} alt={`${selectedService.title} ${idx + 1}`} />
                                    </div>
                                ))}
                            </Carousel>
                        )}
                    </div>
                ) : (
                    <p>Select a service to view details.</p>
                )}
            </ServiceDetailsSect>

            {/* Right section for list of services */}
            <ServicesList>
                <FilterContainer>
                    <FilterButton
                        isActive={activeFilter === 'indoor'}
                        onClick={() => setActiveFilter('indoor')}
                    >
                        Indoor Services
                    </FilterButton>
                    <FilterButton
                        isActive={activeFilter === 'outdoor'}
                        onClick={() => setActiveFilter('outdoor')}
                    >
                        Outdoor Services
                    </FilterButton>
                </FilterContainer>
                <GridContainer>
                    {filteredServices.map((service, index) => (
                        <ServiceCard key={index} onClick={() => setSelectedService(service)}>
                        {/* Your card content here */}
                        {serviceImages[service._id] && serviceImages[service._id].length > 0 ? (
                            <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
                            {serviceImages[service._id].map((image, idx) => (
                                <div key={idx}>
                                <ProjectImage src={image} alt={`${service.title} ${idx + 1}`} />
                                </div>
                            ))}
                            </Carousel>
                        ) : (
                            <ProjectImage src="/img/no_image.jpg" alt={service.title} />
                        )}
                        
                        {/* Overlay with service title and description */}
                        <ServiceOverlay>
                            <ServiceTitle>{service.title}</ServiceTitle>
                            {/* <ServiceDescription>{service.description}</ServiceDescription> */}
                        </ServiceOverlay>
                        </ServiceCard>
                    ))}
                </GridContainer>

            </ServicesList>
        </ServicesContainer>
    );
};
// {/* <GridContainer>
//     {filteredServices.map((service, index) => (
//         <ServiceCard key={index} onClick={() => setSelectedService(service)}>
//             {serviceImages[service._id] && serviceImages[service._id].length > 0 ? (
//                 <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
//                     {serviceImages[service._id].map((image, idx) => (
//                         <div key={idx}>
//                             <img src={image} alt={`${service.title} ${idx + 1}`} />
//                         </div>
//                     ))}
//                 </Carousel>
//             ) : (
//                 <img src="/img/no_image.jpg" alt={service.title} />
//             )}
//             <ServiceOverlay>
//                 <ServiceTitle>{service.title}</ServiceTitle>
//             </ServiceOverlay>
//         </ServiceCard>
//     ))}
// </GridContainer> */}

// Styled Components

const ServicesContainer = styled.div`
    display: flex;
     
`;

const ServiceDetailsSect = styled.div`
    width: 35%;
    padding: 20px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        font-size: 2rem;
        margin-bottom: 10px;
    }

    p {
        font-size: 1rem;
        color: #555;
        text-align: center;
        max-width: 600px;
        line-height: 1.6;
    }
`;

const ServicesList = styled.div`
    width: 65%;
    padding: 20px;
    overflow-y: auto; /* Enables scrolling if content overflows */
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const FilterButton = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: ${({ isActive }) => (isActive ? '#333' : '#ddd')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? '#555' : '#ccc')};
    }
`;

// const GridContainer = styled.div`
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     grid-gap: 20px;
//     width: 100%;
//     padding: 20px;

// `;
const GridContainer = styled.div`
  display: grid;
  border: 1px solid #fff;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  grid-template-rows: repeat(2, auto); /* 2 rows */
  gap: 20px; /* Space between grid items */
  padding: 10px;
  
`;
const ServiceCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%; /* Set a fixed height */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProjectImage = styled.img`
  width: 100%;
  object-fit: cover;
  position: relative;
  display: block;
`;

// const ServiceCard = styled.div`
//   position: relative;
//   max-width: 350px;
//   max-height: 300px; /* Set a fixed height for uniformity */
//   overflow: hidden;
//   cursor: pointer;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   background-color: #fff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid #ddd; /* Thin border for separation */

// `;
// const ServiceCardImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover; /* Makes the image cover the card without distortion */
//   border-radius: 8px #fff; /* To match the rounded corners of the card */
// `;


const ServiceOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  color: white;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease, color 0.3s ease; /* Transition for hover effect */

  &:hover {
    opacity: 1;
    color: #FFD700; /* Change to your desired hover color */
  }
`;

// const ServiceOverlay = styled.div`
//     position: absolute;
//     bottom: 0;
//     width: 100%;
//     background: rgba(0, 0, 0, 0.5);
//     color: #fff;
//     padding: 10px;
//     text-align: center;
// `;

// Title and Description styles
// const ServiceTitle = styled.h2`
//     font-size: 1.5rem;
//     color: #333;
// `;

// const ServiceDescription = styled.p`
//     font-size: 1rem;
//     color: #555;
//     text-color: white;
// `;
const ServiceTitle = styled.h3`
  font-size: 1.2em;
  margin: 0;
  color: inherit; /* Inherit color from ServiceOverlay */
  transition: color 0.3s ease;
`;

const ServiceDescription = styled.p`
  font-size: 0.9em;
  margin: 10px 0 0;
  color: inherit; /* Inherit color from ServiceOverlay */
  transition: color 0.3s ease;
`;

export default ServicesSection;
