
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

const renderDescription = (description) => {
    return description.split('\n').map((line, index) => (
      <p key={index} style={{ margin: '0 0 10px' }}>{line}</p>
    ));
  };


const ServiceDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const ImageAndDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  max-width: 900px;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FixedImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%;
`;

const FixedImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const DescriptionContainer = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  text-align: left;
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

const ServiceDetails = ({ selectedService, serviceDescriptions, serviceImages, setSelectedService }) => {
    if (!selectedService) {
        return null; // Don't render anything if no service is selected
      }
  return (
    <ServiceDetailsContainer>
      <CloseButton onClick={() => setSelectedService(null)}>X</CloseButton>
      <ServiceTitle>{selectedService.title}</ServiceTitle>
      <ImageAndDescriptionContainer>
        {/* Carousel Section */}
        <FixedImageContainer>
          {serviceImages[selectedService._id] && serviceImages[selectedService._id].length > 0 ? (
            <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
              {serviceImages[selectedService._id].map((image, idx) => (
                <div key={idx}>
                  <img src={image} alt={`${selectedService.title} ${idx + 1}`} />
                </div>
              ))}
            </Carousel>
          ) : (
            <FixedImage src="/img/no_image.jpg" alt="No Image" />
          )}
        </FixedImageContainer>
        {/* Fixed Image Section
        <FixedImageContainer>
          {serviceImages[selectedService._id] && serviceImages[selectedService._id][0] ? (
            <FixedImage src={serviceImages[selectedService._id][0]} alt={selectedService.title} />
          ) : (
            <FixedImage src="/img/no_image.jpg" alt="No Image" />
          )}
        </FixedImageContainer> */}
        {/* Description Section */}
        <DescriptionContainer>
          {renderDescription(serviceDescriptions[selectedService._id] || "Description not available.")}
        </DescriptionContainer>
      </ImageAndDescriptionContainer>
    </ServiceDetailsContainer>
  );
};

export default ServiceDetails;
