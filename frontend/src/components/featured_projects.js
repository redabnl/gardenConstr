import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

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
  const [selectedProject, setSelectedProject] = useState([])
  const navigate = useNavigate()



  const handleProjectClick = (project) => {
    setSelectedProject(project); // Set the selected project
    redirect(`/projects/${project._id}`)

  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        console.log('Projects fetched successfully:', response.data);
        setProjects(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <GridContainer>
        {projects.map((project, _id) => (
          <GridItem 
          key={project._id}
          >
            <ProjectGrid
              
              onClick={()=> handleProjectClick(project)}
            >
              <ProjectImage
                src={project.image_urls?.[0] || '/img/no_image.jpg'} // Fetch the first image or default
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



// ============================================================================================
// ============================================================================================
// ============================================================================================

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

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
//   height: 100%;
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

// const ViewAllIcon = styled.a`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 24px;
//   background-color: #333;
//   color: white;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   margin: 0 auto;
//   cursor: pointer;
//   &:hover {
//     background-color: #555;
//     transition: 0.2s;
//   }
// `;

// const ProjectCard = ({ project }) => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setCurrentImageIndex((prevIndex) =>
//           (prevIndex + 1) % project.image_urls.length
//         );
//       }, 5000); // Change image every 5 seconds
  
//       return () => clearInterval(interval);
//     }, [project.image_urls.length]);
  
//     return (
//       <ProjectCard>
//         <img
//           src={project.image_urls[currentImageIndex] || 'img/no_image.jpg'} // fall to a default img if no img is found in db
//           alt={project.title}
//           style={{ width: "100%", borderRadius: "8px" }}
//         />
//         <ProjectHover>
//           <h3>{project.title}</h3>
//           <p>{project.description}</p>
//         </ProjectHover>
//       </ProjectCard>
//     );
//   };
// const FeaturedProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [project, setSelectedProject] = useState(null)

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/projects');
//                 setProjects(response.data.slice(0,3));
//                 console.log('Projects fetched successfully:', response.data);
//             } catch (error) {
//                 console.error('Error fetching projects:', error);
//             }
//         };

//         fetchProjects();
//     }, []);    
//   return (
//     <div>

//     <GridContainer>
//       {projects.slice(0, 3).map((project, index) => (
//         <GridItem key={index}>
//           <ProjectGrid onClick={() => setSelectedProject(project)}>
//             <ProjectImage
//               src={'/img/default.jpg'}
//               alt={project.title}
//             />
//             <ProjectHover>
//               <h3>{project.title}</h3>
//               <p>{project.brief}</p>
//             </ProjectHover>
//           </ProjectGrid>
//         </GridItem>
//       ))}
//     </GridContainer>   
//         {/* here comes the section projects images 'ProjectCards' in cards displaying with some text details appearing with hover actions  */}
      
//       {projects.length > 3 && (
//         <ViewAllIcon href="/projects" aria-label="View All Projects">
//           <i className="bi bi-briefcase-fill" /> {/* FontAwesome grid icon */}
//         </ViewAllIcon>
//       )}
//     </div>
//   );
// };

// export default FeaturedProjects;
// ============================================================================================
// ============================================================================================
// ============================================================================================


// const ProjectCard = ({ project }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.gallery_images.length);
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, [project.gallery_images.length]);

//   return (
//     <ProjectCard>
//       <img
//         src={"img/no_image.jpg"} // Fallback to a default image
//         alt={project.title}
//         style={{ width: "100%", borderRadius: "8px" }}
//       />
//       <ProjectHover>
//         <h3>{project.title}</h3>
//         <p>{project.description}</p>
//       </ProjectHover>
//     </ProjectCard>
//   );
// };


  // const FeaturedProjects = () => {
  //   const [projects, setProjects] = useState([]);
  //   const [project, setSelectedProject] = useState(null)
  
  //   useEffect(() => {
  //     const fetchProjects = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:5000/api/projects");
  //         setProjects(response.data.slice(0, 3)); // Load only the first 3 projects
  //         console.log("Projects fetched successfully:", response.data);
  //       } catch (error) {
  //         console.error("Error fetching projects:", error);
  //       }
  //     };
  
  //     fetchProjects();
  //   }, []);
  
  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1, // Show one project at a time
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     autoplaySpeed: 3000,
  //   };
  
  //   return (
  //     <div>
  //       <h4>View some of our done work</h4>
  //       <Slider {...settings}>
  //         {projects.map((project, index) => (
  //           <div key={index}>
  //               <GridContainer>
  //                   {(projects.slice ? projects.slice(0, 3) : []).map((project, index) => (
  //                 <ProjectCard
  //                   key={index}
  //                   project={project}
  //                   onClick={() => setSelectedProject(project)}
  //                 />
  //               ))}
  //               {/* {projects.slice(0, 3).map((project, index) => (
  //                 <GridItem key={index}>
  //                   <ProjectGrid onClick={() => setProjects(project)}>
  //                     <ProjectImage
  //                       src={'/img/no_image.jpg'}
  //                       alt={project.title}
  //                     />
  //                     <ProjectHover>
  //                       <h3>{project.title}</h3>
  //                       <p>{project.brief}</p>
  //                     </ProjectHover>
  //                   </ProjectGrid>
  //                 </GridItem>
  //               ))} */}
  //               <ProjectCard project={project} />
  //             </GridContainer> 

              
  //           </div>
  //         ))}
  //       </Slider>
  //       {projects.length > 3 && (
  //         <a href="/projects" aria-label="View All Projects">
  //           <i className="bi bi-briefcase-fill" /> {/* FontAwesome grid icon */}
  //           View All Projects
  //         </a>
  //       )}
  //     </div>
  //   );
  // };  




// {/* <GridContainer>
          // {(projects.slice ? projects.slice(0, 3) : []).map((project, index) => (
          //   <ProjectCard
          //     key={index}
          //     project={project}
          //     onClick={() => setSelectedProject(project)}
          //   />
          // ))}
//         </GridContainer> */}
  

