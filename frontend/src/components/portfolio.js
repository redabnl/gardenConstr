import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioIntro from './intro_portfolio';
import ProjectFilter from './projects_filter';
import ProjectGallery from './projects_gallery';
// import ProjectDetails from './project_details';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


function PortfolioPage() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filter, setFilter] = useState('All'); // Initial filter

    useEffect(() => {
        // Fetch projects from the database
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/projects');
                setProjects(response.data);
                // setFilteredProjects(response.data); // Set initial projects
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects()
        
    }, []);

    // Handle filtering based on category
    const handleFilterChange = (category) => {
        setFilter(category);
        if (category === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.category === category));
        }
    };

    return (
        <div>
            <PortfolioIntro />
            <ProjectFilter filter={filter} onFilterChange={handleFilterChange} />
            <ProjectGallery projects={filteredProjects} />
        </div>
        // <div>
        // <ProjectFilter>
        //   <button onClick={() => handleFilterChange("all")}>All</button>
        //   <button onClick={() => handleFilterChange("Residential")}>Residential</button>
        //   <button onClick={() => handleFilterChange("Commercial")}>Commercial</button>
        //   <button onClick={() => handleFilterChange("Other")}>Other</button>
        // </ProjectFilter>
  
        // <ProjectGrid>
        //   {filteredProjects.map((project) => (
        //     <ProjectCard key={project._id}>
        //       <h2>{project.name}</h2>
             
        //     {project.images.map((image, index) => (
        //       <div key={index}>
        //         <img src={image.url} alt={project.title} />
        //         <p>{image.description}</p>  
        //       </div>
        //     ))}
        //     <div className="project-info">
        //       <h3>{project.title}</h3>
        //       <p>{project.description}</p>
        //       <Link className="view-btn" to={`/projects/${project._id}`}>
        //         View Details
        //       </Link>
        //     </div>
        //   </ProjectCard>
        //   ))}
        // </ProjectGrid>
        // </div>
    );
}


// Styled Components
const ProjectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ProjectCard = styled.div`
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  text-align: center;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  padding: 10px;
`;

export default PortfolioPage;



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


