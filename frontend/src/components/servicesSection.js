import { useState, useEffect } from 'react';
import {Carousel} from 'react-responsive-carousel'; // Ensure you have this installed
import styled, { keyframes } from 'styled-components';

const ServicesSection = ({ services }) => {
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
  {/* Services list */}
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

  {/* Full-width details section */}
  {selectedService && (
    <ServiceDetailsContainer>
      <CloseButton onClick={() => setSelectedService(null)}>X</CloseButton>
      <ServiceTitle>{selectedService.title}</ServiceTitle>
      <ServiceDescription>{selectedService.description}</ServiceDescription>
      {serviceImages[selectedService._id] && (
        <ImageCarousel>
          <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
            {serviceImages[selectedService._id].map((image, idx) => (
              <div key={idx}>
                <img src={image} alt={`${selectedService.title} ${idx + 1}`} />
              </div>
            ))}
          </Carousel>
        </ImageCarousel>
      )}
    </ServiceDetailsContainer>
  )}
</ServicesContainer>
//         <ServicesContainer>
//   {/* Top section for list of services */}
//   <ServicesList>
//     <FilterContainer>
//       <FilterButton
//         isActive={activeFilter === 'indoor'}
//         onClick={() => setActiveFilter('indoor')}
//       >
//         Indoor Services
//       </FilterButton>
//       <FilterButton
//         isActive={activeFilter === 'outdoor'}
//         onClick={() => setActiveFilter('outdoor')}
//       >
//         Outdoor Services
//       </FilterButton>
//     </FilterContainer>
//     <GridContainer>
//       {filteredServices.map((service, index) => (
//         <ServiceCard key={index} onClick={() => setSelectedService(service)}>
//           {serviceImages[service._id] && serviceImages[service._id].length > 0 ? (
//             <ProjectImage
//               src={serviceImages[service._id][0]} // Use the first image as a thumbnail
//               alt={`${service.title}`}
//             />
//           ) : (
//             <ProjectImage src="/img/no_image.jpg" alt={service.title} />
//           )}
//           <ServiceOverlay>
//             <ServiceTitle>{service.title}</ServiceTitle>
//           </ServiceOverlay>
//         </ServiceCard>
//       ))}
//     </GridContainer>
//   </ServicesList>

//   {/* Bottom section for selected service details */}
//   {selectedService && (
//     <ServiceDetailsSection>
//       <ServiceTitle>{selectedService.title}</ServiceTitle>
//       <ServiceDescription>{selectedService.description}</ServiceDescription>
//       {serviceImages[selectedService._id] && (
//         <CarouselImgs showThumbs={false} infiniteLoop autoPlay interval={3000}>
//           {serviceImages[selectedService._id].map((image, idx) => (
//             <div key={idx}>
//               <ProjectImage src={image} alt={`${selectedService.title} ${idx + 1}`} />
//             </div>
//           ))}
//         </CarouselImgs>
//       )}
//     </ServiceDetailsSection>
//   )}
           
//         </ServicesContainer>
    );
};





/* Slide-up animation for the service details section */
const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

/* Full-width service details container */
const ServiceDetailsContainer = styled.div`
  position: optional;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  animation: ${slideUp} 0.3s ease-out;
  display: flex;
  flex-direction: column;
`;

/* Close button for the service details */
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ff0000; /* Optional hover effect */
  }
`;

/* Service title in the details section */
const ServiceTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`;

/* Service description styling */
const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

/* Optional: Styled container for the service images carousel */
const ImageCarousel = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 15px;

  img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
`;


// /* Bottom section styling */
// const ServiceDetailsSection = styled.div `
//     width: 100%;
//     background-color: #f9f9f9;
//     padding: 20px;
//     border-top: 1px solid #ddd;
//     position: optional; /* Optional: for sticky bottom display */
//     bottom: 0;
//     left: 0;
//     z-index: 10;`
  
  
// const CarouselImgs = styled.div`
//     max-width: 90%;
//     margin: 20px auto;
//   `
  



const ServicesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
`;

const ServiceDetailsSect = styled.div`
    flex: 1;
    min-width: 300px;
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
    flex: 2;
    padding: 20px;
    overflow-y: auto;
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
    background-color: ${({ isActive }) => (isActive ? '#28a745' : '#ddd')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? '#218838' : '#ccc')};
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
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const ServiceOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s;

    ${ServiceCard}:hover & {
        opacity: 1;
    }
`;

// FORMER SERVICES PAGE WITH OVERFLOW SECLECTION 
 {/* Left section for selected service details */}
//  <ServiceDetailsSect>
//  {selectedService ? (
//      <div>
//          <ServiceTitle>{selectedService.title}</ServiceTitle>
//          <ServiceDescription>{selectedService.description}</ServiceDescription>
//          {serviceImages[selectedService._id] && (
//              <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
//                  {serviceImages[selectedService._id].map((image, idx) => (
//                      <div key={idx}>
//                          <ProjectImage src={image} alt={`${selectedService.title} ${idx + 1}`} />
//                      </div>
//                  ))}
//              </Carousel>
//          )}
//      </div>
//  ) : (
//      <p>Select a service to view details.</p>
//  )}
// </ServiceDetailsSect>

// {/* Right section for list of services */}
// <ServicesList>
//  <FilterContainer>
//      <FilterButton
//          isActive={activeFilter === 'indoor'}
//          onClick={() => setActiveFilter('indoor')}
//      >
//          Indoor Services
//      </FilterButton>
//      <FilterButton
//          isActive={activeFilter === 'outdoor'}
//          onClick={() => setActiveFilter('outdoor')}
//      >
//          Outdoor Services
//      </FilterButton>
//  </FilterContainer>
//  <GridContainer>
//      {filteredServices.map((service, index) => (
//          <ServiceCard key={index} onClick={() => setSelectedService(service)}>
//          {/*card content here */}
//          {serviceImages[service._id] && serviceImages[service._id].length > 0 ? (
//              <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
//              {serviceImages[service._id].map((image, idx) => (
//                  <div key={idx}>
//                  <ProjectImage src={image} alt={`${service.title} ${idx + 1}`} />
//                  </div>
//              ))}
//              </Carousel>
//          ) : (
//              <ProjectImage src="/img/no_image.jpg" alt={service.title} />
//          )}
         
//          {/* Overlay with service title and description */}
//          <ServiceOverlay>
//              <ServiceTitle>{service.title}</ServiceTitle>
//              {/* <ServiceDescription>{service.description}</ServiceDescription> */}
//          </ServiceOverlay>
//          </ServiceCard>
//      ))}
//  </GridContainer>

// </ServicesList>

// const ServiceTitle = styled.h3`
//     font-size: 1.2rem;
//     margin: 0;
//     color: inherit;
// `;

// const ServiceDescription = styled.p`
//     font-size: 0.9rem;
//     color: inherit;
// `;

// const ServicesContainer = styled.div`
//     display: flex;
     
// `;

// const ServiceDetailsSect = styled.div`
//     width: 35%;
//     padding: 20px;
//     border-right: 1px solid #ccc;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     h2 {
//         font-size: 2rem;
//         margin-bottom: 10px;
//     }

//     p {
//         font-size: 1rem;
//         color: #555;
//         text-align: center;
//         max-width: 600px;
//         line-height: 1.6;
//     }
// `;

// const ServicesList = styled.div`
//     width: 65%;
//     padding: 20px;
//     overflow-y: auto; /* Enables scrolling if content overflows */
// `;

// const FilterContainer = styled.div`
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 20px;
// `;

// const FilterButton = styled.button`
//     padding: 10px 20px;
//     border: none;
//     background-color: ${({ isActive }) => (isActive ? '#333' : '#ddd')};
//     color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
//     font-size: 1rem;
//     cursor: pointer;
//     border-radius: 4px;

//     &:hover {
//         background-color: ${({ isActive }) => (isActive ? '#555' : '#ccc')};
//     }
// `;


// const GridContainer = styled.div`
//   display: grid;
//   border: 1px solid #fff;
//   grid-template-columns: repeat(2, 1fr); /* 2 columns */
//   grid-template-rows: repeat(2, auto); /* 2 rows */
//   gap: 20px; /* Space between grid items */
//   padding: 10px;
  
// `;
// const ServiceCard = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%; /* Set a fixed height */
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// `;

// const ProjectImage = styled.img`
//   width: 100%;
//   object-fit: cover;
//   position: relative;
//   display: block;
// `;



// const ServiceOverlay = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background: rgba(0, 0, 0, 0.5); /* Dark overlay */
//   color: white;
//   padding: 20px;
//   opacity: 0;
//   transition: opacity 0.3s ease, color 0.3s ease; /* Transition for hover effect */

//   &:hover {
//     opacity: 1;
//     color: #FFD700; /* Change to your desired hover color */
//   }
// `;


// // `;
// const ServiceTitle = styled.h3`
//   font-size: 1.2em;
//   margin: 0;
//   color: inherit; /* Inherit color from ServiceOverlay */
//   transition: color 0.3s ease;
// `;

// const ServiceDescription = styled.p`
//   font-size: 0.9em;
//   margin: 10px 0 0;
//   color: inherit; /* Inherit color from ServiceOverlay */
//   transition: color 0.3s ease;
// `;

export default ServicesSection;


// const GridContainer = styled.div`
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     grid-gap: 20px;
//     width: 100%;
//     padding: 20px;

// `;


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
