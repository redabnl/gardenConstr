// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const SlideshowContainer = styled.div`
//   position: relative;
//   overflow: hidden;
// `;

// const SlideshowImage = styled.img`
//   width: 100%;
//   height: auto;
//   transition: opacity 0.5s ease-in-out;
// `;

// const SlideshowTitle = styled.div`
//   position: absolute;
//   bottom: 10px;
//   left: 10px;
//   color: white;
//   background: rgba(0, 0, 0, 0.5);
//   padding: 5px;
// `;

// const ProjectCard = ({ project }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         (prevIndex + 1) % project.images.length
//       );
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(interval);
//   }, [project.images.length]);

//   return (
//     <SlideshowContainer>
//       <SlideshowImage 
//         src={project.images[currentImageIndex].url} 
//         alt={project.title} 
//       />
//       <SlideshowTitle>{project.title}</SlideshowTitle>
//     </SlideshowContainer>
//   );
// };

// // export default ProjectCard;
