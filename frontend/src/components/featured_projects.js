import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.05);
    transition: 0.3s ease;
  }
`;

const ProjectGrid = styled.div`
  position: relative;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
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
  flex-direction: column;
  transition: opacity 0.3s ease-in-out;
  text-align: center;
  ${GridItem}:hover & {
    opacity: 1;
  }
`;

const ViewAllIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: #333;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  cursor: pointer;
  &:hover {
    background-color: #555;
    transition: 0.2s;
  }
`;

const ProjectCard = ({ project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % project.gallery_images.length
        );
      }, 5000); // Change image every 5 seconds
  
      return () => clearInterval(interval);
    }, [project.gallery_images.length]);
  
    return (
      <ProjectCard>
        <img
          src={project.gallery_images[currentImageIndex]}
          alt={project.title}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <ProjectHover>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </ProjectHover>
      </ProjectCard>
    );
  };


const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [project, setSelectedProject] = useState(null)
  
      useEffect(() => {
          const fetchProjects = async () => {
              try {
                  const response = await axios.get('http://localhost:5000/api/projects');
                  setProjects(response.data.slice(0,3));
                  console.log('Projects fetched successfully:', response.data);
              } catch (error) {
                  console.error('Error fetching projects:', error);
              }
          };
  
          fetchProjects();
      }, []);    
    return (
      <div>

      <GridContainer>
        {projects.slice(0, 3).map((project, index) => (
          <GridItem key={index}>
            <ProjectGrid onClick={() => setSelectedProject(project)}>
              <ProjectImage
                src={'/img/default.jpg'}
                alt={project.title}
              />
              <ProjectHover>
                <h3>{project.title}</h3>
                <p>{project.brief}</p>
              </ProjectHover>
            </ProjectGrid>
          </GridItem>
        ))}
      </GridContainer>   
          {/* here comes the section projects images 'ProjectCards' in cards displaying with some text details appearing with hover actions  */}
        
        {projects.length > 3 && (
          <ViewAllIcon href="/projects" aria-label="View All Projects">
            <i className="bi bi-briefcase-fill" /> {/* FontAwesome grid icon */}
          </ViewAllIcon>
        )}
      </div>
    );
  };
  
  export default FeaturedProjects;


// {/* <GridContainer>
//           {(projects.slice ? projects.slice(0, 3) : []).map((project, index) => (
//             <ProjectCard
//               key={index}
//               project={project}
//               onClick={() => setSelectedProject(project)}
//             />
//           ))}
//         </GridContainer> */}
  

