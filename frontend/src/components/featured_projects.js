// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 20px;
//   margin-bottom: 40px;
// `;

// const GridItem = styled.div`
//   position: relative;
//   overflow: hidden;
//   border-radius: 8px;
//   cursor: pointer;
//   box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
//   &:hover {
//     transform: scale(1.05);
//     transition: 0.3s ease;
//   }
// `;

// const ProjectGrid = styled.div`
//   position: relative;
// `;

// const ProjectImage = styled.img`
//   width: 100%;
//   height: 250px;
//   object-fit: cover;
//   transition: opacity 0.5s ease-in-out;
// `;

// const ProjectHover = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.6);
//   color: white;
//   opacity: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   transition: opacity 0.3s ease-in-out;
//   text-align: center;
//   ${GridItem}:hover & {
//     opacity: 1;
//   }
// `;

// const ProjectCard = ({ project }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         (prevIndex + 1) % project.gallery_images.length
//       );
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(interval);
//   }, [project.gallery_images.length]);

//   return (
//     <GridItem>
//       <ProjectGrid>
//         <ProjectImage
//           src={project.gallery_images[currentImageIndex]}
//           alt={project.title}
//         />
//         <ProjectHover>
//           <h3>{project.title}</h3>
//           <p>{project.brief}</p>
//         </ProjectHover>
//       </ProjectGrid>
//     </GridItem>
//   );
// };

// const FeaturedProjects = ({ projects, setSelectedProject }) => {
//   return (
//     <GridContainer>
//       {projects.slice(0, 3).map((project, index) => (
//         <ProjectCard
//           key={index}
//           project={project}
//           onClick={() => setSelectedProject(project)}
//         />
//       ))}
//     </GridContainer>
//   );
// };

// // export default FeaturedProjects;

