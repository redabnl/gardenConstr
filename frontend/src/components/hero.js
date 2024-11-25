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


//   top: 50%;
//  left: 50%;

// const HeroText = styled.div`
//   position: absolute;
//   text-align: center;
//   transform: translate(-50%, -50%);
//   top: 50%;
//   left: 50%;
//   background: rgba(0, 0, 0, 0.6);
//   color: white;
//   z-index: 2;
//   border-radius: 8px;
//   padding: 20px;
//   max-width: 80%;
//   width: auto;

//   h1 {
//     font-size: 4rem;
//     margin-bottom: 20px;
//     color: white;
//     @media (max-width: 768px) {
//       font-size: 2.5rem;
//     }
//   }

//   p {
//     font-size: 1.5rem;
//     color: #f0f0f0;
//     margin-bottom: 30px;
//     @media (max-width: 768px) {
//       font-size: 1rem;
//     }
//   }
// `;


// const HeroButton = styled(Link)`
//   background-color: #28a745;
//   padding: 10px 20px;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 1rem;
//   text-decoration: none;
//   margin-top: 20px;
//   cursor: pointer;
//   transition: background-color 0.3s;
  
//   &:hover {
//     background-color: #218838;
//   }
// `;
const HeroText = styled.div`
  position: absolute;
  text-align: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: auto;
  background: rgba(0, 0, 0, 0.7); // Slightly less opacity for a cleaner look
  color: white;
  z-index: 2;
  border-radius: 12px; // Smoother rounded corners
  padding: 30px 40px; // Increased padding for a balanced look

  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    color: #FFFFFF; // Pure white for the header
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #F0F0F0; // Light grey for body text
    line-height: 1.6;
    margin-bottom: 30px;
    max-width: 600px;
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #32a852, #3fbf76); // Gradient for more depth
  color: #fff;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
  transition: all 0.3s ease-in-out;



  &:hover {
    background: #45a860; /* Slightly lighter green */
    transform: translateY(-3px);
  }
`;


const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4); /* Full-page overlay for better contrast */
  z-index: 1;
`;

const HeroCarousel = styled(Slider)`
  width: 100%;
  height: 100%;
  .slick-slide img {
    width: 100%;
    height: 100vh; /* Full viewport height */
    object-fit: cover; /* Maintain aspect ratio */
  }
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 75vh; /* Full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));

`;

const HeroSection = () => {

  const [projects, setProjects] = useState([]);

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
  // Dummy images for the carousel (you can replace these later with dynamic images from the database)  
  // '/img/services/deck1.png',
  // '/img/services/deckWood.jpg',
  // '/img/services/garden.jpg',
  // '/img/services/renovation_1.jpg',
  // '/img/services/renovation_2.jpg',
  // '/img/services/renovation_3.jpg',
  // '/img/services/renovation_4.jpg'



// {project.images.map((image, index) => (
//   <img key={index} src={image.url} alt={`Project image ${index + 1}`} />
// ))}

  const dumy_images = [
    '/img/hero/hero_1.jpg',
    '/img/hero/hero_2.jpg',
    '/img/hero/hero_3.jpg'
  ];
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
        // console.log(`image paths fetched in  the frontend : ${response.data.gallery_images}`)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <HeroContainer>
      <Overlay />
      <HeroText>
        <h1>Welcome to Nordic Gazon</h1>
        <p>
        Transforming your vision into reality, we specialize in premium garden, landscape, and deck construction services. 
        With a passion for creating outdoor spaces that blend beauty, functionality, and sustainability, we work alongside you to bring your dream projects to life. 
        Browse our services and let us help you make the most of your outdoor space.
        </p>
        <HeroButton to="/services" className='cta-button'>Browse services</HeroButton>
      </HeroText>

      {/* Display the images in the carousel */}
      {projects && projects.length > 0 && (
        <HeroCarousel {...settings}>
          {dumy_images.map((image, index) => (
            <img key={index} src={image} alt={`Dummy project image ${index + 1}`} />
          ))}
        </HeroCarousel>
      
        // <HeroCarousel {...settings}>
        //   {projects.map((project, index) => (
        //     project.images && project.images.map((image, imgIndex) => (
              // <div key={`${index}-${imgIndex}`}>
              //   <img src={image.url} alt={`Project image ${index + 1}`} />
              // </div>
        //     ))
        //   ))}
        // </HeroCarousel> 
      )}
    </HeroContainer>

  );
};

// const HeroText = styled.div`
//   position: absolute;
//   text-align: center;
//   transform: translate(-50%, -50%);
//   background: rgba(0, 0, 0, 0.5);
//   text-align: center;
//   color: white;
//   z-index: 2;
//   border-radius: 8px;


//   h1 {
//     font-size: 3rem;
//     margin-bottom: 20px;
//     color: white;
//   }

//   p {
//     font-size: 1.2rem;
//     color: #f0f0f0;
//     margin-bottom: 30px;
//   }

//   .cta-button {
//     background-color: #6c757d;
//     padding: 10px 20px;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     font-size: 16px;
//     text-decoration: none;
//     margin-top: 20px;
//     cursor: pointer;
//   }
// `;

// const Overlay = styled.div`
//   padding: 80px 0; // Adjust the padding for better spacing
//   background-color: #f8f9fa;
//   text-align: center;
//   position: absolute;
//   width: 100%;
//   height: 7%;
//   background: rgba(0, 0, 0, 0.5);  /* Dark overlay to make text readable */
//   z-index: 3;
// `;

// const HeroCarousel = styled(Slider)`
//   .slick-slide img {
//     display: flex;
//     width: 90%;
//     height: 10%;
//     object-fit: cover;
//   }
// `;

// const HeroContainer = styled.div`
//   position: relative;
//   color: white;
//   padding: 20px 0;
//   text-align: center;
//   width: 100%;
//   height: 100vh;
//   display : flex;
//   justify-content : center;
//   align-items: center
//   overflow: hidden;
//   margin: 0 auto;
// `;



// const HeroButton = styled(Link)`
//   background-color: #6c757d;
//   text-color : white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   color: #fff;
//   cursor: pointer;
//   font-size: 1rem;
//   text-decoration: none;
//   margin-top: 20px;
//   display: inline-block;
  
// `;

// // const HeroText = styled.h1`
// //   font-size: 3rem;
// //   margin-bottom: 20px;
// //   color: white;
// // `;



// // Dummy images for the carousel (you can replace these later with dynamic images from the database)
// // const images = {project.images.map((image, index) => (
// //   <img key={index} src={image.url} alt={`Project image ${index + 1}`} />
// // ))}


// const HeroSection = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/projects");
//         setProjects(response.data);
//         // console.log(`image paths fetched in  the frontend : ${response.data.gallery_images}`)
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // Carousel settings (feel free to tweak them)
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: true
//   };

//   // const projects = {
//   //   title: "Dummy Project",
//   //   description: "A dummy project description to showcase the carousel",
//   //   images: [
//   //     { url: "/img/projects/after.png" },
//   //     { url: "/img/projects/after2.png" },
//   //     { url: "/img/projects/patio_gallery.jpg" },
//   //     { url: "/img/cover.jpg" } // the pic that would be by default as a banner
//   //   ]
//   // };

export default HeroSection;
