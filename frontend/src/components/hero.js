import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import axios from 'axios';



// Styled Components for the Hero Section
// const HeroContainer = styled.div`
//   position: relative;
//   width: 100%;
//   height: 500px;
//   overflow: hidden;
// `;

const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 10;

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    color: white;
  }

  p {
    font-size: 1.2rem;
    color: #f0f0f0;
    margin-bottom: 30px;
  }

  .cta-button {
    background-color: #6c757d;
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    text-decoration: none;
  }
`;

const Overlay = styled.div`
  padding: 80px 0; // Adjust the padding for better spacing
  background-color: #f8f9fa;
  text-align: center;
  position: absolute;
  width: 100%;
  height: 7%;
  background: rgba(0, 0, 0, 0.5);  /* Dark overlay to make text readable */
  z-index: 3;
`;

const HeroCarousel = styled(Slider)`
  .slick-slide img {
    display: flex;
    width: 90%;
    height: 10%;
    object-fit: cover;
  }
`;

const HeroContainer = styled.div`
  background-color: #18A558; /* Primary color */
  color: white;
  padding: 20px 0;
  text-align: center;
  height: 400px;
  overflow: hidden;
  margin: 0 auto;
`;

// const HeroText = styled.h1`
//   font-size: 3rem;
//   margin-bottom: 20px;
//   color: white;
// `;

const HeroButton = styled(Link)`
  background-color: #6c757d;
  text-color : white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  margin-top: 20px;
  display: inline-block;
  
  
`;





// Dummy images for the carousel (you can replace these later with dynamic images from the database)
// const images = {project.images.map((image, index) => (
//   <img key={index} src={image.url} alt={`Project image ${index + 1}`} />
// ))}


const HeroSection = () => {
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/projects");
  //       setProjects(response.data);
  //       // console.log(`image paths fetched in  the frontend : ${response.data.gallery_images}`)
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  // Carousel settings (feel free to tweak them)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true
  };

  const projects = {
    title: "Dummy Project",
    description: "A dummy project description to showcase the carousel",
    images: [
      { url: "/img/projects/after.png" },
      { url: "/img/projects/after2.png" },
      { url: "/img/projects/patio_gallery.jpg" },
      { url: "/img/cover.jpg" } // the pic that would be by default as a banner
    ]
  };



  return (
    <HeroContainer>
      <Overlay>
        <HeroText>
          <h1>Welcome to Our Website</h1>
          <p>
            We provide top-quality services in garden and deck construction.
            Explore our Portfolio and let us help you transform your outdoor spaces.
          </p>
          <HeroButton>
            <Link className='cta-button' to="/projects">View Our Done Projects</Link>
          </HeroButton>
        </HeroText>
      </Overlay>

      {/* Check if projects and projects.images exist */}
      {projects && projects.images && (
        <HeroCarousel {...settings}>
          {projects.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Project image ${index + 1}`} />
          ))}
        </HeroCarousel>
      )}
    </HeroContainer>
  );
};

export default HeroSection;
