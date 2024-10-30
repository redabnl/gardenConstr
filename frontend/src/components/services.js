import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeroSection from './hero';
import { Link } from 'react-router-dom';
import Conclusion from './conclusion';
import Banner from './banner';
import ServicesSection from './servicesSection';
import Testimonials from './testimonials';
import ServiceCarousel from './service_carousel';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';








const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border: none;
  background-color: ${props => (props.isActive ? '#000' : '#ccc')};
  color: white;
  font-weight: bold;
  &:hover {
    background-color: #444;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

// const ServiceCard = styled.div`
//   position: relative;
//   max-width : 300px;
//   overflow: hidden;
//   cursor: pointer;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// `;

const ServiceCard = styled.div`
  position: relative;
  width : 100%;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const ServiceImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ServiceOverlay = styled.div`
  position: absolute;
  padding: 15px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  ${ServiceCard}:hover & {
    opacity: 1;
  }
`;

const ServiceTitle = styled.h3`
  color: white;
  margin-bottom: 10px;
`;

const ServiceDescription = styled.p`
  color: white;
  font-size: 0.9rem;
  text-align: center;
  padding: 0 10px;
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

const ServicesContainer = styled.div`
  display: flex;

`;

// const servicesDetails = styled.div`
//   width: 40%;
//   margin: 20px;
// `

const ServicesDetailsSect = styled.div`
  width: 35%%; /* Adjust as needed */
  padding: 20px;
  border-right: 1px solid #ccc;
`;


const ServicesList = styled.div`
  width: 65%; /* Adjust as needed */
  padding: 20px;
`;




const Services = () => {
  const [services, setServices] = useState([]);
  const [ServiceImages, setServiceImages] = useState([])
  // const [indoorServices, setIndoorServices] = useState([]);
  // const [outdoorServices, setOutdoorServices] = useState([]);

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
      <ServicesSection services={services} />
      < Banner />
      <Testimonials/>
      <Conclusion />
    </div>
  );
};

export default Services;  


// const ServicesContainer = styled.div`
//   background-color: #f9f9f9;
//   padding: 60px 20px;
//   text-align: center;
// `;

// const ServiceCardContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);  // You can change the value to 3 to match the desired layout
//   gap: 40px;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const ServiceCard = styled.div`
//   position: relative;
//   background-color: #fff;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   height: 400px;  // Adjust height based on your preference
// `;

// const ServiceImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const ServiceOverlay = styled.div`
//   position: absolute;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   width: 100%;
//   color: #fff;
//   padding: 20px;
//   text-align: left;
// `;

// const ServiceTitle = styled.h3`
//   font-size: 24px;
//   margin: 0;
// `;

// const ServiceDescription = styled.p`
//   font-size: 16px;
//   margin: 10px 0;
// `;




{/* <ServicesContainer>
    <ServiceCardContainer>
      {services.map((service, index) => (
        <ServiceCard key={index}>
          <ServiceImage src={'/img/no_image.jpg'} alt={service.title} />
          <ServiceOverlay>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <Link to="/">Learn More</Link>
          </ServiceOverlay>
        </ServiceCard>
      ))}
    </ServiceCardContainer>
  </ServicesContainer> */}
  
  // const ServicesSection = ({ services }) => {
  //   const [filteredServices, setFilteredServices] = useState([]);
  //   const [activeFilter, setActiveFilter] = useState('outdoor');
  //   const [serviceImages, setServiceImages] = useState({});
  //   const [selectedService, setSelectedService] = useState(null); // Track the selected service
  
  //   const fetchImages = async (galleryPath, serviceId) => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/api/service_images/${galleryPath}`);
  //       if (!response.ok) {
  //         throw new Error(`Error fetching images: ${response.statusText}`);
  //       }
  //       const images = await response.json();
  //       const fullImagePaths = images.map(image => `http://localhost:5000${image}`);
  //       setServiceImages(prev => ({ ...prev, [serviceId]: fullImagePaths }));
  //     } catch (error) {
  //       console.error("Error fetching service images:", error);
  //     }
  //   };
  
  //   useEffect(() => {
  //     // Filter services based on the active filter
  //     const filtered = services.filter(service =>
  //       activeFilter === 'indoor' ? !service.is_outdoor : service.is_outdoor
  //     );
  //     setFilteredServices(filtered);
  
  //     // Fetch images for each service in the filtered list only if not already fetched
  //     filtered.forEach(service => {
  //       if (service.gallery_path && !serviceImages[service._id]) {
  //         fetchImages(service.gallery_path, service._id);
  //       }
  //     });
  //   }, [services, activeFilter]);
  
  //   return (
  //     <ServicesContainer>
  //       {/* Left section for displaying selected service details */}
  //       <ServicesDetailsSect>
  //           {selectedService ? (
  //             <div>
  //               <h2>{selectedService.title}</h2>
  //               <p>{selectedService.description}</p>
  //               {serviceImages[selectedService._id] && (
  //                 <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
  //                   {serviceImages[selectedService._id].map((image, idx) => (
  //                     <div key={idx}>
  //                       <img src={image} alt={`${selectedService.title} ${idx + 1}`} />
  //                     </div>
  //                   ))}
  //                 </Carousel>
  //               )}
  //             </div>
  //           ) : (
  //             <p>Select a service to view details.</p>
  //           )}
  //       </ServicesDetailsSect>
  
  //       {/* Right section for displaying list of service cards */}
  //       <ServicesList>
  //         <FilterContainer>
  //           <FilterButton
  //             isActive={activeFilter === 'indoor'}
  //             onClick={() => setActiveFilter('indoor')}
  //           >
  //             Indoor Services
  //           </FilterButton>
  //           <FilterButton
  //             isActive={activeFilter === 'outdoor'}
  //             onClick={() => setActiveFilter('outdoor')}
  //           >
  //             Outdoor Services
  //           </FilterButton>
  //         </FilterContainer>
  
  //         <GridContainer>
  //           {filteredServices.map((service, index) => (
  //             <ServiceCard key={index} onClick={() => setSelectedService(service)}>
  //               {serviceImages[service._id] && serviceImages[service._id].length > 0 ? (
  //                 <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
  //                   {serviceImages[service._id].map((image, idx) => (
  //                     <div key={idx}>
  //                       <img src={image} alt={`${service.title} ${idx + 1}`} />
  //                     </div>
  //                   ))}
  //                 </Carousel>
  //               ) : (
  //                 <img src="/img/no_image.jpg" alt={service.title} />
  //               )}
  
  //               {/* Overlay with service title */}
  //               <ServiceOverlay>
  //                 <ServiceTitle>{service.title}</ServiceTitle>
  //               </ServiceOverlay>
  //             </ServiceCard>
  //           ))}
  //         </GridContainer>
  //       </ServicesList>
  //     </ServicesContainer>
  //   );
  // };





  // const ServicesSection = ({ services }) => {
  //   const [filteredServices, setFilteredServices] = useState([]);
  //   const [activeFilter, setActiveFilter] = useState('outdoor');
  //   const [serviceImages, setServiceImages] = useState({});

  //   const fetchImages = async (galleryPath, serviceId) => {
  //     try {
  //         const response = await fetch(`http://localhost:5000/api/service_images/${galleryPath}`);
  //         if (!response.ok) {
  //             throw new Error(`Error fetching images: ${response.statusText}`);
  //         }
  //         const images = await response.json();
  //         const fullImagePaths = images.map(image => `http://localhost:5000${image}`);
  //         setServiceImages(prev => ({ ...prev, [serviceId]: fullImagePaths }));
  //     } catch (error) {
  //         console.error("Error fetching service images:", error);
  //     }
  // };
  
  
  //   useEffect(() => {
  //     // Filter services based on the active filter
  //     const filtered = services.filter(service =>
  //       activeFilter === 'indoor' ? !service.is_outdoor : service.is_outdoor
  //     );
  //     setFilteredServices(filtered);
  //     // Fetch images for each service in the filtered list only if not already fetched
  //     filtered.forEach(service => {
  //       if (service.gallery_path && !serviceImages[service._id]) {
  //           fetchImages(service.gallery_path, service._id);
  //       }
  //   });      

  //   }, [services, activeFilter]);
  
  //   return (
  //     <div>
  //       <FilterContainer>
  //         <FilterButton
  //           isActive={activeFilter === 'indoor'}
  //           onClick={() => setActiveFilter('indoor')}
  //         >
  //           Indoor Services
  //         </FilterButton>
  //         <FilterButton
  //           isActive={activeFilter === 'outdoor'}
  //           onClick={() => setActiveFilter('outdoor')}
  //         >
  //           Outdoor Services
  //         </FilterButton>
  //       </FilterContainer>
  //       <GridContainer>
  //         {filteredServices.map((service, index) => (
  //         <ServiceCard key={index}>
  //             {/* Check if there are images in serviceImages for this service */}
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

              
  //             {/* Overlay with service title and description */}
  //             <ServiceOverlay>
  //                 <ServiceTitle>{service.title}</ServiceTitle>
  //                 <ServiceDescription>{service.description}</ServiceDescription>
  //             </ServiceOverlay>
  //         </ServiceCard>
  //         ))}

  //       </GridContainer>
  //     </div>
  //   );
  // };
  

  
  // const ServicesSection = ({ services }) => {
  //     const [filteredServices, setFilteredServices] = useState([]);
  //     const [activeFilter, setActiveFilter] = useState('outdoor');
  //     const [serviceImages, setServiceImages] = useState({});
  
  //     // Fetch images for each service based on its gallery path
      // const fetchImages = async (galleryPath, serviceId) => {
      //     try {
      //         const response = await fetch(`http://localhost:5000/api/service_images/${galleryPath}`);
      //         const images = await response.json();
      //         setServiceImages(prev => ({ ...prev, [serviceId]: images }));
      //     } catch (error) {
      //         console.error("Error fetching service images:", error);
      //     }
      // };
  
  //     useEffect(() => {
  //         // Filter services based on the active filter
  //         const filtered = services.filter(service =>
  //             activeFilter === 'indoor' ? !service.is_outdoor : service.is_outdoor
  //         );
  //         setFilteredServices(filtered);
  
          // // Fetch images for each service in the filtered list only if not already fetched
          // filtered.forEach(service => {
          //     if (service.gallery_path && !serviceImages[service._id]) {
          //         fetchImages(service.gallery_path, service._id);
          //     }
          // });
  //     }, [services, activeFilter]); // Remove serviceImages from dependency to avoid repetitive fetches
  
  //     return (
  //         <div>
  //             {/* Filter Buttons */}
  //             <div>
  //                 <button
  //                     className={activeFilter === 'indoor' ? 'active' : ''}
  //                     onClick={() => setActiveFilter('indoor')}
  //                 >
  //                     Indoor Services
  //                 </button>
  //                 <button
  //                     className={activeFilter === 'outdoor' ? 'active' : ''}
  //                     onClick={() => setActiveFilter('outdoor')}
  //                 >
  //                     Outdoor Services
  //                 </button>
  //             </div>
  
  //             {/* Display Services in a Grid */}
  //             <div className="grid-container">
  //                 {filteredServices.map((service, index) => (
  //                     <div key={index} className="service-card">
  //                         {/* Carousel or Default Image */}
  //                         {serviceImages[service._id] && serviceImages[service._id].length > 0 ? (
  //                             <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
  //                                 {serviceImages[service._id].map((image, idx) => (
  //                                     <div key={idx}>
  //                                         <img src={image} alt={`${service.title} ${idx + 1}`} />
  //                                     </div>
  //                                 ))}
  //                             </Carousel>
  //                         ) : (
  //                             <img src="/img/no_image.jpg" alt={service.title} />
  //                         )}
  //                         {/* Overlay with Service Details */}
  //                         <div className="service-overlay">
  //                             <h3>{service.title}</h3>
  //                             <p>{service.description}</p>
  //                         </div>
  //                     </div>
  //                 ))}
  //             </div>
  //         </div>
  //     );
  // };
  
  



// const ServicesSection = ({ services }) => {
//     const [filteredServices, setFilteredServices] = useState([]);
//     const [activeFilter, setActiveFilter] = useState('outdoor');
//     const [serviceImages, setServiceImages] = useState({});

//     const fetchImages = async (galleryPath, serviceId) => {
//         try {
//             const response = await fetch(`/api/service_images/${galleryPath}`);
//             const images = await response.json();
//             setServiceImages(prev => ({ ...prev, [serviceId]: images }));
//         } catch (error) {
//             console.error("Error fetching service images:", error);
//         }
//     };

//     useEffect(() => {
//         // Filter services based on the active filter
//         const filtered = services.filter(service =>
//             activeFilter === 'indoor' ? !service.is_outdoor : service.is_outdoor
//         );
//         setFilteredServices(filtered);

//         // Fetch images for each service in the filtered list
//         filtered.forEach(service => {
//             if (service.gallery_path && !serviceImages[service._id]) {
//                 fetchImages(service.gallery_path, service._id);
//             }
//         });
//     }, [services, activeFilter, serviceImages]);

//     return (
//         <div>
//             <div>
//                 <button
//                     className={activeFilter === 'indoor' ? 'active' : ''}
//                     onClick={() => setActiveFilter('indoor')}
//                 >
//                     Indoor Services
//                 </button>
//                 <button
//                     className={activeFilter === 'outdoor' ? 'active' : ''}
//                     onClick={() => setActiveFilter('outdoor')}
//                 >
//                     Outdoor Services
//                 </button>
//             </div>
//             <div className="grid-container">
//                 {filteredServices.map((service, index) => (
//                     <div key={index} className="service-card">
//                         {serviceImages[service._id] && serviceImages[service._id].length > 0 ? (
//                             <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
//                                 {serviceImages[service._id].map((image, idx) => (
//                                     <div key={idx}>
//                                         <img src={image} alt={`${service.title} ${idx + 1}`} />
//                                     </div>
//                                 ))}
//                             </Carousel>
//                         ) : (
//                             <img src="/img/no_image.jpg" alt={service.title} />
//                         )}
//                         <div className="service-overlay">
//                             <h3>{service.title}</h3>
//                             <p>{service.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };









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


  // const ServicesSection = ({ services }) => {
  //   const [filteredServices, setFilteredServices] = useState([]);
  //   const [activeFilter, setActiveFilter] = useState('outdoor');
  
  //   useEffect(() => {
  //     // Filter services based on the active filter
  //     const filtered = services.filter(service => 
  //       activeFilter === 'indoor' ? !service.is_outdoor : service.is_outdoor
  //     );
  //     setFilteredServices(filtered);
  //   }, [services, activeFilter]);
  
  //   return (
  //     <div>
  //       <FilterContainer>
  //         <FilterButton
  //           isActive={activeFilter === 'indoor'}
  //           onClick={() => setActiveFilter('indoor')}
  //         >
  //           Indoor Services
  //         </FilterButton>
  //         <FilterButton
  //           isActive={activeFilter === 'outdoor'}
  //           onClick={() => setActiveFilter('outdoor')}
  //         >
  //           Outdoor Services
  //         </FilterButton>
  //       </FilterContainer>
  //       <GridContainer>
  //         {filteredServices.map((service, index) => {
  //           // Construct the image path using the gallery_path from the service
  //           const imagePath = `${service.gallery_path}/photo_1.jpg`; // Adjust to fetch any specific image like the first one
  
  //           return (
  //             <ServiceCard key={index}>
  //               <ServiceImage
  //                 src={imagePath}
  //                 alt={service.title}
  //                 onError={(e) => { e.target.src = '/img/no_image.jpg'; }} // Fallback image if path is invalid
  //               />
  //               <ServiceOverlay>
  //                 <ServiceTitle>{service.title}</ServiceTitle>
  //                 <ServiceDescription>{service.description}</ServiceDescription>
  //               </ServiceOverlay>
  //             </ServiceCard>
  //           );
  //         })}
  //       </GridContainer>
  //     </div>
  //   );
  // };
  



  // const ServicesSection = ({ services }) => {
  //   const [activeFilter, setActiveFilter] = useState('indoor');
  
  //   // Filter services based on the active filter
  //   const filteredServices = services.filter(service => 
  //     activeFilter === 'indoor' ? !service.is_outdoor : service.is_outdoor
  //   );
  
  //   return (
  //     <div>
  //       <FilterContainer>
  //         <FilterButton
  //           isActive={activeFilter === 'indoor'}
  //           onClick={() => setActiveFilter('indoor')}
  //         >
  //           Indoor Services
  //         </FilterButton>
  //         <FilterButton
  //           isActive={activeFilter === 'outdoor'}
  //           onClick={() => setActiveFilter('outdoor')}
  //         >
  //           Outdoor Services
  //         </FilterButton>
  //       </FilterContainer>
        
  //       <GridContainer>
  //         {filteredServices.map((service, index) => (
  //           <ServiceCard key={index}>
  //             <ServiceImage src={'/img/no_image.jpg'} alt={service.title} />
  //             <ServiceOverlay>
  //               <ServiceTitle>{service.title}</ServiceTitle>
  //               <ServiceDescription>{service.description}</ServiceDescription>
  //             </ServiceOverlay>
  //           </ServiceCard>
  //         ))}
  //       </GridContainer>
  //     </div>
  //   );
  // };
  








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
