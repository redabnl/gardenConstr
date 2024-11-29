import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Navigate, redirect, useNavigate } from "react-router-dom";

// Styled Components
const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProjectCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectTitle = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  color: #333;
  background-color: #f9f9f9;
`;

const ProjectDetailsContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const BackButton = styled.button`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DetailImage = styled.img`
  max-width: 300px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MaterialsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MaterialItem = styled.li`
  font-size: 1rem;
  margin: 5px 0;
`;

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // For tracking the selected project

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data); // Load all projects
        console.log("Projects fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project); // Set the selected project
    navigate(`/projects/${project._id}`)

  };
  const navigate = useNavigate()

  const handleBackToGallery = () => {
    setSelectedProject(null); // Clear the selected project
  };

  return (
    <div>
      {selectedProject ? (
        <ProjectDetailsContainer>
          <BackButton onClick={handleBackToGallery}>&larr; Back to Gallery</BackButton>
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
          <h4>Duration: {selectedProject.duration}</h4>  {/* to be rmoved */}
          <h4>Materials:</h4>                            {/* to be rmoved */}
          <MaterialsList>
            {selectedProject.materials.map((material, index) => (
              <MaterialItem key={index}>{material}</MaterialItem>
            ))}
          </MaterialsList>
          {selectedProject.image_urls.map((url, index) => (
            <DetailImage
              key={index}
              src={url}
              alt={`${selectedProject.title} ${index}`}
            />
          ))}
        </ProjectDetailsContainer>
      ) : (
        <GalleryContainer>
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                onClick={() => handleProjectClick(project)}
              >
                <ProjectImage
                  src={
                    project.image_urls && project.image_urls.length > 0
                      ? project.image_urls[0]
                      : "img/default_image.jpg"
                  }
                  alt={project.title || "Project Image"}
                />

                {/* <ProjectImage
                  src={
                    project.image_urls && project.image_urls.length > 0
                      ? project.image_urls[0]
                      : "img/default_image.jpg"
                  }
                  alt={project.title || "Project Image"}
                /> */}
                <ProjectTitle>{project.title}</ProjectTitle>
              </ProjectCard>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </GalleryContainer>
      )}
    </div>
  );
};


export default ProjectGallery;


// import styled from 'styled-components';
// import React, {useEffect, useState} from 'react';
// import axios from 'axios';

// // const GalleryContainer = styled.div`
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// // `;

// // const ProjectCard = styled.div`
// //     border-radius: 8px;
// //     overflow: hidden;
// //     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// //     text-align: center;
// //     background-color: #f8f8f8;
// //     transition: transform 0.3s;

// //     &:hover {
// //         transform: scale(1.05);
// //     }
// // `;

// // const ProjectImage = styled.img`
// //     width: 100%;
// //     height: 200px;
// //     object-fit: cover;
// // `;

// // const ProjectTitle = styled.h3`
// //     font-size: 1.2rem;
// //     color: #333;
// //     padding: 10px;
// // `;

// const ProjectGallery = () => {
//   const [projects, setProjects] = useState([]);
  
//     useEffect(() => {
//       const fetchProjects = async () => {
//         try {
//           const response = await axios.get("http://localhost:5000/api/projects");
//           setProjects(response.data.slice(0, 3)); // Load only the first 3 projects
//           console.log("Projects fetched successfully:", response.data);
//         } catch (error) {
//           console.error("Error fetching projects:", error);
//         }
//       };
  
//       fetchProjects();
//     }, []);


//     return (
// <GalleryContainer>
//   {projects.length > 0 ? (
//           projects.map((project) => (
//             <ProjectCard key={project._id}>
//               <ProjectImage
//                 src={
//                   project.image_urls && project.image_urls.length > 0
//                     ? project.image_urls[0]
//                     : "img/default_image.jpg"
//                 }
//                 alt={project.title || "Project Image"}
                
//               />
//               <ProjectTitle>{project.title}</ProjectTitle>
//             </ProjectCard>
//           ))
//         ) : (
//           <p>No projects available.</p>
//         )}
//     {/* {projects.length > 0 ? (
//       projects.map((project) => (
//         <ProjectCard key={project._id}>
//           {project.image_urls && project.image_urls.length > 0 ? (
//             <ProjectImage
//               src={project.image_urls[0]}
//               alt={project.title || "Project Image"}
//             />
//           ) : (
//             <ProjectImage
//               src="/img/outdoor_sketch.jpg"
//               alt="Default Image"
//             />
//           )}
//           <ProjectTitle>{project.title}</ProjectTitle>
//         </ProjectCard>
//       ))
//     ) : (
//       <p>No projects available.</p>
//     )} */}
// </GalleryContainer>

//         // <GalleryContainer>
//         //     {projects.map((project) => (
//         //         <ProjectCard key={project._id}>
//         //             {/* Check if there are images and display the first one */}
//         //             {project.image_urls && project.image_urls.length > 0 ?
                    
//         //             (
//         //                 <ProjectImage src={project.image_urls[0]} alt={project.title} />
//         //             ) : 
                    
//         //             (
//         //                 // Fallback image if no images are available
//         //                 <ProjectImage src='/img/outdoor_sketch.jpg' alt='Default Image' />
//         //             )}
//         //             <ProjectTitle>{project.title}</ProjectTitle>
//         //         </ProjectCard>
//         //     ))}
//         // </GalleryContainer>
//       // <GalleryContainer>
//       //   {projects.map((project) => (
//       //     <ProjectCard key={project._id}>
//       //       {/* Check if there are images and display the first one */}
//       //       {project.image_urls && project.image_urls.length > 0 ? (
//       //         <ProjectImage src={project.image_urls[0]} alt={project.title} />
//       //       ) : (
//       //         // Fallback image if no images are available
//       //         <ProjectImage src='/img/outdoor_sketch.jpg' alt='Default Image' />
//       //       )}
//       //       <ProjectTitle>{project.title}</ProjectTitle>
//       //     </ProjectCard>
//       //   ))}
//       // </GalleryContainer>
//     );
//   };



// // function ProjectGallery({ projects }) {
// //     return (
// //         <GalleryContainer>
// //             {projects.map((project) => (
// //                 <ProjectCard key={project._id}>
// //                     <ProjectImage src={'/img/outdoor_sketch.jpg'} alt={project.title} />
// //                     <ProjectTitle>{project.title}</ProjectTitle>
// //                 </ProjectCard>
// //             ))}
// //         </GalleryContainer>
// //     );
// // }


// // Styled Components
// const GalleryContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
//   gap: 20px;
//   padding: 20px;
// `;

// const ProjectCard = styled.div`
//   background-color: #fff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s, box-shadow 0.3s;
//   &:hover {
//       transform: translateY(-5px);
//       box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
//     }

// `;
// // width: 250px;
// // border-radius: 8px;
// // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// // overflow: hidden;
// // background-color: #fff;
// // text-align: center;

// const ProjectImage = styled.img`
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   display: block;
// `;

// const ProjectTitle = styled.h3`
//   font-size: 1.2rem;
//   color: #333;
//   text-align: center;
//   padding: 10px;
//   font-size: 18px;
//   font-weight: bold;
// `;

// export default ProjectGallery;
