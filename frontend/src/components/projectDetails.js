import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ProjectDetailsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const ProjectTitle = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const ProjectOverview = styled.p`
  font-size: 1.2em;
`;

const ProjectSlider = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 20px;
  img {
    width: 300px;
    border-radius: 10px;
  }
`;

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
          setProject(response.data);
          console.log('Fetched Project:', response.data);

        } catch (error) {
          console.error("Error fetching project details:", error);
        }
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectDetailsContainer>
      <ProjectTitle>{project.title}</ProjectTitle>
      <ProjectOverview>{project.overview}</ProjectOverview>

      <h3>Project Images</h3>
      {/* <ProjectSlider>
        {project.images && project.images.length > 0 ? (
          project.images.map((img, index) => (
            <div key={index}>
              <img key={index} src={img.url || 'img/no_image.jpg'} alt={`Project image ${index + 1}`} />
              <p>{img.description}</p>
            </div>
          ))
        ) : (
          <p>No images available for this project.</p>
        )}
      </ProjectSlider> */}

      <h3>Key Details</h3>
      <ul>
        <li><strong>Project Duration:</strong> {project.duration}</li>
        <li>
          <strong>Materials Used:</strong> 
          {project?.materials?.length ? project.materials.join(', ') : 'N/A'}
        </li>
        <li><strong>Client Feedback:</strong> {project.feedback}</li>
      </ul>
    </ProjectDetailsContainer>
  );
};

export default ProjectDetails;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useParams } from "react-router-dom";

// const ProjectDetailsContainer = styled.div`
//   padding: 20px;
//   max-width: 800px;
//   margin: auto;
// `;

// const ProjectTitle = styled.h2`
//   font-size: 2.5em;
//   margin-bottom: 20px;
// `;

// const ProjectOverview = styled.p`
//   font-size: 1.2em;
// `;

// const ProjectSlider = styled.div`
//   display: flex;
//   overflow-x: scroll;
//   gap: 20px;
//   img {
//     width: 300px;
//     border-radius: 10px;
//   }
// `;

// const ProjectDetails = ({ match }) => {
//   const [project, setProject] = useState(null);
// //   const [images, setImages] = useState([]);
//   const {id} = useParams()

//   useEffect(() => {
    
//         const fetchProjectDetails = async () => {
//         if (id){
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
//                 setProject(response.data);
//             } catch (error) {
//                 console.error("Error fetching project details:", error);
//             }
//         };
//     }
//     fetchProjectDetails(id);
//   }, [id]);

//   if (!project) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ProjectDetailsContainer>
//       <ProjectTitle>{project.title}</ProjectTitle>
//       <ProjectOverview>{project.overview}</ProjectOverview>

//       <h3>Project Images</h3>
//       <ProjectSlider>
//         {project.images.map((img, index) => (
//           <img key={index} src={img.url || 'img\no_image.jpg'} alt={`Project image ${index + 1}`} />
//         ))}
//       </ProjectSlider>

//       <h3>Key Details</h3>
//       <ul>
//         <li><strong>Project Duration:</strong> {project.duration}</li>
//         <li><strong>Materials Used:</strong> {project.materials.join(', ')}</li>
//         <li><strong>Client Feedback:</strong> {project.feedback}</li>
//       </ul>
//     </ProjectDetailsContainer>
//   );
// };

// export default ProjectDetails;

