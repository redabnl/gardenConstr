import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Adjusts columns based on the screen size */
  gap: 20px; /* Space between items */
  padding: 20px;
`;

const GridItem = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05); /* Slight zoom on hover */
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover; /* Ensures image is scaled properly */
  }

  .content {
    padding: 15px;
    text-align: center;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;


const Container = styled.div`
  display: flex;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 60%;
`;

const ProjectCard = styled.div`
  position: relative;
  cursor: pointer;
  &:hover div {
    opacity: 1;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ProjectHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3 ease;
`;

const ProjectDetails = styled.div`
  width: 35%;
  padding: 20px;
  background: #333;
  color: white;
  margin-left: 20px;
`;



// const SelectedProjectDetails = styled.div`
//   background-color: #F9F9F9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
//   h2 {
//     font-size: 1.5rem;
//     margin-bottom: 10px;
//   }
  
//   p {
//     margin-bottom: 15px;
//     color: #666;
//   }
// `;



// // Styled components for layout
// const PortfolioContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 20px;
// `;

// const ProjectGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   grid-gap: 20px;
//   width: 60%;
// `;

// const ProjectCard = styled.div`
//   background-color: #fff;
//   padding: 15px;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
//   transition: transform 0.3s ease;
  
//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const ViewDetailsButton = styled.button`
//   background-color: #1A73E8;
//   color: white;
//   padding: 10px 20px;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const SelectedProjectDetails = styled.div`
//   width: 35%;
//   background-color: #F9F9F9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const Placeholder = styled.p`
//   color: #666;
//   font-size: 1.2rem;
//   text-align: center;
//   margin-right : 20%;
// `;

// const Testimonial = styled.div`
//   background-color: #FFEB3B;
//   padding: 10px;
//   border-radius: 5px;
//   margin-top: 20px;
// `;

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
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
        console.log(`image paths fetched in  the frontend : ${response.data.gallery_images}`)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);



  return (
    <GridContainer>
      <GridItem>
      {projects.map((project, index) => (
        <ProjectCard key={index} onClick={() => setSelectedProject(project)}>
            <ProjectImage src={project.gallery_images['0']} alt={project.title} />
            <ProjectHover>
            <h3>{project.title}</h3>
            <p>{project.brief}</p>
            </ProjectHover>
        </ProjectCard>
        ))}

      </GridItem>
      
      <ProjectDetails> 
        {selectedProject ? (
          <>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <p>{selectedProject.overview}</p>
            <p>Materials: {selectedProject.materials}</p>
            <p>Status: {selectedProject.status || "doable"}</p>
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


