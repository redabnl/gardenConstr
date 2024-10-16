import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';  // Slick slider package for image sliders

const ProjectSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.url} alt={img.description} />
          <p>{img.description}</p>
        </div>
      ))}
    </Slider>
  );
};

export default ProjectSlider;
