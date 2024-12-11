import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick'; // For the carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styled Components
const PageContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

const CarouselContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 500px;

  .slick-slide img {
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 500px;
`;

const ProjectTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const ProjectDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.8;
  color: #555;
  text-align: justify;
  margin-bottom: 20px;
`;

const KeyDetailsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    font-size: 1.1em;
    margin: 10px 0;
    color: #333;
    padding: 10px;
    border-left: 4px solid #2ecc71;
    background: #eef9f1;
    border-radius: 5px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
  
`;

const GridImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

// // const fetchImages = async (images_fodler, id) => {
// //   try {
// //     // Call the API to get the images
// //     const response = await fetch(`http://localhost:5000/api/projects_images/${images_fodler}`);
// //     const images = await response.json();

// //     // Map the images to full URLs
// //     const fullImagePaths = images.map(image => `http://localhost:5000${image}`);

// //     // Update state with the fetched images
// //     setServiceImages(prev => ({ ...prev, [serviceId]: fullImagePaths }));
// //   } catch (error) {
// //     console.error("Error fetching service images:", error);
// //   }
// // };


const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log("Fetching project with ID:", id);
    const fetchProject = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
            console.log("Fetched project:", response.data);
            setProject(response.data);

            if (response.data.image_urls && response.data.image_urls.length > 0) {
                setImages(response.data.image_urls);
            }
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    fetchProject();
  }, [id]);

  // Check if the project data is still loading
  if (!project) {
    return <p>Loading project details...</p>; // You can replace this with a spinner component if desired
  }

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Carousel */}
        <CarouselContainer>
          <Slider {...carouselSettings}>
            {images.length > 0 ? (
              images.map((url, index) => (
                <img key={index} src={url} alt={`${project.title} image ${index + 1}`} />
              ))
            ) : (
              <p>No images available</p>
            )}
          </Slider>
        </CarouselContainer>

        {/* Details */}
        <DetailsContainer>
          <ProjectTitle>{project.title}</ProjectTitle>
          <KeyDetailsList>
            <li><strong>Category:</strong> {project.category || 'N/A'}</li>
            <li><strong>Duration:</strong> {project.duration || 'N/A'}</li>
            <li><strong>Materials:</strong> {project.materials?.join(', ') || 'N/A'}</li>
          </KeyDetailsList>
        </DetailsContainer>
      </ContentWrapper>

      {/* Description */}
      <ProjectDescription>{project.description}</ProjectDescription>

      {/* Grid of Images */}
      <GridContainer>
        {images.length > 0 ? (
          images.map((url, index) => (
            <GridImage key={index} 
              src={
                project.image_urls && project.image_urls.length > 0
                  ? project.image_urls[0]
                  : "img/default_image.jpg"
              } 
              alt={`Project ${index}`} 
            >
            <Overlay className="overlay">{project.title}</Overlay>
            </GridImage>
          ))
        ) : (
          <p>No additional images available</p>
        )}
      </GridContainer>
    </PageContainer>
  );
};

export default ProjectDetails;



// const ProjectDetails = () => {
//   const [project, setProject] = useState(null);
//   const [images, setImages] = useState([])
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();
  

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
//         setProject(response.data);

//         // Use image_urls directly from the project data
//         if (response.data.image_urls && response.data.image_urls.length > 0) {
//           setImages(response.data.image_urls);
//           }
//       } catch (error) {
//           console.error('Error fetching project details:', error);
//         }
//       };

//       fetchProject();
//     }, [id]);
//   //     try {
//   //       const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
        
//   //       setProject(response.data);
//   //       console.log("project fetched: ",id )
//   //       if (project.images_fodler) {
//   //         const imagesResponse = await axios.get(
//   //           `http://localhost:5000/api/project_images/${project.images_folder}`
//   //         );
//   //         setImages(imagesResponse.data);
//   //       }
        

       


//   //     } catch (error) {
//   //       console.error('Error fetching project details:', error);
//   //     }
//   //   };

//   //   fetchProject();
//   // }, [id]);

//   // if (!project) return <p>Loading...</p>;

//   // Carousel settings
//   const carouselSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <PageContainer>
//       <ContentWrapper>
//         {/* Carousel */}
//         <CarouselContainer>
//           <Slider {...carouselSettings}>
//             {images && images.length > 0 ? (
//               images.map((url, index) => (
//                 <img key={index} src={url} alt={`${project.title} image ${index + 1}`} />
//               ))
//             ) : (
//               <p>No images available</p>
//             )}
//           </Slider>
//           {/* <Slider {...carouselSettings}>
//               {images && images.length > 0 ? (
//                 images.map((url, index) => (
//                   <img key={index} src={url} alt={`${project.title} image ${index + 1}`} />
//                 ))
//               ) : (
//                 <p>No images available</p>
//               )}
//           </Slider> */}

//         </CarouselContainer>

//         {/* Details */}
//         <DetailsContainer>
//           <ProjectTitle>{project.title}</ProjectTitle>
//           <KeyDetailsList>
//             <li><strong>Category:</strong> {project.category || 'N/A'}</li>
//             <li><strong>Duration:</strong> {project.duration || 'N/A'}</li>
//             <li><strong>Materials:</strong> {project.materials?.join(', ') || 'N/A'}</li>
//           </KeyDetailsList>
//         </DetailsContainer>
//       </ContentWrapper>

//       {/* Description */}
//       <ProjectDescription>{project.description}</ProjectDescription>

//       {/* Grid of Images */}
//       <GridContainer>
//         {images && images.length > 0 ? (
//           images.map((url, index) => (
//             <GridImage key={index} src={url} alt={`Project ${index}`} />
//           ))
//         ) : (
//           <p>No images available</p>
//         )}
//       </GridContainer>
//         {/* {project.image_urls && project.image_urls.length > 0 ? (
//               project.image_urls.map((url, index) => (
//                   <GridImage key={index} src={url} alt={`Project ${index}`}  /> // style={{ width: '200px', margin: '10px' }}
//               ))
//           ) : (
//               <p>No images available</p>
//           )} */}
//         {/* {images && images.length > 0 ? (
//           images.map((url, index) => (
//             <GridImage key={index} src={url} alt={`${project.title} grid image ${index + 1}`} />
//           ))
//         ) : (
//           <p>No additional images available</p>
//         )} */}
// {/*------------------------------------------------------------------ */}

//       {/* <GridContainer>
//         {images && images.length > 0 ? (
//             images.map((url, index) => (
//               <GridImage key={index} src={url || '/public/img/no_image.jpg'} alt={`${project.title} grid image ${index + 1}`} />
//             ))
//           ) : (
            
//             <div>
//               <img src='/public/img/outdoor_sketch.jpg' />
//             </div>
//         )}
//       </GridContainer> */}
//     </PageContainer>
//   );
// };

// export default ProjectDetails;


// // {/* <ProjectTitle>{project.title}</ProjectTitle>
// // <ProjectOverview>{project.overview}</ProjectOverview>

// // <h3>Project Images</h3>
// // {/* <ProjectSlider>
// //   {project.images && project.images.length > 0 ? (
// //     project.images.map((img, index) => (
// //       <div key={index}>
// //         <img key={index} src={img.url || 'img/no_image.jpg'} alt={`Project image ${index + 1}`} />
// //         <p>{img.description}</p>
// //       </div>
// //     ))
// //   ) : (
// //     <p>No images available for this project.</p>
// //   )}
// // </ProjectSlider> */}

// // {/* <h3>Key Details</h3>
// // <ul>
// //   <li><strong>Project Duration:</strong> {project.duration}</li>
// //   <li>
// //     <strong>Materials Used:</strong> 
// //     {project?.materials?.length ? project.materials.join(', ') : 'N/A'}
// //   </li>
// //   <li><strong>Client Feedback:</strong> {project.feedback}</li>
// // </ul> */} 
// //#################################################


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import styled from "styled-components";
// // import { useParams } from "react-router-dom";

// // const ProjectDetailsContainer = styled.div`
// //   padding: 20px;
// //   max-width: 800px;
// //   margin: auto;
// // `;

// // const ProjectTitle = styled.h2`
// //   font-size: 2.5em;
// //   margin-bottom: 20px;
// // `;

// // const ProjectOverview = styled.p`
// //   font-size: 1.2em;
// // `;

// // const ProjectSlider = styled.div`
// //   display: flex;
// //   overflow-x: scroll;
// //   gap: 20px;
// //   img {
// //     width: 300px;
// //     border-radius: 10px;
// //   }
// // `;

// // const ProjectDetails = ({ match }) => {
// //   const [project, setProject] = useState(null);
// // //   const [images, setImages] = useState([]);
// //   const {id} = useParams()

// //   useEffect(() => {
    
// //         const fetchProjectDetails = async () => {
// //         if (id){
// //             try {
// //                 const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
// //                 setProject(response.data);
// //             } catch (error) {
// //                 console.error("Error fetching project details:", error);
// //             }
// //         };
// //     }
// //     fetchProjectDetails(id);
// //   }, [id]);

// //   if (!project) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <ProjectDetailsContainer>
// //       <ProjectTitle>{project.title}</ProjectTitle>
// //       <ProjectOverview>{project.overview}</ProjectOverview>

// //       <h3>Project Images</h3>
// //       <ProjectSlider>
// //         {project.images.map((img, index) => (
// //           <img key={index} src={img.url || 'img\no_image.jpg'} alt={`Project image ${index + 1}`} />
// //         ))}
// //       </ProjectSlider>

// //       <h3>Key Details</h3>
// //       <ul>
// //         <li><strong>Project Duration:</strong> {project.duration}</li>
// //         <li><strong>Materials Used:</strong> {project.materials.join(', ')}</li>
// //         <li><strong>Client Feedback:</strong> {project.feedback}</li>
// //       </ul>
// //     </ProjectDetailsContainer>
// //   );
// // };

// // export default ProjectDetails;

