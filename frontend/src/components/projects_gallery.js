import styled from 'styled-components';

const GalleryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    padding: 20px;
`;

const ProjectCard = styled.div`
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    background-color: #f8f8f8;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
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

function ProjectGallery({ projects }) {
    return (
        <GalleryContainer>
            {projects.map((project) => (
                <ProjectCard key={project._id}>
                    <ProjectImage src={'/img/outdoor_sketch.jpg'} alt={project.title} />
                    <ProjectTitle>{project.title}</ProjectTitle>
                </ProjectCard>
            ))}
        </GalleryContainer>
    );
}

export default ProjectGallery;
