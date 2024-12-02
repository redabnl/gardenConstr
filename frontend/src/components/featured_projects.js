import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  height: 200px;
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

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    navigate(`/projects/${project._id}`); // Redirect to the project details page
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        console.log('Projects fetched successfully:', response.data);
        setProjects(response.data.slice(0, 3)); // Fetch only the first three projects
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <GridContainer>
        {projects.map((project) => (
          <GridItem key={project._id} onClick={() => handleProjectClick(project)}>
            <ProjectGrid>
              <ProjectImage
                src={project.image_urls?.[0] || '/img/no_image.jpg'} // Fetch the first image or use a default one
                alt={project.title}
              />
              <ProjectHover>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </ProjectHover>
            </ProjectGrid>
          </GridItem>
        ))}
      </GridContainer>
      {projects.length > 3 && (
        <ViewAllIcon href="/projects" aria-label="View All Projects">
          <i className="bi bi-briefcase-fill" />
        </ViewAllIcon>
      )}
    </div>
  );
};

export default FeaturedProjects;
