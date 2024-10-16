import React, { useState, useEffect } from "react";
import axios from "axios";
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

const ProjectDetails = ({ match }) => {
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const {id} = useParams()

  useEffect(() => {
    
        const fetchProjectDetails = async () => {
        if (id){
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };
    }


    fetchProjectDetails(id);
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectDetailsContainer>
      <ProjectTitle>{project.title}</ProjectTitle>
      <ProjectOverview>{project.overview}</ProjectOverview>

      <h3>Project Images</h3>
      <ProjectSlider>
        {project.images.map((image, index) => (
          <img key={index} src={image.url} alt={`Project image ${index + 1}`} />
        ))}
      </ProjectSlider>

      <h3>Key Details</h3>
      <ul>
        <li><strong>Project Duration:</strong> {project.duration}</li>
        <li><strong>Materials Used:</strong> {project.materials.join(', ')}</li>
        <li><strong>Client Feedback:</strong> {project.feedback}</li>
      </ul>
    </ProjectDetailsContainer>
  );
};

export default ProjectDetails;

