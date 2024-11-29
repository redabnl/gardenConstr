import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import ServiceDetails from './serviceDetails';

const renderDescription = (description) => {
  return description.split('\n').map((line, index) => (
    <p key={index} style={{ margin: '0 0 10px' }}>{line}</p>
  ));
};

// Global styles for the carousel
const GlobalStyles = createGlobalStyle`
  .carousel .slide img {
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }

  .carousel .control-arrow {
    display: none; /* Hide default arrows for a clean look */
  }
`;

const ServicesSection = ({ services }) => {
  const serviceDescriptions = {
    "671884cce9bfac0d8c05415a": "This is a description for Artificial GRASS. It provides excellent outdoor landscaping solutions.",
    
    
    "671884cce9bfac0d8c05415b": "LANDSCAPING DESIGN specializes in artificial grass installation for a perfect, low-maintenance lawn.",
    
    
    "671884cce9bfac0d8c05415c": "BRIQWORK AND PAVING: \n At Gazon Nordic, we specialize in creating beautiful, durable outdoor spaces with expert paving and brickwork. Whether it's a sleek driveway, a welcoming patio, or a custom pathway, we bring your vision to life with precision and care. From small residential projects to large commercial installations, we tailor our services to meet your needs and exceed your expectations.\n What sets us apart? Our team doesn't just install—they also act as site inspectors during every visit. By keeping a close eye on your property, we catch potential issues before they become problems, ensuring your investment is protected for years to come. It’s an added benefit that comes at no extra cost—just one more way Gazon Nordic goes the extra mile for you.",
    
    
    "671884cce9bfac0d8c05415d": "DECKS AND PATIOS",
  };

  const [filteredServices, setFilteredServices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('outdoor');
  const [serviceImages, setServiceImages] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  const fetchImages = async (galleryPath, serviceId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/service_images/${galleryPath}`);
      const images = await response.json();
      const fullImagePaths = images.map(image => `http://localhost:5000/${image}`);
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
      <GlobalStyles />
      {/* Filter Buttons */}
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
        {/* Services Grid */}
        <GridContainer>
          {filteredServices.map((service, index) => (
            <ServiceCard key={index} onClick={() => setSelectedService(service)}>
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
              <ServiceOverlay>
                <ServiceTitle>{service.title}</ServiceTitle>
              </ServiceOverlay>
            </ServiceCard>
          ))}
        </GridContainer>
      </ServicesList>
      {/* Service Details Section */}
      <ServiceDetails
        selectedService={selectedService}
        serviceDescriptions={serviceDescriptions}
        serviceImages={serviceImages}
        setSelectedService={setSelectedService}
      />
      
    </ServicesContainer>
  );
};


// {selectedService && (
//   <ServiceDetailsContainer>
//     <CloseButton onClick={() => setSelectedService(null)}>X</CloseButton>
//     <ServiceTitle>{selectedService.title}</ServiceTitle>
//     <ServiceDescription>
//       {serviceDescriptions[selectedService._id] || "Description not available."}
//     </ServiceDescription>
//     {serviceImages[selectedService._id] && (
//       <ImageCarousel>
//         <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
//           {serviceImages[selectedService._id].map((image, idx) => (
//             <div key={idx}>
//               <img
//                 src={image ? image : '/img/no_image.jpg'}
//                 alt={selectedService.title}
//               />
//             </div>
//           ))}
//         </Carousel>
//       </ImageCarousel>
//     )}
//   </ServiceDetailsContainer>
// )}

// Styled Components
const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
`;

const ServicesList = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(135deg, #28a745, #4caf50)' : 'linear-gradient(135deg, #ddd, #bbb)'};
  color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ServiceCard = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 10px;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ServiceDetailsContainer = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ServiceTitle = styled.h2`
  margin-bottom: 10px;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const ImageCarousel = styled.div`
  margin-top: 20px;

  img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
  }
`;

export default ServicesSection;
