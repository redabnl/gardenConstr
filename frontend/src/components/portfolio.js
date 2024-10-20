import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";



const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Two-thirds for the images, one-third for details */
  gap: 20px;
  padding: 20px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* Stack on smaller screens */
  }
`;

const GridItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Makes the grid responsive */
  gap: 20px;
`;

const ProjectGrid = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: 0.3s ease;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
`;

const ProjectHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  transition: opacity 0.3s ease-in-out;
  ${ProjectGrid}:hover & {
    opacity: 1;
  }
`;

const ProjectDetails = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: fit-content;
  @media (max-width: 900px) {
    margin-top: 20px;
  }
`;





const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null); // State to store selected project

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects/portfolio");
        setProjects(response.data);
        console.log(`image paths fetched in  the frontend : ${response.data.gallery_images}`)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

// <ProjectImage src={project.gallery_images['0']} alt={project.title} />

return (
    <GridContainer>
      <GridItem>
        {projects.map((project, index) => (
          <ProjectGrid key={index} onClick={() => setSelectedProject(project)}>
            <ProjectImage
              src={project.gallery_images[0]} /* Ensure the image path is correct */
              alt={project.title}
            />
            <ProjectHover>
              <h3>{project.title}</h3>
              <p>{project.brief}</p>
            </ProjectHover>
          </ProjectGrid>
        ))}
      </GridItem>
  
      <ProjectDetails>
        {selectedProject ? (
          <>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <p>{selectedProject.overview}</p>
            <p>Materials: {selectedProject.materials}</p>
            <p>Status: {selectedProject.status || "we do that"}</p>
          </>
        ) : (
          <p>Select a project to view details</p>
        )}
      </ProjectDetails>
    </GridContainer>
  );
  
}

export default Portfolio;

//     <PortfolioContainer>
//     <Heading>Our Completed Projects</Heading>
//     <FilterButtons>
//       <FilterButton>All</FilterButton>
//       <FilterButton>Residential</FilterButton>
//       <FilterButton>Commercial</FilterButton>
//       <FilterButton>Other</FilterButton>
//     </FilterButtons>

//     <ProjectGrid>
//       {projects.map((project, index) => (
//         <ProjectCard key={index}>
//           <ProjectImage src={project.images[0].url} alt={project.title} />
//           <ProjectTitle>{project.title}</ProjectTitle>
//           <ProjectDescription>{project.description}</ProjectDescription>
//           <ViewDetailsButton>View Details</ViewDetailsButton>
//         </ProjectCard>
//       ))}
//     </ProjectGrid>
//   </PortfolioContainer>
    // <div>
    //   <ProjectFilter>
    //     <button onClick={() => handleFilterChange("all")}>All</button>
    //     <button onClick={() => handleFilterChange("Residential")}>Residential</button>
    //     <button onClick={() => handleFilterChange("Commercial")}>Commercial</button>
    //     <button onClick={() => handleFilterChange("Other")}>Other</button>
    //   </ProjectFilter>

    //   <ProjectGrid>
    //     {filteredProjects.map((project) => (
    //       <ProjectCard key={project._id}>
    //         <h2>{project.name}</h2>
           
    //       {project.images.map((image, index) => (
    //         <div key={index}>
    //           <img src={image.url} alt={project.title} />
    //           <p>{image.description}</p>  
    //         </div>
    //       ))}
    //       <div className="project-info">
    //         <h3>{project.title}</h3>
    //         <p>{project.description}</p>
    //         <Link className="view-btn" to={`/projects/${project._id}`}>
    //           View Details
    //         </Link>
    //       </div>
    //     </ProjectCard>
    //     ))}
    //   </ProjectGrid>
    // </div>




//   return (
//     <PortfolioContainer>
//       <PortfolioHeading>Our Completed Projects</PortfolioHeading>

//       <ProjectGrid>
//         {projects.map(project => (
//           <ProjectCard key={project._id}>
//             <img src={project.imageUrl || '/backend/img/default.jpg'} alt={project.title} />
//             <div className="project-info">
//               <h3>{project.title}</h3>
//               <p>{project.description}</p>
//               <Link className="view-btn" to={`/projects/${project._id}`}>View Details</Link>
//             </div>
//           </ProjectCard>
//         ))}
//       </ProjectGrid>
//     </PortfolioContainer>
//   );


